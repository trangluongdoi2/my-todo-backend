import { todoService } from "@/services/todo.service";
import { Request, Response } from "express";

class TodoController {
  async getTodoList(req: Request, res: Response) {
    const data = await todoService.getTodoList();
    res.status(data.status).json({
      message: data.message,
      data: data.data
    });
  }

  async queryTodoList(req: Request, res: Response) {
    const data = await todoService.queryTodoList(req?.query);
    res.status(data.status).json({
      message: data.message,
      data: data.data
    });
  }

  async createTodo(req: Request, res: Response) {
    const data = await todoService.createTodo(req.body as any);
    res.status(data.status).send(data.message);
  }

  async createTable(req: Request, res: Response) {
    const data = await todoService.createTable();
    res.status(data.status).send(data.message);
  }
}

export const todoController = new TodoController();

