# Railway $PORT Error - Final Fix

## Problem
Railway is not expanding the `$PORT` environment variable properly, treating it as a literal string.

## Solution ✅
Created a startup shell script that properly handles the PORT variable.

---

## What Was Added

### 1. Start Script (`start.sh`)
```bash
#!/bin/bash
PORT=${PORT:-8080}
exec uvicorn server:app --host 0.0.0.0 --port $PORT
```

This script:
- Gets the PORT from environment (Railway sets this)
- Defaults to 8080 if not set
- Starts uvicorn with the correct port

### 2. Updated Dockerfile
- Copies and makes `start.sh` executable
- Exposes port 8080

### 3. Updated Procfile
```
web: ./start.sh
```

---

## Railway Dashboard Configuration

### Option 1: Using Start Script (Recommended)

**Start Command:**
```
./start.sh
```

**Build Command:**
```
pip install -r requirements.txt
```

### Option 2: Using Bash Directly

**Start Command:**
```
bash -c "uvicorn server:app --host 0.0.0.0 --port \$PORT"
```

**Build Command:**
```
pip install -r requirements.txt
```

Note: Use `\$PORT` with backslash to escape it in Railway dashboard.

### Option 3: Using sh -c

**Start Command:**
```
sh -c "uvicorn server:app --host 0.0.0.0 --port $PORT"
```

**Build Command:**
```
pip install -r requirements.txt
```

---

## Step-by-Step Setup

### Step 1: Commit and Push New Files

```bash
cd /app/backend
git add start.sh Dockerfile Procfile
git commit -m "Add startup script for Railway PORT handling"
git push
```

### Step 2: Configure Railway Dashboard

1. Go to Railway dashboard
2. Click your backend service
3. Go to **Settings** tab
4. Under **Deploy** section:

   **Build Command:**
   ```
   pip install -r requirements.txt
   ```

   **Start Command:**
   ```
   ./start.sh
   ```

5. Save changes

### Step 3: Set Environment Variables

In **Variables** tab, ensure you have:

```
MONGO_URL=your-mongodb-connection-string
DB_NAME=drilldown_dynamics
ALLOWED_ORIGINS=https://your-frontend.com
```

### Step 4: Deploy

Railway will automatically redeploy, or click **Deploy** manually.

---

## Verification

After deployment succeeds:

### Check Logs
In Railway dashboard → Logs, you should see:
```
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:PORT
```

### Test API
```bash
curl https://your-app.up.railway.app/api/
```

Expected response:
```json
{"message":"Drilldown Dynamics API is running"}
```

### Test Contact Form
```bash
curl -X POST https://your-app.up.railway.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Testing from Railway"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "Thank you for contacting us! We'll get back to you soon.",
  "submission_id": "..."
}
```

---

## Why This Works

### The Problem
Railway sets `PORT` as an environment variable, but when passed directly in commands like:
```
uvicorn server:app --port $PORT
```

The `$PORT` is not being expanded by the shell.

### The Solution
Using a bash script (`start.sh`):
1. Bash properly interprets and expands `$PORT`
2. The script gets the actual port number from the environment
3. Passes it correctly to uvicorn

### Alternative Explanation
When Railway runs:
```
uvicorn server:app --port $PORT
```

It's running in a context where shell variable expansion doesn't happen.

When Railway runs:
```
./start.sh
```

It executes a bash script that properly handles the variable.

---

## Troubleshooting

### Issue: "start.sh: not found"

**Solution 1:** Ensure script is executable
```bash
chmod +x /app/backend/start.sh
git add start.sh
git commit -m "Make start.sh executable"
git push
```

**Solution 2:** Use absolute path in Start Command
```
bash start.sh
```

### Issue: "Permission denied"

**Solution:** Update Dockerfile
```dockerfile
RUN chmod +x start.sh
```

Already added in the updated Dockerfile.

### Issue: Still getting PORT error

**Try this Start Command:**
```
bash -c 'uvicorn server:app --host 0.0.0.0 --port $PORT'
```

Use single quotes instead of double quotes.

### Issue: Environment variables not loading

**Solution:** Check `.env` file is not in repository
```bash
# .env should be in .gitignore
echo ".env" >> .gitignore
```

Set all variables in Railway dashboard Variables tab instead.

---

## Complete File Structure

Your backend should now have:

```
backend/
├── server.py
├── requirements.txt
├── runtime.txt
├── Dockerfile
├── Procfile
├── start.sh              ← NEW
├── .dockerignore
├── .env (local only)
├── models/
│   └── contact.py
├── routes/
│   └── contact.py
└── services/
    └── email_service.py
```

---

## Quick Summary

1. ✅ Created `start.sh` script
2. ✅ Updated Dockerfile to copy and make it executable
3. ✅ Updated Procfile to use `./start.sh`
4. ✅ Set Railway Start Command to `./start.sh`
5. ✅ Push to Railway
6. ✅ Deploy

**This will fix the $PORT error!**

---

## Additional Notes

### For Local Development

The `start.sh` script works locally too:
```bash
cd /app/backend
PORT=8001 ./start.sh
```

### For Other Platforms

This same approach works on:
- Heroku
- Render
- DigitalOcean App Platform
- Any platform that sets PORT as environment variable

---

**Status:** Final fix applied with startup script ✅
**Next:** Push code and configure Railway dashboard
