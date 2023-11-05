import { Document } from 'mongoose';

interface IDrugReference extends Document {
    generic_name: string;
    dosage: string;
    forms_of_medication: string;
    lowest_price: number;
    median_price: number;
    highest_price: number;
    date_released: string;
    official_currency: string;
    country: string;
    author: string;
    reference: string;
}

export default IDrugReference;