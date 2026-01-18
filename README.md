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



## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Mahi M Rahman** - *Initial work* - [GitHub](https://github.com/mahi8026)

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
