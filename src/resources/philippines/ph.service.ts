import PhpDrugRefModel from '@/resources/philippines/ph.model';
import IDrugReference from '@/utils/interfaces/drugRef.interface';
import HttpException from '@/utils/exceptions/http.exception';

class PhpDrugRefService {
    private PhpDrugRefModel = PhpDrugRefModel;

    public async create(
        generic_name: string,
        dosage: string,
        forms_of_medication: string,
        lowest_price: number,
        median_price: number,
        highest_price: number,
        date_released: string,
        official_currency: string,
        country: string,
        author: string,
        reference: string
    ): Promise< IDrugReference | Error> {
        try {
            const data = await this.PhpDrugRefModel.create({
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
            });
            return data;
        } catch (error) {
            throw new HttpException(400, "Unable to add the drug/medicine.")
        }
    }

}

export default PhpDrugRefService;