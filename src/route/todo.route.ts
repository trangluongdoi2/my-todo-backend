import { todoController } from "@/controller/todo.controller";
import { authMiddleWare} from "@/middleware/auth.middleware";
import { Router } from "express";

const router = Router();
// router.get('/todo-list', authMiddleWare.verifyToken, todoController.getTodoList);
router.get('/todo-list', todoController.getTodoList);
router.get('/todo-query', todoController.queryTodoList);
// router.post('/todo-list', authMiddleWare.verifyToken, todoController.createTodo);
router.post('/create-todo', todoController.createTodo);
router.post('/create-table', todoController.createTable);

export default router;
