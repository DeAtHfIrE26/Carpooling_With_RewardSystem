const express = require("express");
const router = express.Router();

const generateUniqueCode = require("../utils/generateUniqueCode");
const riderController = require("../controller/riderController");

router.post("/ridedetails", generateUniqueCode, riderController.riderDetails);
router.post('/createRide', riderController.createRide); 
router.get("/passengerride/:ispassengercount/:isfrom/:isto",riderController.passengerRide);
router.get('/getRideInformation/:riderUsername', riderController.rideInformation); 
router.get('/getPassengerRide/:passengerUsername', riderController.passengerRideInformation); 
router.post('/passengerlist',riderController.passengerlist);
router.get('/passengerRequest/:driverUsername',riderController.passengerRequest);
router.post('/requestDelete',riderController.deleteRequest);
router.post("/singleRequest",riderController.singleRequest);
router.get("/confirmbook/:userName",riderController.confirmBook);
module.exports = router;
