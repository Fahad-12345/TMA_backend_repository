import { Router } from 'express';
import { getAllUsers, createUser } from '../controllers/userController.js'; 

const router = Router();

// Define user routes
router.get('/', getAllUsers);
router.post('/', createUser);

export default router;

