import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { config } from 'dotenv';

config();

const dbType = process.env.DATABASE_TYPE || "sqlite";
const dbUrl = process.env.DATABASE_URL || "file:./dev.db";

console.log("DB Type:", dbType);
console.log("DB URL:", dbUrl);

let prisma: PrismaClient;

if (dbType === "postgresql") {
  const pool = new Pool({ connectionString: dbUrl });
  const adapter = new PrismaPg(pool);
  prisma = new PrismaClient({ adapter });
} else {
  const { PrismaLibSql } = await import('@prisma/adapter-libsql');
  const { createClient } = await import('@libsql/client');
  const libsql = createClient({ url: dbUrl });
  const adapter = new PrismaLibSql({ url: dbUrl } as any);
  prisma = new PrismaClient({ adapter });
}

async function main() {
  console.log('Seeding database...');
  console.log('Database Type:', dbType);

  try {
    const products = [
      {
        name: 'Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 149.99,
        stock: 50,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      },
      {
        name: 'Smart Watch',
        description: 'Feature-rich smartwatch with health tracking',
        price: 299.99,
        stock: 30,
        category: 'Electronics',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
      },
      {
        name: 'Running Shoes',
        description: 'Comfortable running shoes for everyday use',
        price: 89.99,
        stock: 100,
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      },
      {
        name: 'Laptop Backpack',
        description: 'Durable backpack with laptop compartment',
        price: 59.99,
        stock: 75,
        category: 'Accessories',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      },
      {
        name: 'Coffee Maker',
        description: 'Automatic coffee maker with timer function',
        price: 79.99,
        stock: 40,
        category: 'Home',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      },
      {
        name: 'Yoga Mat',
        description: 'Non-slip yoga mat for comfortable workouts',
        price: 34.99,
        stock: 60,
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
      },
    ];

    for (const product of products) {
      await prisma.product.create({ data: product });
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
