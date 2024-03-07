import joi from "joi";

const resetJoiSchema = joi.object({
  email: joi.string().email().required(),
});

export default resetJoiSchema;
