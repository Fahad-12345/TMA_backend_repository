import { Router } from 'express';
import { UserController } from '../controllers/userController.js';
import authenticateToken  from '../middleware/authMiddleware.js';

const userRouter = Router();
const userController = new UserController(); 

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.post('/logout', userController.logout);
userRouter.put('/updateProfile', authenticateToken, userController.updateProfile);

export default userRouter; 
