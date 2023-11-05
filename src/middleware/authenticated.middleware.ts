import jwt from 'jsonwebtoken';
import { verifyToken } from '@/utils/token';
import UserModel from '@/resources/user/user.model';
import Token from '@/utils/interfaces/token.interface';
import { Request, Response, NextFunction } from 'express';
import HttpException from '@/utils/exceptions/http.exception';

export async function authenticateAccount(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith('Bearer ')) {
        return next(new HttpException(401, 'Unauthorized'));
    }
    const accessToken = bearer.split('Bearer ')[1].trim();
    try {
        const payload: Token | jwt.JsonWebTokenError = await verifyToken(accessToken);
        if (payload instanceof jwt.JsonWebTokenError) {
            return next(new HttpException(401, 'Unauthorized'));
        }
        const user = await UserModel.findById(payload.id).select('-password').exec();
        if (!user) {
            return next(new HttpException(401, 'Unauthorized'));
        }
        req.IUser = user;
        return next();
    } catch (error) {
        return next(new HttpException(401, 'Unauthorized'));
    }
}

export async function authenticateAdmin(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith('Bearer ')) {
        return next(new HttpException(401, 'Unauthorized'));
    }
    const accessToken = bearer.split('Bearer ')[1].trim();
    try {
        const payload: Token | jwt.JsonWebTokenError = await verifyToken(accessToken);
        if (payload instanceof jwt.JsonWebTokenError) {
            return next(new HttpException(401, 'Unauthorized'));
        }
        const user = await UserModel.findById(payload.id).select('-password').exec();
        if (!user) {
            return next(new HttpException(401, 'Unauthorized'));
        }
        // Check if the user has the 'admin' role
        if (user.role !== 'admin') {
            return next(new HttpException(403, 'Forbidden'));
        }
        req.IUser = user;
        return next();
    } catch (error) {
        return next(new HttpException(401, 'Unauthorized'));
    }
}

export default {authenticateAccount, authenticateAdmin};