# Railway Configuration - Correct Settings

## 🎯 The Issue
Railway needs explicit build and start commands set in the dashboard.

## ✅ Correct Configuration

### In Railway Dashboard:

1. **Go to your service** → **Settings** → **Deploy**

2. **Build Command:**
   ```
   pip install -r requirements.txt
   ```

3. **Start Command:**
   ```
   uvicorn server:app --host 0.0.0.0 --port $PORT
   ```

4. **Root Directory:**
   ```
   /
   ```
   (Or leave empty if backend is in root)

---

## Step-by-Step Setup

### Step 1: Set Build Command

In Railway Dashboard:
1. Click your backend service
2. Go to **Settings** tab
3. Find **Build** section
4. Click **Configure**
5. Set **Build Command**:
   ```
   pip install -r requirements.txt
   ```
6. Save

### Step 2: Set Start Command

In same Settings:
1. Find **Deploy** section
2. Set **Start Command**:
   ```
   uvicorn server:app --host 0.0.0.0 --port $PORT
   ```
3. Save

### Step 3: Set Root Directory (if needed)

If your backend is in a subdirectory:
1. In Settings → **Deploy**
2. Set **Root Directory**: `backend` or whatever your folder is
3. Save

### Step 4: Redeploy

1. Go to **Deployments** tab
2. Click **Deploy** button
3. Or push to trigger auto-deploy

---

## Environment Variables

Don't forget to set in **Variables** tab:

### Required:
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME=drilldown_dynamics
ALLOWED_ORIGINS=https://your-frontend.com
```

### Optional (Email):
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@drilldowndynamics.com
EMAIL_TO=sales@drilldowndynamics.com
```

---

## File Structure

Your backend should have these files:

```
backend/
├── server.py              # Main FastAPI app
├── requirements.txt       # Python dependencies
├── runtime.txt           # Python version (optional)
├── Dockerfile            # For Docker deployment (optional)
├── .env                  # Local env vars (not deployed)
├── models/
│   └── contact.py
├── routes/
│   └── contact.py
└── services/
    └── email_service.py
```

---

## Verify Deployment

### After successful deploy:

1. **Check Logs:**
   - Railway dashboard → Logs tab
   - Look for: `INFO:     Application startup complete.`

2. **Test API:**
   ```bash
   curl https://your-app.up.railway.app/api/
   ```
   
   Expected: `{"message":"Drilldown Dynamics API is running"}`

3. **Test Contact Form:**
   ```bash
   curl -X POST https://your-app.up.railway.app/api/contact \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test",
       "email": "test@test.com",
       "message": "Testing Railway deployment"
     }'
   ```
   
   Expected: `{"success":true,...}`

---

## Common Issues

### Issue: `pip: command not found`

**Fix:** Set build command in Railway settings:
```
pip install -r requirements.txt
```

### Issue: `PORT not valid integer`

**Fix:** Use this exact start command:
```
uvicorn server:app --host 0.0.0.0 --port $PORT
```
(Railway will replace `$PORT` with actual port)

### Issue: `Module not found`

**Fix:** Add missing package to `requirements.txt` and redeploy

### Issue: `MongoDB connection failed`

**Fix:** 
1. Check `MONGO_URL` is correct in Variables
2. Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
3. Test connection string locally first

---

## Alternative: Using Nixpacks (Auto-detect)

If you prefer not to use Docker:

1. **Remove Dockerfile** or rename it to `Dockerfile.backup`
2. Railway will auto-detect Python and use Nixpacks
3. Keep `runtime.txt` with `python-3.11.8`
4. Railway handles rest automatically

---

## MongoDB Setup

### Option 1: Railway MongoDB Plugin

1. In Railway, click **New** → **Database** → **MongoDB**
2. Railway creates database and sets `MONGO_URL` automatically
3. Just add `DB_NAME=drilldown_dynamics` manually

### Option 2: MongoDB Atlas (Free)

1. Create cluster at https://mongodb.com/cloud/atlas
2. Get connection string
3. Set in Railway Variables:
   ```
   MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/
   DB_NAME=drilldown_dynamics
   ```

---

## Quick Checklist

Before deploying:

- [ ] `requirements.txt` has all dependencies
- [ ] `runtime.txt` specifies Python 3.11
- [ ] Railway build command: `pip install -r requirements.txt`
- [ ] Railway start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
- [ ] Environment variables set in Railway
- [ ] MongoDB connection string configured
- [ ] CORS origins set to your frontend URL

---

## Getting Your Backend URL

After successful deployment:

1. Go to Railway dashboard
2. Click your service
3. Go to **Settings** → **Networking**
4. Find **Public Networking**
5. Your URL: `https://your-app.up.railway.app`

Copy this and use in frontend `.env`:
```env
REACT_APP_BACKEND_URL=https://your-app.up.railway.app
```

---

## Support

If issues persist:
- Check Railway logs for specific errors
- Verify all environment variables are set
- Test MongoDB connection separately
- Try deploying with Nixpacks (remove Dockerfile)

---

**Quick Summary:**
1. Set build command: `pip install -r requirements.txt`
2. Set start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
3. Set environment variables
4. Deploy
5. Test endpoints

✅ Your backend should now work on Railway!
