#!/bin/bash

# Seed Production Database on Vercel
# Run this after deploying backend to Vercel

echo "🌱 Seeding production database..."

# Set your production database URL
export DATABASE_URL="postgresql://postgres:hFs4hLjoYbD2AJnc@db.krlxghorctjyfimglalh.supabase.co:5432/postgres"
export DATABASE_TYPE="postgresql"

# Run migrations
echo "📦 Running migrations..."
npx prisma migrate deploy

# Seed database
echo "🌱 Seeding data..."
npx tsx prisma/seed.ts

echo "✅ Database seeded successfully!"
