# WhoAmI - Personal Website

A modern personal website built with React, Next.js, and Python Django backend. This project showcases a full-stack web application with a responsive frontend and a RESTful API backend.

## 🚀 Tech Stack

### Frontend
- **React** - UI library for building interactive interfaces
- **Next.js** - React framework with server-side rendering
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Python 3.12** - Programming language
- **Django 6.0** - Web framework
- **Django REST Framework** - API toolkit
- **django-cors-headers** - CORS support

## 📁 Project Structure

```
WhoAmI/
├── frontend/          # Next.js React application
│   ├── app/          # Next.js app directory
│   ├── components/   # Reusable React components
│   ├── public/       # Static assets
│   └── package.json  # Frontend dependencies
│
├── backend/          # Django REST API
│   ├── api/         # Django app for API endpoints
│   ├── config/      # Django project settings
│   ├── manage.py    # Django management script
│   └── requirements.txt  # Backend dependencies
│
└── README.md        # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 20+ and npm
- Python 3.12+
- pip

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment configuration (optional):
```bash
cp .env.local.example .env.local
```
Edit `.env.local` to configure the backend API URL if needed.

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Start the development server:
```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

## 🎯 Features

- **Profile Display** - Shows personal information, skills, and contact details
- **Projects Showcase** - Lists projects with descriptions and technologies used
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Dark Mode Support** - Automatic dark mode based on system preferences
- **RESTful API** - Clean API architecture for data management
- **Type Safety** - TypeScript for frontend type checking

## 📡 API Endpoints

- `GET /api/profile/` - Retrieve profile information
- `GET /api/projects/` - Get list of projects

## 🧪 Development

### Frontend Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Backend Commands
- `python manage.py runserver` - Start development server
- `python manage.py migrate` - Apply database migrations
- `python manage.py createsuperuser` - Create admin user
- `python manage.py test` - Run tests

## 🚀 Deployment

### Frontend (Vercel)
The Next.js app can be easily deployed to Vercel:
```bash
npm run build
```

### Backend (Railway/Heroku/DigitalOcean)
1. Set environment variables
2. Configure production database
3. Set `DEBUG=False` in settings
4. Configure static files serving

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

Your Name - contact@example.com
