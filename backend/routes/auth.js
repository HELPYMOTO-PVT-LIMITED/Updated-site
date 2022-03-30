const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

router.post(
  "/signup",
  [
    body("name", "Name must have minimum 2 character").isLength({ min: 2 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must have minimum 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() , success : false });
      }
      const user = await User.findOne({ email: req.body.email });
      if (user) {
       return res.status(400).send({
          message: "User with this email already exists please try to login",
          success : false 
        });
      }

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      await new User({ ...req.body, password: hashPassword }).save();
     return res.status(201).send({ message: "Account created successfully" , success : true });
  }
);

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({ message: "Invalid Email or Password"  , success : false });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).send({ message: "Invalid Email or Password" , success : false  });
    }

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "logged in successfully" , success : true });
    
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error"  , success : false });
    console.log(`internal server error : ${error}`)
  }
});



module.exports = router;
