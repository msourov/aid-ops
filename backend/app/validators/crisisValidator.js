import Joi from "joi";

export const validateCrisis = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(3).max(200).optional(),
    location: Joi.string().min(5).max(255).required(),
    severity: Joi.string().valid("low", "medium", "high").optional(),
    status: Joi.string().valid("pending", "approved", "rejected").optional(),
    created_by: Joi.number().integer().optional(),
    reviewed_by: Joi.number().integer().optional(),
  });

  return schema.validate(data);
};
