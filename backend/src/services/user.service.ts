import prisma from '../config/db.js';

export class UserService {
  async getAll() {
    return prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }

  async getByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async register(data: { email: string; name?: string; password: string }) {
    return prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: data.password
      }
    });
  }

  async update(id: string, data: Partial<{ name: string; email: string }>) {
    return prisma.user.update({
      where: { id },
      data
    });
  }

  async delete(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}
