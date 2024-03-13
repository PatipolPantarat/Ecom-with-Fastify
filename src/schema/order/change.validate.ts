import joi from "joi";

const changeStatusOrderJoiSchema = joi.object({
  orderId: joi.string().required(),
  status: joi
    .valid("pending", "processing", "shipped", "delivered", "cancelled")
    .required(),
});

export default changeStatusOrderJoiSchema;
