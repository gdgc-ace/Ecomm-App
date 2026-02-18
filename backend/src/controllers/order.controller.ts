import { Request, Response } from 'express';
import { OrderService } from '../services/order.service.js';

const orderService = new OrderService();

export async function getAll(_req: Request, res: Response) {
  try {
    const orders = await orderService.getAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const order = await orderService.getById(req.params.id as string);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const order = await orderService.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ 
      error: 'Failed to create order', 
      details: error instanceof Error ? error.message : String(error) 
    });
  }
}

export async function updateStatus(req: Request, res: Response) {
  try {
    const { status } = req.body;
    const order = await orderService.updateStatus(req.params.id as string, status);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
}

export async function delete_(req: Request, res: Response) {
  try {
    await orderService.delete(req.params.id as string);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
}
