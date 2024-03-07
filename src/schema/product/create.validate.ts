import Joi from "joi";

const createProductJoiSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required(),
  stock: Joi.number().required(),
  sold: Joi.number().required(),
  image: Joi.string().required(),
  status: Joi.string().required(),
});

export default createProductJoiSchema;
