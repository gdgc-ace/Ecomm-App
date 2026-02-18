import prisma from '../config/db.js';

export class OrderService {
  async getAll() {
    return prisma.order.findMany({
      include: { user: true, items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' }
    });
  }

  async getById(id: string) {
    return prisma.order.findUnique({
      where: { id },
      include: { user: true, items: { include: { product: true } } }
    });
  }

  async create(data: { userId: string; items: { productId: string; quantity: number; price: number }[] }) {
    let userId = data.userId;

    // Check if user exists, if not create a guest user
    const existingUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!existingUser) {
      // Create a guest user
      const guestUser = await prisma.user.create({
        data: {
          id: userId,
          email: `guest-${userId}@example.com`,
          name: 'Guest User',
          password: 'guest-placeholder'
        }
      });
      userId = guestUser.id;
    }

    const totalAmount = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return prisma.order.create({
      data: {
        userId,
        totalAmount,
        items: {
          create: data.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: { items: true }
    });
  }

  async updateStatus(id: string, status: string) {
    return prisma.order.update({
      where: { id },
      data: { status: status as any }
    });
  }

  async delete(id: string) {
    return prisma.order.delete({ where: { id } });
  }
}
