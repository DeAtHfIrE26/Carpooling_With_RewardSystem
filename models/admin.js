const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
Driver : String,
Passenger: String,
From: String,
To: String,
Date: Date,
TotalPassenger: Number,
DistanceTravelled: Number,
Amount: Number,
});

const feedbackSchema = new mongoose.Schema({
    Driver:String,
    rating : Number,
    Feedback: String
})
module.exports = {
    Admin: mongoose.model('Admin', adminSchema),
    Feedback: mongoose.model('Feedback', feedbackSchema)
};
  