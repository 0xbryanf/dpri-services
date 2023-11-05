import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import Validate from '@/resources/philippines/ph.validation';
import PhpDrugRefService from '@/resources/philippines/ph.service';
import { authenticateAdmin } from '@/middleware/authenticated.middleware';

class PhDrugRefController implements Controller {
    public path = '/ph';
    public router = Router();
    private PhpDrugRefService = new PhpDrugRefService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/create/drug`,
            validationMiddleware(Validate.create),
            authenticateAdmin,
            this.create
        )
    }

    private create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const {
                generic_name,
                dosage,
                forms_of_medication,
                lowest_price,
                median_price,
                highest_price,
                date_released,
                official_currency,
                country,
                author,
                reference
            } = req.body;
            const data = await this.PhpDrugRefService.create(
                generic_name,
                dosage,
                forms_of_medication,
                lowest_price,
                median_price,
                highest_price,
                date_released,
                official_currency,
                country,
                author,
                reference
            );
            res.status(200).json({ data });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    }

}

export default PhDrugRefController;