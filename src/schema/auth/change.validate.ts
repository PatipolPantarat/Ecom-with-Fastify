import joi from "joi";

const changeJoiSchema = joi.object({
  email: joi.string().email().required(),
  oldPassword: joi.string().required(),
  newPassword: joi.string().required(),
});

export default changeJoiSchema;
