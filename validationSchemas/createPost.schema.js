import Joi from 'joi';

const createPostSchema = Joi.object({
  title: Joi.string().min(5).required(),
  body: Joi.string().min(10).required(),
});
export default createPostSchema;
