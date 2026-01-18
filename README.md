# 🛍️ Nova Marketplace

<div align="center">

![Nova Marketplace](https://img.shields.io/badge/Nova-Marketplace-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb)
![Stripe](https://img.shields.io/badge/Stripe-Payment-purple?style=for-the-badge&logo=stripe)

**A modern, full-stack e-commerce marketplace with secure payments, authentication, and real-time features**

[Live Demo](https://nova-frontend-topaz.vercel.app) • [Documentation](#-documentation) • [Features](#-features) • [Quick Start](#-quick-start)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Quick Start](#-quick-start)
- [Environment Setup](#-environment-setup)
- [Deployment](#-deployment)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

Nova Marketplace is a production-ready e-commerce platform built with modern web technologies. It features a beautiful, responsive UI, secure authentication, integrated payments via Stripe, and a scalable backend architecture.

### Key Highlights

- 🎨 **Modern UI/UX** - Glass-morphism effects, smooth animations, and professional design
- 🔐 **Secure Authentication** - NextAuth.js with Google OAuth and credential-based login
- 💳 **Payment Processing** - Stripe integration for secure checkout
- 📦 **Product Management** - Full CRUD operations with image upload
- 🚀 **Production Ready** - Deployed on Vercel with MongoDB Atlas
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ⚡ **High Performance** - Server-side rendering, image optimization, and caching

---

## ✨ Features

### 🛒 E-Commerce Core
- **Product Catalog** - Browse products with beautiful card layouts
- **Product Details** - Detailed product pages with images and descriptions
- **Shopping Cart** - Add/remove items with localStorage persistence
- **Checkout Flow** - Multi-step checkout with shipping and payment
- **Order Management** - Track orders and view order history

### 🔐 Authentication & Security
- **NextAuth.js Integration** - Secure session management
- **Google OAuth** - One-click sign-in with Google
- **Credential Login** - Email/password authentication
- **Protected Routes** - Secure pages requiring authentication
- **Session Persistence** - Stay logged in across sessions

### 💳 Payment Integration
- **Stripe Checkout** - Secure payment processing
- **Multiple Payment Methods** - Credit cards, debit cards
- **Order Confirmation** - Success and cancellation pages
- **Secure Transactions** - PCI compliant payment handling

### 🎨 User Interface
- **Modern Design** - Professional, clean interface
- **Dark Mode Support** - Toggle between light and dark themes
- **Responsive Layout** - Works on all devices
- **Smooth Animations** - Framer Motion animations
- **Toast Notifications** - Real-time feedback
- **Loading States** - Skeleton loaders and spinners

### 📦 Product Management
- **Image Upload** - imgbb.com integration for image hosting
- **CRUD Operations** - Create, read, update, delete products
- **Form Validation** - Client and server-side validation
- **Rich Product Data** - Name, description, price, category, images

### 🚀 Performance & Optimization
- **Server-Side Rendering** - Fast initial page loads
- **Image Optimization** - Next.js Image component
- **Code Splitting** - Automatic code splitting
- **Lazy Loading** - Load components on demand
- **MongoDB Indexing** - Optimized database queries

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI library |
| **Tailwind CSS** | Utility-first CSS framework |
| **NextAuth.js** | Authentication solution |
| **Framer Motion** | Animation library |
| **React Icons** | Icon library |

### Backend
| Technology | Purpose |
|------------|---------|
| **Express.js** | Node.js web framework |
| **MongoDB** | NoSQL database (Atlas) |
| **Native MongoDB Driver** | Database operations |
| **CORS** | Cross-origin resource sharing |

### Services & APIs
| Service | Purpose |
|---------|---------|
| **Vercel** | Frontend & backend hosting |
| **MongoDB Atlas** | Cloud database |
| **Stripe** | Payment processing |
| **imgbb.com** | Image hosting |
| **Google OAuth** | Social authentication |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client (Browser)                     │
│                    Next.js 16 + React 19                     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTPS
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    Vercel (Frontend)                         │
│              Next.js API Routes + SSR                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ REST API
                         │
┌────────────────────────▼────────────────────────────────────┐
│                 Vercel (Backend API)                         │
│                    Express.js Server                         │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  MongoDB    │  │   Stripe    │  │   imgbb     │
│   Atlas     │  │  Payments   │  │   Images    │
└─────────────┘  └─────────────┘  └─────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have:
- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **MongoDB Atlas** account (free tier available)
- **Stripe** account (for payments)
- **imgbb** API key (for image uploads)
- **Google OAuth** credentials (optional)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/nova-marketplace.git
cd nova-marketplace
```

2. **Install dependencies**
```bash
# Install frontend dependencies
cd nova-market
npm install

# Install backend dependencies
cd ../server
npm install
```

3. **Set up environment variables** (see [Environment Setup](#-environment-setup))

4. **Start the development servers**

**Windows:**
```bash
# Terminal 1 - Backend
START_BACKEND.bat

# Terminal 2 - Frontend
START_FRONTEND.bat
```

**Mac/Linux:**
```bash
# Terminal 1 - Backend
cd server && npm start

# Terminal 2 - Frontend
cd nova-market && npm run dev
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Health: http://localhost:3001/api/health

---

## 🔧 Environment Setup

### Frontend Environment Variables

Create `nova-market/.env.local`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://nova-backend-mu.vercel.app/api

# NextAuth Configuration
NEXTAUTH_URL=https://nova-frontend-topaz.vercel.app
NEXTAUTH_SECRET=your-secret-key-generate-with-openssl

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id

# Image Upload
NEXT_PUBLIC_IMAGE_HOST_KEY=your-imgbb-api-key

# Stripe (Optional)
STRIPE_SECRET_KEY=your-stripe-secret-key

# Database (if using Next.js API routes)
MONGODB_URI=your-mongodb-connection-string
```

### Backend Environment Variables

Create `server/.env`:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# Server Configuration
PORT=3001
NODE_ENV=production

# CORS
ALLOWED_ORIGINS=https://nova-frontend-topaz.vercel.app,http://localhost:3000

# Stripe
STRIPE_SECRET_KEY=your-stripe-secret-key

# Frontend URL
FRONTEND_URL=https://nova-frontend-topaz.vercel.app
```

### Getting API Keys

#### MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Replace `<password>` with your database password

#### Stripe
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Get your API keys from Developers → API keys
3. Use test keys for development

#### imgbb
1. Go to [imgbb API](https://api.imgbb.com/)
2. Sign up and get your API key

#### Google OAuth (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://your-domain.vercel.app/api/auth/callback/google`

---

## 📁 Project Structure

```
nova-marketplace/
│
├── nova-market/                 # Frontend (Next.js)
│   ├── src/
│   │   ├── app/                # Next.js App Router pages
│   │   │   ├── (auth)/        # Authentication pages
│   │   │   │   └── login/
│   │   │   ├── api/           # API routes
│   │   │   │   ├── auth/      # NextAuth endpoints
│   │   │   │   ├── products/  # Product API
│   │   │   │   └── create-checkout-session/
│   │   │   ├── checkout/      # Checkout pages
│   │   │   ├── items/         # Product pages
│   │   │   ├── globals.css    # Global styles
│   │   │   ├── layout.jsx     # Root layout
│   │   │   └── page.jsx       # Homepage
│   │   │
│   │   ├── components/        # React components
│   │   │   ├── auth/         # Auth components
│   │   │   ├── products/     # Product components
│   │   │   └── ui/           # UI components
│   │   │
│   │   ├── contexts/         # React contexts
│   │   │   └── ToastContext.jsx
│   │   │
│   │   ├── lib/              # Utilities
│   │   │   ├── api.js        # API client
│   │   │   ├── auth.js       # Auth helpers
│   │   │   ├── imageUpload.js
│   │   │   └── utils.js
│   │   │
│   │   ├── auth.js           # NextAuth config
│   │   └── proxy.js          # API proxy
│   │
│   ├── public/               # Static assets
│   ├── .env.local           # Environment variables
│   ├── next.config.mjs      # Next.js config
│   ├── tailwind.config.js   # Tailwind config
│   └── package.json
│
├── server/                   # Backend (Express.js)
│   ├── server.js            # Express server
│   ├── db.js                # MongoDB connection
│   ├── cache.js             # Caching utilities
│   ├── .env                 # Environment variables
│   ├── vercel.json          # Vercel config
│   └── package.json
│
├── docs/                    # Documentation
│   ├── DEPLOYMENT_GUIDE.md
│   ├── DEPLOYMENT_REVIEW.md
│   └── API_DOCUMENTATION.md
│
├── START_BACKEND.bat        # Windows backend starter
├── START_FRONTEND.bat       # Windows frontend starter
├── README.md               # This file
└── .gitignore
```

---

## 🌐 Deployment

### Vercel Deployment (Recommended)

#### Frontend Deployment

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel**
- Go to [Vercel Dashboard](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Set root directory to `nova-market`
- Add environment variables from `.env.local`
- Deploy!

3. **Configure Domain**
- Your app will be available at `https://your-project.vercel.app`
- Add custom domain in Vercel settings (optional)

#### Backend Deployment

1. **Deploy Backend**
- Create new Vercel project
- Set root directory to `server`
- Add environment variables from `server/.env`
- Deploy!

2. **Update Frontend API URL**
- Update `NEXT_PUBLIC_API_URL` in frontend environment variables
- Redeploy frontend

### Environment Variables Checklist

Make sure these are set in Vercel:

**Frontend:**
- ✅ `NEXTAUTH_URL`
- ✅ `NEXTAUTH_SECRET`
- ✅ `NEXT_PUBLIC_API_URL`
- ✅ `GOOGLE_CLIENT_ID`
- ✅ `GOOGLE_CLIENT_SECRET`
- ✅ `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- ✅ `NEXT_PUBLIC_IMAGE_HOST_KEY`
- ✅ `MONGODB_URI`
- ✅ `STRIPE_SECRET_KEY`

**Backend:**
- ✅ `MONGODB_URI`
- ✅ `ALLOWED_ORIGINS`
- ✅ `STRIPE_SECRET_KEY`
- ✅ `FRONTEND_URL`

---

## 📚 API Documentation

### Base URL
- **Development**: `http://localhost:3001/api`
- **Production**: `https://nova-backend-mu.vercel.app/api`

### Endpoints

#### Products

**Get All Products**
```http
GET /api/products
```
Response:
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Product Name",
    "description": "Product description",
    "price": 99.99,
    "category": "Electronics",
    "image": "https://image-url.com/image.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Get Single Product**
```http
GET /api/products/:id
```

**Create Product**
```http
POST /api/products
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": "Electronics",
  "image": "https://image-url.com/image.jpg"
}
```

**Update Product**
```http
PUT /api/products/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 89.99
}
```

**Delete Product**
```http
DELETE /api/products/:id
```

#### Stripe Checkout

**Create Checkout Session**
```http
POST /api/create-checkout-session
Content-Type: application/json

{
  "items": [
    {
      "name": "Product Name",
      "price": 99.99,
      "quantity": 1,
      "image": "https://image-url.com/image.jpg"
    }
  ],
  "shippingInfo": {
    "fullName": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St",
    "city": "New York",
    "postalCode": "10001"
  },
  "total": 99.99
}
```

---

## 🧪 Testing

### Demo Credentials

```
Email: admin@novamarket.com
Password: admin123
```

### Test Cards (Stripe)

```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
3D Secure: 4000 0025 0000 3155

Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

---

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563EB)
- **Secondary**: Indigo (#4F46E5)
- **Success**: Emerald (#10B981)
- **Error**: Red (#EF4444)
- **Warning**: Amber (#F59E0B)

### Typography
- **Display**: Inter (sans-serif)
- **Monospace**: JetBrains Mono (prices, codes)

### Components
- Glass-morphism effects
- Smooth transitions (300ms)
- Rounded corners (8px, 12px, 16px)
- Shadow elevations (sm, md, lg, xl)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Your Name** - *Initial work* - [GitHub](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting
- MongoDB for the database
- Stripe for payment processing
- All open-source contributors

---

## 📞 Support

For support, email support@novamarketplace.com or open an issue on GitHub.

---

<div align="center">

**Built with ❤️ using Next.js, Express.js, and MongoDB**

[⬆ Back to Top](#-nova-marketplace)

</div>
