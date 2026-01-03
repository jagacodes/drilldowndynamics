# Understanding Frontend Environment Variables

## WDS_SOCKET_PORT Explained

**Full Name:** Webpack Dev Server Socket Port

**Purpose:** Used by React's development server for **hot module reloading (HMR)**

**What it does:**
- Enables live code updates without full page refresh during development
- Creates a WebSocket connection between browser and dev server
- Watches for file changes and updates UI instantly

---

## Your Current .env File

```env
REACT_APP_BACKEND_URL=https://offshore-gear-1.preview.emergentagent.com
WDS_SOCKET_PORT=443
ENABLE_HEALTH_CHECK=false
```

### Variable Breakdown:

#### 1. REACT_APP_BACKEND_URL
**Purpose:** Backend API endpoint for your application

**Current Value:** Emergent preview URL (needs to change to Railway)

**Should be:**
```env
REACT_APP_BACKEND_URL=https://your-railway-url.up.railway.app
```

**Important:** This is the one causing your form error!

---

#### 2. WDS_SOCKET_PORT
**Purpose:** Hot reload socket port for development

**Current Value:** `443` (HTTPS port)

**When needed:**
- ✅ During `yarn start` (local development)
- ❌ NOT needed in production build (`yarn build`)
- ❌ NOT used by deployed version

**Set to 443 because:**
- Emergent platform uses HTTPS for preview
- WebSocket needs to connect on same port as HTTPS (443)

**Should you change it?**
- ❌ No, keep it for local development on Emergent platform
- ✅ Safe to remove if deploying elsewhere
- ✅ Automatically ignored in production builds

---

#### 3. ENABLE_HEALTH_CHECK
**Purpose:** Platform-specific health monitoring

**Current Value:** `false`

**What it does:**
- Emergent platform feature
- Disables automatic health checks during development
- Prevents unnecessary server pings

**Should you change it?**
- ❌ No, keep it as is
- ✅ Safe to remove if not on Emergent platform

---

## Environment Variables Priority

### Development Variables (Only for `yarn start`):
```env
WDS_SOCKET_PORT=443
ENABLE_HEALTH_CHECK=false
```

### Production Variables (Required for `yarn build`):
```env
REACT_APP_BACKEND_URL=https://your-backend-url.com
```

### Rule of Thumb:
- Variables starting with `REACT_APP_` → Available in both dev and production
- Other variables (WDS_, ENABLE_) → Development only, not in build

---

## Different .env Files for Different Environments

### Option 1: Single .env File
```env
# Backend (REQUIRED - Update this!)
REACT_APP_BACKEND_URL=https://your-railway-url.up.railway.app

# Development only (keep as is)
WDS_SOCKET_PORT=443
ENABLE_HEALTH_CHECK=false
```

### Option 2: Multiple .env Files (Recommended)

**`.env.development` (for local dev):**
```env
REACT_APP_BACKEND_URL=http://localhost:8001
WDS_SOCKET_PORT=443
ENABLE_HEALTH_CHECK=false
```

**`.env.production` (for builds):**
```env
REACT_APP_BACKEND_URL=https://your-railway-url.up.railway.app
```

**`.env.local` (local overrides, not committed to git):**
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

Create React App automatically uses the right file!

---

## For Your Railway Deployment

### What You MUST Update:

**In `/app/frontend/.env`:**
```env
REACT_APP_BACKEND_URL=https://your-railway-backend.up.railway.app
```

### What You Can Keep:
```env
WDS_SOCKET_PORT=443
ENABLE_HEALTH_CHECK=false
```

These won't affect production - they're only used during `yarn start`

---

## Netlify/Vercel Configuration

When deploying to Netlify or Vercel, set environment variable in dashboard:

**Variable Name:**
```
REACT_APP_BACKEND_URL
```

**Value:**
```
https://your-railway-backend.up.railway.app
```

**Don't set:**
- WDS_SOCKET_PORT (not needed)
- ENABLE_HEALTH_CHECK (not needed)

---

## Testing Different Backends

### Development (local backend):
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

### Staging (Railway):
```env
REACT_APP_BACKEND_URL=https://staging.up.railway.app
```

### Production (Railway):
```env
REACT_APP_BACKEND_URL=https://production.up.railway.app
```

---

## Common Mistakes

### ❌ Wrong:
```env
BACKEND_URL=https://...  # Missing REACT_APP_ prefix
```
Won't work! React only sees variables starting with `REACT_APP_`

### ✅ Correct:
```env
REACT_APP_BACKEND_URL=https://...
```

### ❌ Wrong:
```env
REACT_APP_BACKEND_URL=https://my-backend.com/
```
Trailing slash can cause issues with `/api/contact`

### ✅ Correct:
```env
REACT_APP_BACKEND_URL=https://my-backend.com
```

---

## How to Verify

### Check what React sees:

**In your React component:**
```javascript
console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);
```

**In browser console (after running app):**
```javascript
// Should log your Railway URL
console.log(process.env);
```

---

## Quick Reference

| Variable | Purpose | Required | Change? |
|----------|---------|----------|---------|
| `REACT_APP_BACKEND_URL` | Backend API URL | ✅ Yes | ✅ YES - Update to Railway |
| `WDS_SOCKET_PORT` | Dev server hot reload | ❌ No | ❌ No - Keep for dev |
| `ENABLE_HEALTH_CHECK` | Platform health check | ❌ No | ❌ No - Keep as is |

---

## What to Do Now

1. **Update only this line:**
   ```env
   REACT_APP_BACKEND_URL=https://your-railway-backend.up.railway.app
   ```

2. **Keep these lines as they are:**
   ```env
   WDS_SOCKET_PORT=443
   ENABLE_HEALTH_CHECK=false
   ```

3. **Rebuild:**
   ```bash
   cd /app/frontend
   yarn build
   ```

4. **Deploy**

That's it! The `WDS_SOCKET_PORT` is fine - you only need to fix the backend URL.

---

## Summary

**WDS_SOCKET_PORT=443:**
- ✅ Safe to keep
- ✅ Only affects development
- ✅ Enables hot reloading
- ❌ Not used in production build
- ❌ Not causing your form error

**The real issue:**
- `REACT_APP_BACKEND_URL` pointing to wrong backend
- Update it to your Railway URL
- Form will work after that! ✅
