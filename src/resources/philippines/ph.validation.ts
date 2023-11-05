import Joi from 'joi';

const create = Joi.object({
    generic_name: Joi.string().required(),
    dosage: Joi.string().required(),
    forms_of_medication: Joi.string().required(),
    lowest_price: Joi.number().required(),
    median_price: Joi.number().required(),
    highest_price: Joi.number().required(),
    date_released: Joi.string().required(),
    official_currency: Joi.string().required(),
    country: Joi.string().required(),
    author: Joi.string().required(),
    reference: Joi.string().required()
})

export default { create };