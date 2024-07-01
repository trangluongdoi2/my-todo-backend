import { todoController } from "@/controller/todo.controller";
import { authMiddleWare} from "@/middleware/auth.middleware";
import { Router, Response, Request } from "express";

/**
 * @swagger
 * /example:
 *      post:
 *          summary: Send the text to the server
 *          tags:
 *              - ExampleEndpoints
 *          description: Send a message to the server and get a response added to the original text.
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              responseText:
 *                                  type: string
 *                                  example: This is some example string! This is an endpoint
 *          responses:
 *              201:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  text:
 *                                      type: string
 *                                      example: This is some example string!
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 */

function test(req: Request, res: Response) {
  res.status(200).json({
    message: 'Hehehe',
    data: ['Vinh1', 'Vinh2', 'Vinh3']
  })
}

const router = Router();
router.get('/home', test);

router.get('/todo-list', todoController.getTodoList);
router.get('/todo-query', todoController.queryTodoList);
router.post('/create-todo', todoController.createTodo);
router.post('/create-table', todoController.createTable);

export default router;
