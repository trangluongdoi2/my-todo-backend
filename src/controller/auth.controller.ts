import { authServices} from '@/services/auth.service';
import { Request, Response } from 'express';

class AuthController {
  async signUp(req: Request, res: Response) {
    const { username, password, email } = req.body as any;
    const inputRegister = {
      username: username + Math.floor(Math.random() * 100).toString(),
      password,
      email,
    }
    const data = await authServices.signUp(inputRegister);
    res.status(data.status).send(data.message);
  }

  async signUpConfirm(req: Request, res: Response) {
    const data = await authServices.signUpConfirm(req.body as any);
    res.status(data.status).send(data.message);
  }

  async signIn(req: Request, res: Response) {
    const data = await authServices.signIn(req.body as any);
    res.status(data.status).json({
      message: data.message,
      data: data.data
    });
  }

  update(req: Request, res: Response) {
    console.log(req.body as any);
    res.send('update...')
  }

  deleteUser(req: Request, res: Response) {
    console.log(req.body as any);
    res.send('delete...')
  }
}

export const authController = new AuthController;

