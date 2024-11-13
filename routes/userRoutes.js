import { Router } from "express";
import { UserController } from "../controllers/userController.js";
import authenticateToken from "../middleware/authMiddleware.js";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/registeredUsers", userController.getusersList);

export default userRouter;
