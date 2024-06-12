import { authServices } from '@/services/auth.service';
import { Request, Response } from 'express';

class AuthController {
  async signUp(req: Request, res: Response) {
    const { username, password, email } = req.body as any;
    const inputRegister = {
      username,
      password,
      email,
    }
    const data = await authServices.signUp(inputRegister);
    res.status(data.status).send(data.message);
  }

  async signUpConfirm(req: Request, res: Response) {
    const data = await authServices.confirmSignUp(req.body as any);
    res.status(data.status).send(data.message);
  }

  async signIn(req: Request, res: Response) {
    const data = await authServices.signIn(req.body as any);
    res.status(data?.status).json({
      message: data?.message,
      data: data?.data
    });
  }

  async refreshToken(req: Request, res: Response) {
    const data = await authServices.refreshToken(req.body as any);
    res.status(data.status).json({
      message: data.message,
      data: data.data
    });
  }

  updateUser(req: Request, res: Response) {
    console.log(req.body as any);
    res.send('updateUser...')
  }
  
  async deleteUser(req: Request, res: Response) {
    const data = await authServices.deleteUser(req.body.username as string);
    res.status(data.status).send(data.message);
  }
}

export const authController = new AuthController;

