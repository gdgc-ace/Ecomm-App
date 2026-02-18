# ShopEase - E-Commerce Application
 
A full-stack e-commerce platform built with React, TypeScript, Tailwind CSS, Express, and Prisma ORM.

## 🚀 Quick Setup

### Option 1: Automated Setup (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd Ecomm-App-Supabase

# Run the installation script (Linux/Mac)
chmod +x install.sh start.sh
./install.sh

# Or on Windows, run:
install.bat
```

### Option 2: Manual Setup

```bash
# 1. Install all dependencies (root + workspaces)
npm install

# 2. Setup database (SQLite by default)
cd backend && npm run setup && cd ..
```

## 🏃 Running the Application

### Using Start Script (Quickest)

```bash
chmod +x start.sh
./start.sh
```

### Manual Commands

```bash
# Start Both Frontend & Backend
npm run dev

# Start Only Frontend
cd frontend && npm run dev

# Start Only Backend
cd backend && npm run dev:sqlite
```

This starts:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

### Start Only Frontend

```bash
cd frontend && npm run dev
```

### Start Only Backend

```bash
cd backend && npm run dev:sqlite
```

## 📦 Tech Stack

### Frontend
- **React 19** + TypeScript
- **Vite** - Fast build tool
- **Tailwind CSS v4** - Styling
- **React Router v7** - Routing
- **Lucide React** - Icons
- **Sonner** - Notifications
- **Radix UI** - Accessible UI components

### Backend
- **Express.js** + TypeScript
- **Prisma ORM** - Database ORM
- **PostgreSQL** - Database (Supabase)
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logging

## 📁 Project Structure

```
Ecomm-App-Supabase/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── admin/       # Admin layout & components
│   │   │   └── ui/         # Base UI components (Button, Card, etc.)
│   │   ├── pages/          # Page components
│   │   │   ├── admin/      # Admin pages (Dashboard, Orders, Products, Users)
│   │   │   ├── CartPage.tsx
│   │   │   ├── HomePage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── ProductsPage.tsx
│   │   │   └── SignupPage.tsx
│   │   ├── context/         # React context (CartContext)
│   │   ├── services/        # API client
│   │   ├── types/          # TypeScript type definitions
│   │   └── lib/            # Utility functions
│   └── ...
├── backend/                  # Express backend API
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API route definitions
│   │   └── services/       # Business logic
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── seed.ts         # Database seeding
│   └── ...
└── package.json             # Root workspace configuration
```

## 🔧 Configuration

### Environment Variables

#### Backend (`backend/.env`)
```env
# Database URL (Supabase PostgreSQL)
DATABASE_URL="postgresql://user:password@host:5432/database"

# Server Configuration
PORT=3000
NODE_ENV=development
```

#### Frontend
The frontend uses Vite's environment variables. Configure in `frontend/.env`:
```env
VITE_API_URL=http://localhost:3000/api
```

## 🗃️ Database Setup

### Using Supabase PostgreSQL

1. Create a project at [supabase.com](https://supabase.com)
2. Get your connection string from Settings → Database
3. Update `DATABASE_URL` in `backend/.env`

```bash
cd backend
npm run setup
```

This will:
1. Generate Prisma client
2. Create database migrations
3. Seed sample products

## 📡 API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | List all orders |
| GET | `/api/orders/:id` | Get single order |
| POST | `/api/orders` | Create order |
| PUT | `/api/orders/:id/status` | Update order status |
| DELETE | `/api/orders/:id` | Delete order |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | List all users |
| GET | `/api/users/:id` | Get single user |
| POST | `/api/users/register` | Register new user |
| POST | `/api/users/login` | Login user |

## 🔐 Authentication

The application includes:
- **User Registration** - Create new accounts
- **User Login** - Authentication with JWT tokens
- **Protected Routes** - Admin pages require login
- **Checkout Protection** - Cart checkout requires authentication

### Test Credentials

Create a new account at `/signup` or use the test checkout flow with any card details.

## 🛒 Features

### Customer Features
- Browse products with search and filtering
- Add products to shopping cart
- Manage cart quantities
- Secure checkout with test payment gateway
- Order history (via admin panel)

### Admin Features
- **Dashboard** - Overview of orders and revenue
- **Products Management** - Add, edit, delete products
- **Orders Management** - View and update order status
- **Users Management** - View registered users

### Order Status Flow
```
PENDING → PROCESSING → SHIPPED → DELIVERED
                      ↓
                CANCELLED
```

## 🎨 Design

The application features a **dark luxury aesthetic** with:
- Premium emerald green accents
- Smooth animations and transitions
- Responsive design for all screen sizes
- Glassmorphism effects
- Toast notifications

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This builds:
- Frontend static files in `frontend/dist/`
- Backend TypeScript in `backend/dist/`

### Start Production Server

```bash
# Build first
npm run build

# Start both servers
npm start
```

Or start individually:

```bash
# Backend
cd backend && npm start

# Frontend (serve static files)
cd frontend && npm run preview
```

## 📝 Available Scripts

### Shell Scripts (Quick Access)

```bash
./install.sh    # Install all dependencies and setup database
./start.sh     # Start both frontend & backend servers
```

### Root Level
```bash
npm run dev          # Start both frontend & backend
npm run dev:frontend # Start only frontend
npm run dev:backend  # Start only backend
npm run build        # Build for production
npm run install:all  # Install all dependencies
npm run setup:db     # Setup database
```

### Frontend
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
```

### Backend
```bash
cd backend
npm run dev:sqlite   # Start with SQLite
npm run dev:pg       # Start with PostgreSQL
npm run setup        # Setup database (migrations + seed)
npm run build        # Compile TypeScript
npm run prisma:studio # Open Prisma database UI
```

## 🐛 Troubleshooting

### Port Already in Use
If ports 3000 or 5173 are in use:
```bash
# Kill processes on those ports
lsof -ti :3000 | xargs kill -9
lsof -ti :5173 | xargs kill -9
```

### Database Issues
```bash
# Reset database - drop all tables and re-run migrations
cd backend
npm run prisma migrate reset
npm run prisma:seed
```

### Clear Cache
```bash
# Clear frontend build cache
cd frontend && rm -rf node_modules/.vite

# Clear all node_modules and reinstall
rm -rf frontend/node_modules backend/node_modules node_modules
npm run install:all
```

## 📄 License

ISC License

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure build passes (`npm run build`)
5. Submit a pull request

# Contributors
siddhi ranka - siddhiranka2512