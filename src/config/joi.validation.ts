import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
    PORT: Joi.number().default(3000),
    DB_NAME: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASS: Joi.string().required(),
    DB_HOST: Joi.string().required(),
})