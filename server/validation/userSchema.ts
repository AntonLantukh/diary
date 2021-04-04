import Joi from 'joi';

export const userRegisterSchema = Joi.object({
    email: Joi.string().email().lowercase().required().messages({
        'string.base': `"email" should be a type of 'text'`,
        'string.empty': `"email" cannot be an empty field`,
        'string.min': `"email" should have a minimum length of {#limit}`,
        'any.required': `"email" is a required field`,
    }),
    password: Joi.string().min(8).required(),
    passwordConfirm: Joi.ref('password'),
});

export const userLoginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required(),
});
