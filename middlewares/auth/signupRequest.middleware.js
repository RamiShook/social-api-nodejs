import signupSchema from "../../validationSchemas/signup.schema.js";

export default async (req, res, next) => {
  try {
    req.body = await signupSchema.validateAsync(req.body);
  } catch (validationError) {
    return res.status(422).json(validationError.details[0]);
  }
  next();
};
