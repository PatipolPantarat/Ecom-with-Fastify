import joi from "joi";

const createUserJoiSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  role: joi.string().valid("admin", "user").required(),
  fullName: joi.string(),
  birthDate: joi.date(),
  phoneNumber: joi.string(),
  imageUrl: joi.string(),
  favorites: joi.array().items(joi.string()),
  addresses: joi.array().items(joi.string()),
  orders: joi.array().items(joi.string()),
});

export default createUserJoiSchema;
