const Admin = require("../models/admin");


exports.confirmRide = async (req,ress) =>{



    const confirmData = {
        Driver : req.body.driverUsername,
Passenger: req.body.passengerUsername,
From: req.body.from,
To: req.body.to,
Date: req.body.date,
TotalPassenger: req.body.passenger,
DistanceTravelled: req.body.distance,
Amount: req.body.amount,
    }

 

    await Admin.Admin.create(confirmData)
    .then((res)=>{
        console.log(res);
        ress.send(res);
    })
    .catch((err)=>{
        ress.send(err);
    });
}

exports.submitFeedback = async (req, res) => {
    console.log(req.body.Rating);
    try {
      // Check if feedback data is provided in the request body
      if (req.body.Rating !== undefined || req.body.Feedback !== undefined) {
        // Assuming you have a feedback object from your request body
        const feedbackData = {
          Driver: req.body.DriverUsername,
          Rating: req.body.Rating,
          Feedback: req.body.Feedback,
        };
  
        // Saving feedback to the Feedback model
        console.log(feedbackData);
        const feedback = await Admin.Feedback.create(feedbackData);
        console.log(feedback);
  
        res.send({
          feedback,
        });
      } else {
        res.send({
          message: "Feedback skipped. No feedback data provided.",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  };

  exports.driverrideInformation = async (req, res) => {
   try{
   
    const driver = req.params.driver;
    
    const result = await Admin.Admin.find({Driver: driver});
    res.send(result);

   }
   catch(error)
   {
   console.log(error); 
    res.send(error);
   }
  };
  
  exports.passengerRideInformation = async (req, res) => {
    try{
   
        const passenger = req.params.passenger;
        
        const result = await Admin.Admin.find({Driver: passenger});
        res.send(result);
    
       }
       catch(error)
       {
       console.log(error); 
        res.send(error);
       }
  };
  