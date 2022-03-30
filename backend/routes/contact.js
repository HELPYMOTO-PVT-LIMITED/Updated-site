const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  [
    body("name", "Name must have minimum 2 character").isLength({ min: 2 }),
    body("email", "Enter a valid email").isEmail(),
    body("phone_number" , "Phone number should be 10 digit long only").isLength({ min: 10 , max : 10 }),
    body("message" , "Please write some more words").isLength({ min: 10}),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() , success : false});
    }
    Contact.create({
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      message: req.body.message,
    })
      .then(() => res.status(200).send({success : true}))
      .catch((e) => {
        console.log(e);
      });
  }
);

module.exports = router;
