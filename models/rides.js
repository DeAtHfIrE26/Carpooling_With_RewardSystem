const mongoose = require("mongoose");

const RideDetailschema = new mongoose.Schema(
  {
    driverName: {
      type: String,
      ref: "User",
      required: true,
      unique: false,
      maxLength: 15,
    },
    license: {
      type: String,
      validate: {
        validator: function (v) {
          return /^\d{16}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid license number! Must be 16 characters.`,
      },
    },
    seat: Number,
    carno: String,
    carname: {
      type: String,
      maxLength: 10,
    },
    cartype: String,
    charge: {
      type: Number,
      max: 1000,
    },
    from: {
      type: String,
      maxLength: 20,
    },
    to: {
      type: String,
      maxLength: 20,
    },
    driver_username: {
      type: String,
      ref: "User",
      required: true,
      minLength: 5,
      maxLength: 10,
    },
    date: { type: Date, default: Date.now },
    passenger: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    occupied: { type: Number, default: 0 },
    code: { type: Number, unique: true, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Ridedetail", RideDetailschema);
