const { ObjectID } = require("bson");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const User = require("../models/User");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isCreator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    console.log(user.role);

    if (user.role == "creator"){
      next();
      return;
    }

      res.status(403).send({ message: "Require Creator Role!" });
      return;
  });
};

isAdvertiser = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    console.log(user.role);

    if (user.role == "advertiser"){
      next();
      return;
    }

      res.status(403).send({ message: "Require Advertiser Role!" });
      return;
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    console.log(user.role);

    if (user.role == "admin"){
      next();
      return;
    }

      res.status(403).send({ message: "Require Admin Role!" });
      return;
  });
};


const authJwt = {
  verifyToken,
  isCreator,
  isAdvertiser,
  isAdmin
};
module.exports = authJwt;
