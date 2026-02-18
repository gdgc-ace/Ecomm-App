import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import path from 'path';
import { config } from 'dotenv';

config({ path: path.resolve(process.cwd(), ".env") });

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error('DATABASE_URL environment variable is required');
}

const pool = new Pool({ connectionString: dbUrl });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export default prisma;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).prisma = prisma;
}
