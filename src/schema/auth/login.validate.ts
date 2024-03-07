import joi from "joi";

const loginJoiSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export default loginJoiSchema;
