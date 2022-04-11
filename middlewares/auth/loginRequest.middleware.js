import loginSchema from "../../validationSchemas/login.schema.js";

export default async (req, res, next) => {
  try {
    req.body = await loginSchema.validateAsync(req.body);
  } catch (validationError) {
    return res.status(422).json(validationError.details[0]);
  }
  next();
};
