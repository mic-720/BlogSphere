const Joi = require("joi");

module.exports.blogSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).required(), // Array of strings for tags
});

