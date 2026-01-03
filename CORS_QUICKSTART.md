# Quick CORS Configuration Reference

## Current Setup

Your backend reads CORS configuration from environment variables:

**File:** `/app/backend/.env`
```env
ALLOWED_ORIGINS=*
```

## Production Deployment - Quick Steps

### Step 1: Deploy Frontend First

Deploy to Netlify/Vercel and get your URL:
- Example: `https://drilldowndynamics.netlify.app`

### Step 2: Deploy Backend

Choose a platform and deploy:
- **Railway:** https://railway.app (Recommended)
- **Render:** https://render.com
- **Heroku:** https://heroku.com

### Step 3: Configure CORS

Update backend environment variables:

**Single Domain:**
```env
ALLOWED_ORIGINS=https://drilldowndynamics.netlify.app
```

**Multiple Domains:**
```env
ALLOWED_ORIGINS=https://drilldowndynamics.com,https://www.drilldowndynamics.com
```

**Development + Production:**
```env
ALLOWED_ORIGINS=http://localhost:3000,https://drilldowndynamics.netlify.app
```

### Step 4: Update Frontend

In `/app/frontend/.env`:
```env
REACT_APP_BACKEND_URL=https://your-backend.railway.app
```

### Step 5: Rebuild & Redeploy

```bash
cd /app/frontend
yarn build
netlify deploy --prod --dir=build
```

## Platform-Specific Commands

### Railway
```bash
railway variables set ALLOWED_ORIGINS=https://your-frontend.com
```

### Heroku
```bash
heroku config:set ALLOWED_ORIGINS=https://your-frontend.com
```

### Render
Use web dashboard → Environment tab

### DigitalOcean
Use web dashboard → Settings → Environment Variables

## Testing CORS

### Test 1: From Command Line
```bash
curl -H "Origin: https://your-frontend.com" \
     -H "Access-Control-Request-Method: POST" \
     -X OPTIONS \
     https://your-backend.com/api/contact
```

Should return CORS headers.

### Test 2: From Browser Console
```javascript
fetch('https://your-backend.com/api/')
  .then(r => r.json())
  .then(console.log)
```

Should work without errors.

### Test 3: Submit Contact Form
- Go to your frontend
- Fill out contact form
- Submit
- Check for CORS errors in console (F12)

## Common CORS Errors & Fixes

### Error: "No 'Access-Control-Allow-Origin' header"

**Problem:** Frontend domain not in ALLOWED_ORIGINS

**Fix:**
```env
ALLOWED_ORIGINS=https://exact-frontend-url.com
```

### Error: "CORS policy: credentials mode"

**Problem:** Using credentials with wildcard origin

**Fix:** Set specific origin instead of `*`

### Error: "Preflight request didn't succeed"

**Problem:** Backend not responding to OPTIONS requests

**Fix:** FastAPI handles this automatically, check if backend is running

## Security Best Practices

✅ **DO:**
- Use specific domains in production
- Use HTTPS for both frontend and backend
- Remove development URLs from production

❌ **DON'T:**
- Use `ALLOWED_ORIGINS=*` in production
- Include HTTP URLs in production
- Allow all domains

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `ALLOWED_ORIGINS` | Comma-separated frontend URLs | `https://app.com,https://www.app.com` |
| `MONGO_URL` | MongoDB connection string | `mongodb+srv://user:pass@cluster...` |
| `DB_NAME` | Database name | `drilldown_dynamics` |
| `SMTP_HOST` | Email server host | `smtp.gmail.com` |
| `SMTP_USERNAME` | Email username | `your-email@gmail.com` |
| `EMAIL_TO` | Contact form recipient | `sales@drilldowndynamics.com` |

## Verification Checklist

After deployment:

- [ ] Backend API responds at `/api/`
- [ ] Frontend can call backend without CORS errors
- [ ] Contact form submissions work
- [ ] Emails are received
- [ ] HTTPS is enabled
- [ ] Environment variables are set correctly

## Need Help?

See detailed guide: `/app/BACKEND_DEPLOYMENT.md`

---

**Quick Example:**

1. Frontend deployed: `https://mysite.netlify.app`
2. Backend deployed: `https://mybackend.railway.app`
3. Set backend env: `ALLOWED_ORIGINS=https://mysite.netlify.app`
4. Set frontend env: `REACT_APP_BACKEND_URL=https://mybackend.railway.app`
5. Rebuild both
6. Done! ✅
