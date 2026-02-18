import prisma from '../config/db.js';

export class ProductService {
  async getAll() {
    return prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getById(id: string) {
    return prisma.product.findUnique({ where: { id } });
  }

  async create(data: { name: string; description?: string; price: number; stock?: number; image?: string; category?: string }) {
    return prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock ?? 0,
        image: data.image,
        category: data.category
      }
    });
  }

  async update(id: string, data: Partial<{ name: string; description: string; price: number; stock: number; image: string; category: string }>) {
    return prisma.product.update({
      where: { id },
      data
    });
  }

  async delete(id: string) {
    return prisma.product.delete({ where: { id } });
  }
}
