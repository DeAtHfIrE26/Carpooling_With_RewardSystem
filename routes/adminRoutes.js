const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");

router.post("/confirmRide",adminController.confirmRide);
router.post("/feedback",adminController.submitFeedback);
router.get("/driverride/:driver",adminController.driverrideInformation);
router.get("/passengerride/:passenger",adminController.passengerRideInformation);
module.exports = router;