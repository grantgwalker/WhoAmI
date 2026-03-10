# WhoAmI - Personal Website

A modern personal website built with React and Next.js. The app is now **fully static** and deployed as a statically exported site (no backend service required), which keeps hosting simple and cost‑effective.

## 🚀 Tech Stack

### Frontend
- **React** - UI library for building interactive interfaces
- **Next.js** - Static export using the App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework (v4)

## 📁 Project Structure

```
WhoAmI/
├── frontend/          # Next.js React application (statically exported)
│   ├── app/          # Next.js app directory
│   ├── components/   # Reusable React components
│   ├── public/       # Static assets
│   └── package.json  # Frontend dependencies
│
├── backend/          # (Legacy) Django API – no longer used
│   ├── api/         # Django app for API endpoints (archived)
│   ├── config/      # Django project settings (archived)
│   ├── manage.py    # Django management script (archived)
│   └── requirements.txt  # Backend dependencies (archived)
│
└── README.md        # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 20+ and npm
- Python 3.12+
- pip
- PowerShell (recommended) or Command Prompt

### Frontend Setup

1. Navigate to the frontend directory:
```powershell
cd frontend
```

2. Install dependencies:
```powershell
npm install
```

3. Start the development server:
```powershell
npm run dev
```

The frontend will be available at `http://localhost:3000`.

## 🎯 Features

- **Profile Display** - Shows personal information, skills, and contact details
- **Projects Showcase** - Lists projects with descriptions and technologies used
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark Mode Support** - Automatic dark mode based on system preferences
- **Type Safety** - TypeScript for frontend type checking

## 🧪 Development

### Frontend Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

The statically exported Next.js app can be deployed to any static host (S3 + CloudFront via CDK, Vercel static export, Netlify, etc.).

For AWS S3 + CloudFront via CDK, see `infra/README.md`.

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

Your Name - contact@example.com

---

> Note: The `backend/` Django project is now considered **legacy/archived** and is not used in the current deployment. You can safely ignore or remove it if you no longer need a dynamic API.
