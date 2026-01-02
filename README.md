# Drilldown Dynamics - Corporate Website

Modern, professional website for Drilldown Dynamics - an integrated energy services company.

## 🚀 Quick Deploy

This is a **frontend-only** React application, ready to deploy to any static hosting service.

### Deploy to Netlify (Easiest)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

Or manually:
```bash
cd frontend
yarn build
netlify deploy --prod --dir=build
```

### Deploy to Vercel

```bash
cd frontend
vercel --prod
```

## 📁 Project Structure

```
/app
├── frontend/              # React application
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Page components
│   │   └── App.js        # Main app
│   └── package.json
├── FRONTEND_SETUP.md     # Detailed setup guide
└── README.md            # This file
```

## 🌐 Website Features

- **6 Pages**: Home, About, Services, Portfolio, Leadership, Contact
- **Modern Design**: Dark theme with ocean blue accents
- **Fully Responsive**: Mobile, tablet, and desktop optimized
- **Professional Images**: High-quality oil & gas industry photos
- **Custom Branding**: Company logo and professional styling
- **Contact Form**: Email integration ready

## 💻 Local Development

```bash
# Navigate to frontend
cd frontend

# Install dependencies
yarn install

# Start development server
yarn start

# Build for production
yarn build
```

## 📧 Contact Form Setup

Currently uses basic `mailto:`. For production, integrate with:
- **Formspree** (Recommended): 50 free submissions/month
- **Web3Forms**: Unlimited free submissions
- **EmailJS**: 200 free emails/month

See [FRONTEND_SETUP.md](./FRONTEND_SETUP.md) for detailed integration instructions.

## 📱 Company Information

- **Email**: sales@drilldowndynamics.com
- **Phone**: +234 806 643 4176
- **Location**: Ogudu Estate, Lagos, Nigeria
- **Website**: drilldowndynamics.com

## 🛠️ Built With

- React 19
- Tailwind CSS
- Shadcn UI
- React Router
- Lucide Icons

## 📄 Documentation

- [Frontend Setup Guide](./FRONTEND_SETUP.md) - Contact form integration, deployment options
- [Frontend README](./frontend/README.md) - Detailed project documentation

---

**Status**: ✅ Production ready | No backend required | Deploy anywhere

© 2025 Drilldown Dynamics. All rights reserved.
