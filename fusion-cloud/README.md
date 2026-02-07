# Fusion-Cloud // Security Ledger

The serverless backend for Fusion-CLI and the Master Web Architect (MWA) ecosystem. It provides a persistent, blockchain-backed security ledger for auditing CLI actions.

## 🚀 Deployment (Vercel)

This application is designed to run as a serverless Next.js app on Vercel.

### 1. Prerequisites
- A Vercel account.
- A **Vercel KV** (Redis) database instance.

### 2. Environment Variables
Configure the following in your Vercel project settings:

```bash
# Vercel KV Credentials (Automatic if you use the Vercel Dashboard to add KV)
KV_URL=
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=
```

### 3. Deploy
Push this subdirectory to Vercel:
```bash
npx vercel deploy --root-directory fusion-cloud
```

## 🛠️ Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

Note: Locally, if no `KV_URL` is found, the ledger defaults to a local JSON file at `src/data/ledger.json`.

## 📡 API Endpoints

- `GET /api/ledger`: Returns the full audit history and integrity status.
- `POST /api/ledger`: Appends a new block to the chain. (Expects `action`, `result`, `policy`, `userId`).
