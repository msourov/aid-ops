import Joi from "joi";

export const validateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(10).max(15).required(),
    role: Joi.string().valid("admin", "user").required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};
