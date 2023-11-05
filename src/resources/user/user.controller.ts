import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import validate from '@/resources/user/user.validation';
import UserService from '@/resources/user/user.service';
import { authenticateAccount } from '@/middleware/authenticated.middleware';

class UserController implements Controller {
    public path = '/account';
    public router = Router();
    private UserService = new UserService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/create`,
            validationMiddleware(validate.register),
            this.register
        );

        this.router.post(
            `${this.path}/sign-in`,
            validationMiddleware(validate.login),
            this.login
        );

        this.router.get(
            `${this.path}`,
            authenticateAccount,
            this.getUser
        );
    }

    private register = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { email, password, confirm_password } = req.body;
            const token = await this.UserService.register(email, password, confirm_password, 'regular');
            res.status(200).json({ token });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { email, password } = req.body;
            const token = await this.UserService.login(email, password);
            res.status(200).json({ token });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }

    private getUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        if (!req.IUser) {
            return next(new HttpException(404, 'No logged in user'));
        }
        res.status(200).send({ data: req.IUser });
    }
}

export default UserController;