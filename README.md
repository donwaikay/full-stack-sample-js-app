# Fullstack Application Foundation

React + TypeScript + Vite frontend with Netlify Functions as the Node.js/TypeScript API boundary.

## Run

```bash
npm install
npm run dev
```

## Deploy

Connect this repository to Netlify. Build command: `npm run build`; publish directory: `frontend/dist`; functions: `netlify/functions`.

## Database

The SQL migration is intentionally minimal. Replace it with the real schema later. Credentials belong in Netlify environment variables/secret management, never in Git.

## Scaling

The stateless frontend/API boundary is designed for horizontal/serverless scaling. Database connection pooling, caching, authentication, domain modules, background jobs, and observability should be added according to the real workload and schema.
