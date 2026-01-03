# Railway Dashboard Setup - Visual Guide

## 📍 Where to Set Build and Start Commands

### Location in Railway Dashboard:

```
Your Project
  └── Your Backend Service
       └── Settings (tab at top)
            └── Deploy (section)
                 ├── Build Command
                 │    └── pip install -r requirements.txt
                 │
                 └── Start Command
                      └── uvicorn server:app --host 0.0.0.0 --port $PORT
```

---

## Step-by-Step with Screenshots Location

### Step 1: Access Settings

1. Login to Railway: https://railway.app
2. Click on your project
3. Click on your backend service (the one with Python/FastAPI)
4. Click **Settings** tab at the top

### Step 2: Configure Build Command

In Settings page:

1. Scroll to **Deploy** section
2. Look for **Build Command** field
3. Click the input field
4. Type: `pip install -r requirements.txt`
5. Click **Save** or it auto-saves

### Step 3: Configure Start Command

In same Deploy section:

1. Look for **Start Command** field (below Build Command)
2. Click the input field
3. Type: `uvicorn server:app --host 0.0.0.0 --port $PORT`
4. Click **Save** or it auto-saves

### Step 4: Set Environment Variables

1. Click **Variables** tab at the top
2. Click **New Variable** button
3. Add each variable:

   **Variable 1:**
   - Name: `MONGO_URL`
   - Value: `mongodb+srv://your-connection-string`

   **Variable 2:**
   - Name: `DB_NAME`
   - Value: `drilldown_dynamics`

   **Variable 3:**
   - Name: `ALLOWED_ORIGINS`
   - Value: `https://your-frontend-url.com`

4. Click **Add** for each variable

### Step 5: Trigger Deployment

Option A: Auto-deploy (if GitHub connected)
- Just push your code
- Railway auto-deploys

Option B: Manual deploy
1. Go to **Deployments** tab
2. Click **Deploy** button
3. Select latest code

---

## Important Notes

### ⚠️ Common Mistakes to Avoid:

1. **Don't** include quotes around commands:
   - ❌ Wrong: `"pip install -r requirements.txt"`
   - ✅ Correct: `pip install -r requirements.txt`

2. **Don't** modify the `$PORT` variable:
   - ❌ Wrong: `--port 8000`
   - ✅ Correct: `--port $PORT`

3. **Don't** add extra spaces:
   - ❌ Wrong: `pip  install  -r  requirements.txt`
   - ✅ Correct: `pip install -r requirements.txt`

---

## Verification Checklist

After setting commands, verify:

- [ ] Build Command shows: `pip install -r requirements.txt`
- [ ] Start Command shows: `uvicorn server:app --host 0.0.0.0 --port $PORT`
- [ ] All environment variables are set (Variables tab)
- [ ] No quotes or extra characters in commands
- [ ] Railway shows "Settings saved" or similar confirmation

---

## What Railway Does

1. **Build Phase:**
   - Runs: `pip install -r requirements.txt`
   - Installs all Python packages
   - Creates virtual environment

2. **Deploy Phase:**
   - Sets `$PORT` environment variable (usually 8000 or random)
   - Runs: `uvicorn server:app --host 0.0.0.0 --port $PORT`
   - Your app starts listening on Railway's port
   - Makes it accessible via public URL

---

## Exact Configuration Reference

Copy and paste these EXACTLY:

### Build Command:
```
pip install -r requirements.txt
```

### Start Command:
```
uvicorn server:app --host 0.0.0.0 --port $PORT
```

### Root Directory:
```
(leave empty or set to "backend" if in subdirectory)
```

---

## After Configuration

### Expected Behavior:

1. **Deployment Logs** should show:
```
✓ Building...
✓ Installing dependencies from requirements.txt
✓ Starting application
✓ INFO: Application startup complete.
✓ INFO: Uvicorn running on http://0.0.0.0:PORT
✓ Deployment successful
```

2. **Your API** should be accessible:
```
https://your-app.up.railway.app/api/
```

3. **Health Check** should return:
```json
{"message":"Drilldown Dynamics API is running"}
```

---

## Troubleshooting

### Build Command Not Working?

1. Check spelling: `requirements.txt` (with .txt extension)
2. Ensure file exists in your repository
3. Try: `python -m pip install -r requirements.txt`

### Start Command Error?

1. Verify syntax exactly: `uvicorn server:app --host 0.0.0.0 --port $PORT`
2. Don't use `${PORT}` - use `$PORT`
3. Ensure `server.py` exists with `app` variable

### Still Not Working?

1. Check Railway logs (Logs tab)
2. Verify Python version in `runtime.txt`
3. Try removing Dockerfile (let Railway auto-detect)
4. Contact Railway support with error logs

---

## Alternative: Railway.toml (Optional)

Instead of dashboard, you can create `railway.toml`:

```toml
[build]
builder = "NIXPACKS"
buildCommand = "pip install -r requirements.txt"

[deploy]
startCommand = "uvicorn server:app --host 0.0.0.0 --port $PORT"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10
```

Place in backend root directory. Railway auto-detects this file.

---

**Status:** Configuration guide complete
**Tested with:** Railway, Python 3.11, FastAPI, Motor/PyMongo

✅ Follow these exact steps and your backend will deploy successfully!
