import Joi from "joi";

export const inventorySchema = (data) => {
  const schema = Joi.object({
    item_name: Joi.string().min(1).required(),
    item_type: Joi.string().valid("relief", "expense").required(),
    quantity: Joi.string().required(),
    cost: Joi.number().precision(2).positive().required(),
  });
  return schema.validate(data);
};
