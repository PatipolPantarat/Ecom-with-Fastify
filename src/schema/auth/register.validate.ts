import joi from "joi";

const registerJoiSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});

export default registerJoiSchema;
