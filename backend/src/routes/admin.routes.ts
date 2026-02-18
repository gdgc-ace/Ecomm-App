import { Router } from 'express';
import prisma from '../config/db.js';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const router = Router();

const seedProducts = async () => {
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

  await prisma.product.deleteMany();
  
  for (const product of products) {
    await prisma.product.create({ data: product });
  }
  
  return products.length;
};

router.get('/migrate', async (_req, res) => {
  try {
    await execAsync('npx prisma migrate deploy');
    res.json({ message: 'Migrations applied successfully' });
  } catch (error) {
    console.error('Migration error:', error);
    res.status(500).json({ error: 'Failed to run migrations', details: error });
  }
});

router.get('/seed', async (_req, res) => {
  try {
    const count = await seedProducts();
    res.json({ message: 'Database seeded successfully', count });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ error: 'Failed to seed database', details: String(error) });
  }
});

router.post('/seed', async (_req, res) => {
  try {
    const count = await seedProducts();
    res.json({ message: 'Database seeded successfully', count });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ error: 'Failed to seed database', details: String(error) });
  }
});

export default router;
