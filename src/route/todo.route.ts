import { todoController } from "@/controller/todo.controller";
import { authMiddleWare} from "@/middleware/auth.middleware";
import { Router } from "express";

const router = Router();
router.get('/todo-list', authMiddleWare.verifyToken, todoController.getTodoList);

export default router;
