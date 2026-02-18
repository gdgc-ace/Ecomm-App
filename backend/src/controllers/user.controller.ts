import { Request, Response } from 'express';
import { UserService } from '../services/user.service.js';

const userService = new UserService();

export async function getAll(_req: Request, res: Response) {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const user = await userService.getById(req.params.id as string);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}

export async function register(req: Request, res: Response) {
  try {
    const { email, name, password } = req.body;
    const existingUser = await userService.getByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    const user = await userService.register({ email, name, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await userService.getByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ user, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const user = await userService.update(req.params.id as string, req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
}

export async function delete_(req: Request, res: Response) {
  try {
    await userService.delete(req.params.id as string);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
}
