const config = require("../../config/auth.config");
const User = require("../../models/User");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

module.exports = (req, res) => {

  console.log("BE: sign in")

  User.findOne({
    username: req.body.username,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    // Verify password
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    // If everything is valid, create a JWT
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    // Return a 200 status with user information and the access token
    res.status(200).send({
      id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken: token,
    });
  });
};
