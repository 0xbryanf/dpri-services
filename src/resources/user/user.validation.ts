import Joi from 'joi';

const register = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(9),
    confirm_password: Joi.string().valid(Joi.ref('password')).messages({
        'any.only': 'Passwords do not match.',
    }),
});

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export default { register, login };
