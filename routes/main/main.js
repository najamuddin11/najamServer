var express = require("express");
const contact = require("../../controller/main/contact");
const main = require("../../controller/main/main");
var router = express.Router();
const {
  contactFormRules,
  validateContactForm,
} = require("../../validation/contact");
router.post("/send", contactFormRules(), validateContactForm, contact.sendMail);
router.get("/", main.getCsrfToken);

module.exports = router;
