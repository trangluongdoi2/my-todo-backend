import { Request, Response } from 'express';
const authController = {
  register: (req: Request, res: Response) => {
    console.log(req.body as any);
    res.send('Register...')
  }
}

export default authController;