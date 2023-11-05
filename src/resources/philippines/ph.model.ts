import { Schema, model } from 'mongoose';
import IDrugReference from '@/utils/interfaces/drugRef.interface';

const PhilippineDrugReference = new Schema<IDrugReference>({
    generic_name: { type: String, required: true },
    dosage: { type: String, required: true },
    forms_of_medication: { type: String, required: true },
    lowest_price: { type: Number, required: true },
    median_price: { type: Number, required: true },
    highest_price: { type: Number, required: true },
    date_released: { type: String, required: true },
    official_currency: { type: String, required: true },
    country: { type: String, required: true },
    author: { type: String, required: true },
    reference: { type: String, required: true }
}, {timestamps: true})

export default model<IDrugReference>('Philippine_Drug_Reference', PhilippineDrugReference);