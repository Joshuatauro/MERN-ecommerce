const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String
  },
  passwordHash: {
    required: true,
    type: String
  }
})

const User = mongoose.model("user", userSchema)

module.exports = User