const router = require("express").Router();
const User = require("../models/userScheme");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const e = require("express");

router.post("/", async (req, res) => {
  const { email, password, passwordVerify } = req.body;
  try {
    if (!email || !password || !passwordVerify) return res.status(400).json({errorMessage: "Please enter all the valid details"});
    else if (password.length < 5) return res.status(400).json({errorMessage: "Please enter a password of length bigger than 5"});
    else if (password !== passwordVerify) return  res.status(400).json({errorMessage: "Please enter the same password in both field"});
    
    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(400).json({errorMessage: "User with this account exists already",});
    

    //Salting
    else {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt); //hashed password

      //create new user account

      const newUser = new User({
        email,
        passwordHash: passwordHash,
      });

      const savedUser = await newUser.save();

      //LOGGING IN A USER
      const token = jwt.sign(
        {
          user: savedUser._id,
        },
        process.env.JWT_SECRET
      );

      //SENDING THE COOKIE TO FRONTEND
      try {
        res
          .cookie("token", token, {
            httpOnly: true,
          })
          .json({
            successMessage: "Sent cookie successfully",
          });
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    res.status(400).json({
      errorMessage: err,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) return res.status(400).json({errorMessage: "Please enter all the valid details",});
    

    const existingUser = await User.findOne({ email });

    console.log(existingUser)

    if(!existingUser) return res.status(401).json({errorMessage:"Account does not exist or was deleted or password was changed",});
    

    const isPasswordCorrect = bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!isPasswordCorrect) return res.status(401).json({errorMessage: "Wrong email or password",});


    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({
        successMessage: "Successfully logged in",
      });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      errorMessage: err.message,
    });
  }
});

router.get('/logout', (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0) //Date(0) sets expire date to some random date in the past, hence no cookie will exist
  }).json({
    successMessage: "Logged out successfully"
  })
})

module.exports = router;
