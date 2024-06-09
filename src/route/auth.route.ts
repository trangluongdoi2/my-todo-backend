import { Router } from "express";
import authController from "../controller/authController";

const router = Router();
router.post('/register', authController.register);
router.post('login', authController.register)
router.post('delete', authController.register)
export default router;