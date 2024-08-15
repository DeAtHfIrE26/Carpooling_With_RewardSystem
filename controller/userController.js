const user = require("../models/user");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv').config({path : '../.env'});

exports.userDetail = async (req, ress) => {
  console.log("ll");
  const user = req.body.username;
  const password = req.body.password;
  const userData = await User.findOne({ username: user }).lean();
try{
  if (!userData) {
    console.log(error);
    return ress.status(404).json({ error: 'User not found' });
  }

  // Compare the provided password with the hashed password from the database
  const passwordMatch = await bcrypt.compare(password, userData.password);
console.log(passwordMatch);
  if (passwordMatch) {
    console.log(userData);
    ress.send(userData);
  } else {
    ress.status(401).json({ error: 'Invalid password' });
  }
}
  catch (err) {
    console.log(err);
    ress.send(err);
  }
};



exports.register = async (req, res) => {

  const accountData = {
    username: req.body.username,
    first: req.body.first,
    last: req.body.last,
    dob : req.body.dob,
    gender: req.body.gender,
    phone: req.body.phone,
    email: req.body.email,
  } 
  const hashRounds = parseInt(process.env.hashkey) || 10;
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(req.body.password, hashRounds, (err, hash) => {
      if (err) {``
        console.error('Error hashing password:', err);
        reject(err);
      } else {
        console.log("Hashed Password:", hash);
        resolve(hash);
      }
    });
  });

  await User.create({...accountData,password: hashedPassword})
    .then((ress) => {
      console.log(ress);
      res.send(ress);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

exports.token = async (req, res) => {

  console.log(req.body.amount);
  await User.updateOne({ username: req.body.username }, { $inc: { wallet: req.body.amount } })
    .then((response) => {

      res.send(response);
    })
    .catch((error) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
}
