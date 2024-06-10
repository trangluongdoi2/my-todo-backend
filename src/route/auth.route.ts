import { Router } from "express";
import { authController} from "../controller/auth.controller";

const router = Router();
router.post('/sign-up', authController.signUp);
router.post('/signUp-confirm', authController.signUpConfirm);
router.post('/sign-in', authController.signIn)
router.post('/delete', authController.deleteUser)
export default router;