import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from '@/utils/validateEnv';
import UserController from '@/resources/user/user.controller';
import PhDrugRefController from '@/resources/philippines/ph.controller';

validateEnv();
const app = new App([
    new UserController(),
    new PhDrugRefController(),
], Number(process.env.port));
app.listen();