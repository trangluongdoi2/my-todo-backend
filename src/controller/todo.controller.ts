import { Request, Response } from "express";

class TodoController {
  async getTodoList(req: Request, res: Response) {
    res.send('Hello World pass middleware');
  }
}

export const todoController = new TodoController();

