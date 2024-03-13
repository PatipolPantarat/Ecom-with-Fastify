import joi from "joi";

const createOrderJoiSchema = joi.object({
  userId: joi.string().required(),
  products: joi
    .array()
    .items(
      joi.object({
        productId: joi.string().required(),
        quantity: joi.number().required(),
        price: joi.number().required(),
      })
    )
    .required(),
  total_price: joi.number().required(),
  status: joi
    .valid("pending", "processing", "shipped", "delivered", "cancelled")
    .required(),
});

export default createOrderJoiSchema;
