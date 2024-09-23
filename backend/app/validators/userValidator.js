import Joi from "joi";

export const userSchema = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(15).required(),
    age: Joi.number().required(),
    role: Joi.string().valid("admin", "volunteer").optional(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};
