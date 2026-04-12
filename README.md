# Cards Against Humanity · Online

Multiplayer CAH for friends. No accounts, just a room code.

## Deploy to Vercel

### 1. Install & deploy

```bash
npm install -g vercel
cd cah-online
vercel
```

Follow the prompts (link to your Vercel account, accept defaults).

### 2. Add Vercel KV (storage)

After the first deploy:

1. Go to your project on **vercel.com**
2. Click **Storage** tab → **Create Database** → **KV**
3. Name it anything, pick a region, click **Create**
4. Click **Connect to Project** → select your project → **Connect**
5. Go back to your project → **Settings** → **Redeploy**

That's it! The app is now live with persistent multiplayer storage.

Rooms auto-expire after 24 hours.

## Local dev

```bash
npm install
npm run dev
```

Note: local dev needs `KV_REST_API_URL` and `KV_REST_API_TOKEN` env vars set.
Pull them after adding Vercel KV: `vercel env pull .env.local`
