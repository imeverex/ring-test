# Ring Atelier — AI Wedding Ring Generator

A Next.js app that generates wedding ring images using OpenAI DALL·E 3.
Your API key lives securely on the server — never exposed to users.

---

## Deploy to Vercel (5 minutes)

### 1. Push to GitHub
Create a new repo on GitHub and push this folder:
```bash
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/ring-atelier.git
git push -u origin main
```

### 2. Import to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New → Project**
3. Import your GitHub repo
4. Click **Deploy** (default settings are fine)

### 3. Add your OpenAI API Key
1. In Vercel, go to your project → **Settings → Environment Variables**
2. Add:
   - **Name:** `OPENAI_API_KEY`
   - **Value:** `sk-...` (your key)
3. Click **Save**
4. Go to **Deployments** and click **Redeploy** on your latest deployment

Your site is live! The API key is stored securely in Vercel and never visible to users.

---

## Run locally

```bash
cp .env.example .env.local
# Add your key to .env.local

npm install
npm run dev
# Open http://localhost:3000
```
