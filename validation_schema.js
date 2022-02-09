const Joi = require('@hapi/joi');

const userSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(3).max(20).required(),
    admin: Joi.boolean(),
    mod: Joi.boolean()
});

const bookSchema = Joi.object({
    name: Joi.string().min(1).required(),
    author: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
    userId: Joi.number().integer().min(0)
});

const eventSchema = Joi.object({
    name: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
    date: Joi.required(),
    time: Joi.required(),//.regex(/\b((1[0-2]|0?[1-9]):([0-5][0-9])([AaPp][Mm]))/)
    host: Joi.string().required().min(1),
    guests: Joi.number().integer().required()
});

const messageSchema = Joi.object({
    body: Joi.string().min(1).required(),
    userId: Joi.number().integer().required().min(1)
});

module.exports = {
    userSchema,
    bookSchema,
    eventSchema,
    messageSchema
}