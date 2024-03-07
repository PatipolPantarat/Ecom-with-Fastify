import Joi from "joi";

const updateProductJoiSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
  category: Joi.string(),
  stock: Joi.number(),
  sold: Joi.number(),
  image: Joi.string(),
  status: Joi.string(),
});

export default updateProductJoiSchema;
