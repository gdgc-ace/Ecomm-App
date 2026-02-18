import { Router } from 'express';
import { getAll, getById, create, update, delete_ } from '../controllers/product.controller.js';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', delete_);

export default router;
