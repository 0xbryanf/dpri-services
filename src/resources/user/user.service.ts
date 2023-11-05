import UserModel from '@/resources/user/user.model';
import token from '@/utils/token';
import HttpException from '@/utils/exceptions/http.exception';

class UserService {
    private userModel = UserModel;

    // Register account
    public async register(email: string, password: string, confirm_password: string, role: string): Promise<string | Error> {
        try {
            const user = await this.userModel.create({ email, password, confirm_password, role });
            const accessToken = token.createToken(user);
            return accessToken;
        } catch (error) {
            throw new HttpException(400, "Unable to Create Developer's Account");
        }
    }

    // Login account
    public async login(email: string, password: string): Promise<string | Error> {
        try {
            const user = await this.userModel.findOne({ email });

            if (!user) {
                throw new Error('Unable to find developer with that email address');
            }

            if (await user.isValidPassword(password)) {
                return token.createToken(user);
            } else {
                throw new Error('Wrong credentials given');
            }
            
        } catch (error) {
            throw new HttpException(400, 'Unable to login');
        }
    }
}

export default UserService;