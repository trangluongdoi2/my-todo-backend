import TodoService from "@/services/todo.service";
import { Request, Response } from "express";

class TodoController {
  async getTodoList(req: Request, res: Response) {
    const data = await TodoService.getTodoList();
    res.status(data.status).json({
      message: data.message,
      data: data.data
    });
  }

  async getTodoById(req: Request, res: Response) {
    const data = await TodoService.getTodoItemDetails(req.params.id);
    res.status(data.status).json({
      message: data.message,
      data: data.data
    });
  }

  async queryTodoList(req: Request, res: Response) {
    const data = await TodoService.queryTodoList(req?.query);
    res.status(data.status).json({
      message: data.message,
      data: data.data
    });
  }

  async createTodo(req: Request, res: Response) {
    const data = await TodoService.createTodo(req.body as any);
    res.status(data.status).json({
      message: data.message,
      data: data.data
    });
  }
  
  async updateTodo(req: Request, res: Response) {
    const data = await TodoService.updateTodo(req.body as any);
    res.status(data.status).json({
      message: data.message,
      data: data.data
    });
  }

  async deleteTodo(req: Request, res: Response) {
    const data = await TodoService.deleteTodo(req.params.id);
    res.status(data.status).send(data.message);
  }
}

export const todoController = new TodoController();

