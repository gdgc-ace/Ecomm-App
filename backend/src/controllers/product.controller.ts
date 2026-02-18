import { Request, Response } from 'express';
import { ProductService } from '../services/product.service.js';

const productService = new ProductService();

export async function getAll(_req: Request, res: Response) {
  try {
    const products = await productService.getAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products', details: error instanceof Error ? error.message : String(error) });
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const product = await productService.getById(req.params.id as string);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
}

export async function create(req: Request, res: Response) {
  try {
    const product = await productService.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const product = await productService.update(req.params.id as string, req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
}

export async function delete_(req: Request, res: Response) {
  try {
    await productService.delete(req.params.id as string);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
}
