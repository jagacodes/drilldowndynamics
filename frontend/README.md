# Drilldown Dynamics Website

A modern, responsive website for Drilldown Dynamics - an integrated energy services company delivering comprehensive drilling, logistics, and sustainable solutions globally.

## 🌐 Live Demo

Visit the website at your deployed URL.

## ✨ Features

- **Modern Design**: Dark theme with ocean blue accents and smooth animations
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **6 Pages**: Home, About, Services, Portfolio, Leadership, Contact
- **Custom Logo**: Professional branding with company logo and tagline
- **Professional Images**: High-quality oil & gas industry images
- **Contact Form**: Email integration ready (Formspree/Web3Forms)
- **No Backend Required**: Pure frontend, easy to deploy

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and Yarn

### Installation

```bash
cd frontend
yarn install
```

### Development

```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view in browser.

### Build for Production

```bash
yarn build
```

Creates optimized production build in the `build` folder.

## 📧 Contact Form Setup

The contact form currently uses `mailto:`. For better user experience, integrate with:

### Formspree (Recommended)
1. Sign up at https://formspree.io
2. Create a new form
3. Update Contact.jsx with your form endpoint
4. See FRONTEND_SETUP.md for detailed instructions

### Web3Forms (Alternative)
1. Get access key at https://web3forms.com
2. Update Contact.jsx with your access key
3. Free unlimited submissions

## 🌍 Deployment

### Netlify (Recommended)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd frontend
yarn build
netlify deploy --dir=build --prod
```

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel --prod
```

### GitHub Pages

```bash
# Install gh-pages
yarn add --dev gh-pages

# Add to package.json
"homepage": "https://yourusername.github.io/drilldown-dynamics",
"scripts": {
  "predeploy": "yarn build",
  "deploy": "gh-pages -d build"
}

# Deploy
yarn deploy
```

## 📁 Project Structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/           # Shadcn UI components
│   │   ├── Header.jsx    # Navigation header
│   │   └── Footer.jsx    # Footer component
│   ├── pages/
│   │   ├── Home.jsx      # Homepage
│   │   ├── About.jsx     # About us page
│   │   ├── Services.jsx  # Services page
│   │   ├── Portfolio.jsx # Portfolio page
│   │   ├── Leadership.jsx# Leadership team page
│   │   └── Contact.jsx   # Contact page
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── tailwind.config.js
```

## 🎨 Technologies

- **React** 19.0.0 - UI library
- **React Router** 7.5.1 - Navigation
- **Tailwind CSS** 3.4.17 - Styling
- **Shadcn UI** - Component library
- **Lucide React** - Icons
- **Sonner** - Toast notifications

## 📱 Contact Information

- **Email**: sales@drilldowndynamics.com
- **Phone**: +234 806 643 4176
- **Address**: Ogudu Estate, Lagos, Nigeria
- **Website**: drilldowndynamics.com

## 📄 License

© 2025 Drilldown Dynamics. All rights reserved.

## 🔧 Support

For setup help, see [FRONTEND_SETUP.md](./FRONTEND_SETUP.md) for detailed instructions on:
- Contact form integration options
- Deployment guides
- Environment configuration
- Troubleshooting

---

Built with ❤️ for Drilldown Dynamics
