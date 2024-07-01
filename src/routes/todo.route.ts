import { Router } from "express";
import { todoController } from "@/controller/todo.controller";
import { authMiddleWare } from "@/middleware/auth.middleware";

const router = Router();
router.get('/todo', todoController.getTodoList);
router.get('/todo/:id', todoController.getTodoById)
router.post('/todo/create', todoController.createTodo);
router.put('/todo/update/:id', todoController.updateTodo);
router.delete('/todo/delete/:id', todoController.deleteTodo);

export default router;
