import { Router } from 'express';
import { getAll, getById, register, login, update, delete_ } from '../controllers/user.controller.js';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/register', register);
router.post('/login', login);
router.put('/:id', update);
router.delete('/:id', delete_);

export default router;
