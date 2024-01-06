const { body, validationResult } = require("express-validator");

exports.contactFormRules = () => {
  return [
    body("name").notEmpty().escape().withMessage("Field is Required"),
    body("email").isEmail().escape().withMessage("Email is Invalid"),
    body("message").notEmpty().escape().withMessage("Field is Required"),
  ];
};

exports.validateContactForm = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = {};

  errors.array().map((err) => (extractedErrors[err.param] = err.msg));

  return res.status(422).json({
    validationErrors: extractedErrors,
  });
};
