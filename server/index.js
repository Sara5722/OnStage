import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

let indexStore = [];

function chunkText(text, size = 800, overlap = 200) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    const end = Math.min(start + size, text.length);
    const chunk = text.slice(start, end);
    chunks.push(chunk);
    if (end === text.length) break;
    start += size - overlap;
  }
  return chunks;
}

async function walkAndCollect(root) {
  const allowedExt = ['.js', '.jsx', '.ts', '.tsx', '.md', '.json', '.css'];
  const entries = [];

  async function walk(dir) {
    try {
      const names = await fs.readdir(dir, { withFileTypes: true });
      for (const name of names) {
        const full = path.join(dir, name.name);
        if (name.isDirectory()) {
          if (name.name === 'node_modules' || name.name === '.git' || name.name === 'server') continue;
          await walk(full);
        } else {
          const ext = path.extname(name.name).toLowerCase();
          if (allowedExt.includes(ext) || ['README.md', 'package.json'].includes(name.name)) {
            entries.push(full);
          }
        }
      }
    } catch (err) {
      console.warn('Error reading directory', dir, err.message);
    }
  }

  await walk(root);
  return entries;
}

async function buildIndex() {
  console.log('Starting index build...');
  indexStore = [];
  const candidates = [];
  
  // include root README and package.json explicitly
  try {
    const readmePath = path.join(repoRoot, 'README.md');
    const pkgPath = path.join(repoRoot, 'package.json');
    const existsReadme = await fs.stat(readmePath).then(() => true).catch(() => false);
    if (existsReadme) candidates.push(readmePath);
    const existsPkg = await fs.stat(pkgPath).then(() => true).catch(() => false);
    if (existsPkg) candidates.push(pkgPath);
  } catch (e) {}
  
  const collected = await walkAndCollect(path.join(repoRoot, 'src'));
  const files = [...new Set([...candidates, ...collected])];
  
  console.log(`Found ${files.length} files to index`);

  for (const filePath of files) {
    try {
      const raw = await fs.readFile(filePath, 'utf8');
      const rel = path.relative(repoRoot, filePath);
      const chunks = chunkText(raw, 800, 200);
      
      for (const chunk of chunks) {
        // Skip embedding for now - use simple keyword matching instead
        indexStore.push({ path: rel, text: chunk, embedding: null });
      }
      console.log(`Indexed ${chunks.length} chunks from ${rel}`);
    } catch (err) {
      console.warn('Failed to read', filePath, err.message);
    }
  }
  console.log(`Index complete: ${indexStore.length} total chunks (keyword mode)`);
}

function cosine(a, b) {
  let sum = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return sum / (Math.sqrt(na) * Math.sqrt(nb) + 1e-8);
}

app.get('/api/health', (req, res) => res.json({ ok: true, indexedChunks: indexStore.length }));

app.post('/api/query', async (req, res) => {
  const question = (req.body?.question || '').trim();
  if (!question) return res.status(400).json({ error: 'question required' });
  
  try {
    // Improved keyword matching
    const keywords = question.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    
    if (keywords.length === 0) {
      // If no keywords, return top 3 chunks by size (fallback for very short questions)
      const top = indexStore.slice(0, 3);
      const context = top.map(t => `File: ${t.path}\n${t.text}`).join('\n\n---\n\n');
      const genModel = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const systemPrompt = `You are a helpful AI assistant for the OnStage project. Answer questions based on the provided context. Be friendly and helpful.`;
      const prompt = `Context:\n${context}\n\nQuestion: ${question}`;
      
      const result = await genModel.generateContent({
        contents: [
          { role: 'user', parts: [{ text: systemPrompt + '\n\n' + prompt }] }
        ],
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7,
        }
      });
      const answer = result.response.text() || 'I am an AI assistant here to help!';
      return res.json({ answer, sources: [...new Set(top.map(t => t.path))] });
    }

    // Score chunks by keyword match count
    const scored = indexStore.map((item) => {
      const textLower = item.text.toLowerCase();
      const matches = keywords.filter(k => textLower.includes(k)).length;
      return { score: matches, item };
    });
    scored.sort((a, b) => b.score - a.score);
    
    // Take top 6, or at least 2 if matches are low
    const top = scored.slice(0, Math.max(6, scored.filter(s => s.score > 0).length || 2)).map(s => s.item);
    const context = top.map(t => `File: ${t.path}\n${t.text}`).join('\n\n---\n\n');

    // Call Gemini for generation
    const genModel = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const systemPrompt = `You are a helpful AI assistant for the OnStage project. Answer questions using the provided context. Be friendly, concise, and cite filenames when relevant.`;
    
    const prompt = `Context from project files:\n${context}\n\nQuestion: ${question}`;
    
    const result = await genModel.generateContent({
      contents: [
        { role: 'user', parts: [{ text: systemPrompt + '\n\n' + prompt }] }
      ],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      }
    });

    const answer = result.response.text() || 'Sorry, I could not generate an answer.';
    res.json({ answer, sources: [...new Set(top.map(t => t.path))] });
  } catch (err) {
    console.error('Query error', err);
    res.status(500).json({ error: err.message || String(err) });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, async () => {
  console.log(`AI server listening on http://localhost:${port}`);
  try {
    await buildIndex();
  } catch (err) {
    console.error('Index build failed', err);
  }
});
