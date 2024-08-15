const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  first: {
    type: String,
    maxLength: 15,
  },
  last: {
    type: String,
    maxLength: 15,
  },
  username: { type: String, unique: true, minLength: 5, maxLength: 15 },
  password: {
    type: String,
  },
  dob: Date,
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! Must be 10 digits.`,
    },
  },
  email: String,
  gender: String,
  totalKmTravelled: Number,
});
module.exports = mongoose.model("User", userSchema);
