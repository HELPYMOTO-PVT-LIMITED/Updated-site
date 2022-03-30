const express = require("express");
const router = express.Router();
const Enquiry = require("../models/Enquiry");
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  [
    body("name", "Name must have minimum 2 character").isLength({ min: 2 }),
    body("email", "Enter a valid email").isEmail(),
    body("enquiry", "Please express your enquiry in more words").isLength({
      min: 15,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() , success : false });
    }

    Enquiry.create({
      name: req.body.name,
      email: req.body.email,
      enquiry: req.body.enquiry,
    })
      .then(() => res.send({success : true}))
      .catch((e) => {
        console.log(e);
      });
  }
);

module.exports = router;
