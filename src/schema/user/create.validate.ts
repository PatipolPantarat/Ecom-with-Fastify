import joi from "joi";

const createUserJoiSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  role: joi.string().valid("admin", "user").required(),
});

export default createUserJoiSchema;
