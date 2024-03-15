import joi from "joi";

const changeJoiSchema = joi.object({
  oldPassword: joi.string().required(),
  newPassword: joi.string().required(),
});

export default changeJoiSchema;
