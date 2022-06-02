const { body, validationResult } = require("express-validator");

exports.contactFormRules = () => {
  return [
    body("name").notEmpty().escape().withMessage("Field is Required"),

    body("email").isEmail().escape().withMessage("Email is Invalid"),
    body("subject").notEmpty().escape().withMessage("Field is Required"),
    body("message").notEmpty().escape().withMessage("Field is Required"),
  ];
};

exports.validateContactForm = (req, res, next) => {
  // console.log(req.body);
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = {};

  errors.array().map((err) => (extractedErrors[err.param] = err.msg));

  // errors
  //   .array()
  //   .map((err) => extractedErrors.push({ msg: err.msg, param: err.param }));
  // console.log(extractedErrors);

  return res.status(422).json({
    validationErrors: extractedErrors,
  });
};
