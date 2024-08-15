const { json } = require("express");
const RideDetails = require("../models/rides");
const User = require("../models/user");

exports.riderDetails = async (req, ress) => {
  await RideDetails.create({ ...req.body, code: req.uniqueCode })
    .then((res) => {
      ress.send(res);
    })
    .catch((err) => {
      ress.send(err.message);
    });
};

exports.createRide = async (req, res) => {
  try {
    const {
      driverName,
      license,
      seat,
      carno,
      carname,
      cartype,
      charge,
      from,
      to,
      driver_username,
      date,
      occupied,
      passenger,
      code,
    } = req.body;
    const user = await User.findOne({ username: driver_username });
    var driverId = null;
    const nameOfDriver = `${user.first} ${user.last}`;
    if (user) {
      driverId = user._id;
      const ride = new RideDetails({
        driverName: nameOfDriver,
        license,
        seat,
        carno,
        carname,
        charge,
        from,
        to,
        driver_username: user.username,
        date,
        passenger,
        occupied,
        code,
      });

      await ride.save();
      res.send("Ride created successfully");
    } else {
      res.send(`User with ${driver_username} does not exist`);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.rideInformation = async (req, res) => {
  const driverName = req.params.riderUsername;
  const ride = await RideDetails.findOne({ driver_username: driverName })
    .populate("passenger", "username")
    .exec();
  res.send(ride);
};

exports.passengerRideInformation = async (req, res) => {
  try {
    const passengerUserName = req.params.passengerUsername;

    // Use Mongoose query to find rides with the specified passenger username
    const rides = await RideDetails.find({})
      .populate("passenger", "username")
      .exec();
    const ridesForUsername = rides.filter((ride) =>
      ride.passenger.some(
        (passenger) => passenger.username === passengerUserName
      )
    );
    res.send(ridesForUsername);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.passengerRide = (req, ress) => {
  const query = {
    seat: { $gte: req.params.ispassengercount },
    from: req.params.isfrom,
    to: req.params.isto,
  };
  RideDetails.find(query)
    .then((res) => {
      const responseArray = Array.isArray(res) ? res : [res];
      ress.send(responseArray);
    })
    .catch((err) => {
      console.log("error", err.message);
    });
};

const passengerMap = new Map();
const requestFlag = new Map();



const setBooleanValue = (outerKey, innerKey,data, value) => {
  // If the outer map doesn't exist, create it
  if (!passengerMap.has(outerKey)) {
    passengerMap.set(outerKey, new Map());
  }

  // Get the inner map for the outer key
  const innerMap = passengerMap.get(outerKey);
  
 
  // Check if the inner map already has the innerKey

  if (!innerMap.has(innerKey)) {
    // Set the boolean value in the inner map
    innerMap.set(innerKey,{data,value});
    requestFlag.set(innerKey,{flg: value , driver: outerKey,carno : data.carno});
  } else {
    innerMap.set(innerKey, {data,value});
  } 


 // printPassengerMap(outerKey);
};

exports.passengerlist = (req,ress) => {
  outerKey = req.body.driverUsername;
  innerKey = req.body.passengerData;
  value = req.body.flag;

  const formattedInnerKey = typeof innerKey === 'object' ? JSON.stringify(innerKey) : innerKey;
  const innerKeyObject = JSON.parse(formattedInnerKey);

try{
  setBooleanValue(outerKey,innerKeyObject.username,innerKeyObject,value);
  ress.send("Added successfully");
}
catch (error) {
console.log(error.message);
ress.send(error);
  }

}

exports.passengerRequest = (req,ress) =>{
  const driverUsername = req.params.driverUsername;

  if (!driverUsername || !passengerMap.has(driverUsername)) {
    return "already";
  }

  const innerMap = passengerMap.get(driverUsername);
  const responseData = {
    innerMap: Array.from(innerMap.entries()).map(([innerKey, pair]) => ({
    data: pair.data,
    })),
  };

  ress.send(responseData);
}

exports.deleteRequest = (req,ress) =>{
  const InnerKey = req.body.passenger;
  const driver = req.body.driver;

const oldMap = requestFlag.get(InnerKey);
requestFlag.set(InnerKey,{flg: false , driver: driver,carno: oldMap.carno});


  for (const [outerKey, innerMap] of passengerMap.entries()) {
    // Check if the inner map exists and contains the fixed inner key
    if (innerMap.has(InnerKey)) {
      // Delete the entry with the fixed inner key
      innerMap.delete(InnerKey);
      console.log("delete");
      console.log(`Deleted entry with fixed inner key '${InnerKey}' for outerKey '${outerKey}'.`);
    }
  }

  ress.send("Deleted");
}

exports.singleRequest = (req,ress) =>{
  const outerkey = req.body.driverUsername;
  const innerkey = req.body.passengerUsername;
  const innerMap = passengerMap.get(outerkey);

  if (innerMap.has(innerkey)) {
    // Delete the entry with the fixed inner key
    innerMap.delete(innerkey);
    console.log("delete");
    console.log(`Deleted entry with fixed inner key '${innerkey}' for outerKey '${outerkey}'.`);
  }
  ress.send("Deleted");

}

const print =()=>{
  console.log("Printing Passenger Map:");
for (const [outerKey, innerMap] of passengerMap.entries()) {
  console.log(`Outer Key: ${outerKey}`);
  console.log("Inner Map:");
  for (const [innerKey, innerValue] of innerMap.entries()) {
    console.log(`  Inner Key: ${innerKey}, Inner Value: ${innerValue}`);
  }
}

}

exports.confirmBook = (req,ress) =>{

  const innerkey = req.params.userName;
  console.log("ik",innerkey);

  if (requestFlag.has(innerkey)) {
  const flag = requestFlag.get(innerkey);
  const stringValue = flag.flg.toString();
  console.log(stringValue);
  console.log(flag.driver);
  const flagdata = {
    flg : stringValue,
    driver : flag.driver,
    carno: flag.carno,
  }
  ress.send(flagdata);
  requestFlag.set(innerkey,{flg: true , driver: flag.driver, carno: flag.carno});
} else {
  console.log(`Inner key '${innerkey}' not found in the requestFlag Map.`);
  ress.status(404).send('Not Found');
}
}