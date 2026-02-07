# OnStage AI Chatbot Server

A minimal RAG-based chatbot server that indexes your project files and answers questions using Google Gemini.

## Setup

### 1. Get a Gemini API Key
- Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
- Create a new API key (free tier available)
- Copy the key

### 2. Configure Environment
Create a `.env` file in the `server/` directory:
```
GEMINI_API_KEY=your_key_here
PORT=4000
```

Or copy from the template:
```bash
cd server
cp .env.example .env
# Edit .env and paste your Gemini API key
```

### 3. Install Dependencies
```bash
cd server
npm install
```

### 4. Start the Server
```bash
npm start
```

You should see:
```
Index complete: XXX total chunks
AI server listening on http://localhost:4000
```

### 5. Run the Frontend
In a separate terminal, from the project root:
```bash
npm run dev
```

## How It Works

- **Indexing**: On startup, the server reads files from `src/`, `README.md`, and `package.json`, chunks them, and builds embeddings using Gemini's embedding API.
- **Query**: When you ask a question in the chatbot:
  1. Client sends question to `/api/query`
  2. Server embeds the question
  3. Finds the 6 most similar chunks (cosine similarity)
  4. Sends context + question to Gemini for generation
  5. Returns answer + source files to the client

## Files

- `index.js` — Express server with `/api/health` and `/api/query` endpoints
- `package.json` — Dependencies: express, cors, @google/generative-ai, dotenv
- `.env.example` — Template for configuration

## Troubleshooting

- **"GEMINI_API_KEY is undefined"**: Ensure `.env` is in the `server/` folder and contains your key.
- **CORS errors**: Make sure the server is running on `localhost:4000` and the frontend is hitting that URL.
- **Embeddings too slow**: The free tier has lower quotas. For large repos, consider chunking smaller or using a faster indexing schedule.

## Security Note

Never commit `.env` or your API key to version control. Add `.env` to `.gitignore`.
