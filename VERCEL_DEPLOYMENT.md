# Vercel Deployment Guide

## Prerequisites
- Vercel account (https://vercel.com)
- GitHub repository connected to Vercel
- PostgreSQL database (Supabase recommended)

## Backend Deployment

### 1. Setup Database
1. Create a PostgreSQL database on Supabase
2. Get your connection string from Supabase dashboard

### 2. Deploy Backend to Vercel

#### Option A: Via Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Select `backend` as the root directory
4. Add environment variables:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NODE_ENV`: `production`
5. Build settings:
   - Build Command: `npm run build && npx prisma generate`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. Click "Deploy"

#### Option B: Via Vercel CLI
```bash
cd backend
npm install -g vercel
vercel login
vercel --prod
```

### 3. Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables:
```
DATABASE_URL=postgresql://user:password@host:5432/database
NODE_ENV=production
```

### 4. Run Database Migrations
After first deployment:
```bash
# Install Vercel CLI
npm install -g vercel

# Link to your project
vercel link

# Run migrations
vercel env pull .env.production
npx prisma migrate deploy
npx prisma db seed
```

## Frontend Deployment

### 1. Update API URL
Update `frontend/.env`:
```env
VITE_API_URL=https://your-backend.vercel.app/api
```

### 2. Deploy Frontend to Vercel

#### Option A: Via Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your GitHub repository (or create new project)
3. Select `frontend` as the root directory
4. Add environment variables:
   - `VITE_API_URL`: Your backend Vercel URL + `/api`
5. Build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
6. Click "Deploy"

#### Option B: Via Vercel CLI
```bash
cd frontend
vercel --prod
```

### 3. Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables:
```
VITE_API_URL=https://your-backend.vercel.app/api
```

## Post-Deployment

### Update Frontend API URL
After backend is deployed, update frontend environment variable:
1. Go to Frontend project in Vercel
2. Settings → Environment Variables
3. Update `VITE_API_URL` with your backend URL
4. Redeploy frontend

### Enable CORS
Backend already has CORS enabled for all origins. For production, update `backend/src/app.ts`:
```typescript
app.use(cors({
  origin: 'https://your-frontend.vercel.app',
  credentials: true
}));
```

## Automatic Deployments

Once connected to GitHub:
- Push to `main` branch → Auto-deploy to production
- Push to other branches → Auto-deploy to preview URLs

## Troubleshooting

### Database Connection Issues
- Ensure DATABASE_URL is set in Vercel environment variables
- Check if your database allows connections from Vercel IPs
- For Supabase: Enable "Connection Pooling" mode

### Build Failures
```bash
# Test build locally
cd backend
npm run build
npx prisma generate

cd ../frontend
npm run build
```

### API Not Working
- Check backend logs in Vercel dashboard
- Verify VITE_API_URL in frontend environment variables
- Ensure backend routes are accessible

## Monitoring

- View logs: Vercel Dashboard → Deployments → Click deployment → Logs
- Check analytics: Vercel Dashboard → Analytics
- Monitor errors: Vercel Dashboard → Logs → Errors

## Custom Domains (Optional)

1. Go to Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update CORS settings in backend if needed
