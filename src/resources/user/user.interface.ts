import { Document } from 'mongoose';

interface IUser extends Document {
    email: string;
    password: string;
    role: string;
    isValidPassword(password: string): Promise<Error | boolean>;
}

export default IUser;