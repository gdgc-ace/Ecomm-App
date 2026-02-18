import { Router } from 'express';
import { getAll, getById, create, updateStatus, delete_ } from '../controllers/order.controller.js';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id/status', updateStatus);
router.delete('/:id', delete_);

export default router;
