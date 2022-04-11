import createPostSchema from "../../validationSchemas/createPost.schema.js";

export default async (req, res, next) => {
  try {
    req.body = await createPostSchema.validateAsync(req.body);
  } catch (validationError) {
    return res.status(422).json(validationError.details[0]);
  }
  next();
};
