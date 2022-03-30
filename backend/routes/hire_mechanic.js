const express = require("express");
const router = express.Router();
const Hire = require("../models/Hire_mechanic");
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  [
    //TODO(add some validator)
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() , success : false});
    }
    Hire.create({
        location: req.body.location,
        vehicle_modal: req.body.vehicle_modal,
        vehicle_number: req.body.vehicle_number,
        problem: req.body.problem,
    })
      .then((response) => res.send({success : true}))
      .catch((e) => {
        console.log(e);
      });
  }
);

module.exports = router;
