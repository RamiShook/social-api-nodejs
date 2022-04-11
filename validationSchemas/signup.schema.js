import Joi from "joi";
const signupSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(5).required(),
  repeat_password: Joi.ref("password"),
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
}).with("password", "repeat_password");
export default signupSchema;
