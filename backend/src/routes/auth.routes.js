import express from 'express';
import { getMeController, loginController, logoutController, registerController } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const authRouter = express.Router();

// Register route

authRouter.post("/register",registerController);
authRouter.post("/login",loginController);
authRouter.get("/logout",logoutController);
authRouter.get("/get-me",authMiddleware,getMeController)
export default authRouter;