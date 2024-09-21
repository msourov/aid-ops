import Joi from "joi";

export const validateDonor = (data) => {
  const schema = Joi.object({
    donor_name: Joi.string().min(3).max(30).required(),
    donor_email: Joi.string().email().required(),
    amount: Joi.number().required(),
  });

  return schema.validate(data);
};
