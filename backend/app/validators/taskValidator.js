import Joi from "joi";

export const taskSchema = (data) => {
  const schema = Joi.object({
    task_description: Joi.string().required(),
    volunteer_id: Joi.number().integer().required(),
    crisis_id: Joi.number().integer().required(),
    status: Joi.string()
      .valid("pending", "in-progress", "completed")
      .default("pending"),
  });

  return schema.validate(data);
};
