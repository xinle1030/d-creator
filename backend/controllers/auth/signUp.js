const User = require("../../models/User");
var bcrypt = require("bcryptjs");

module.exports = (req, res) => {

  console.log("BE: sign up")

  // create new User
  const user = new User({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    walletAdrHash: req.body.walletAdrHash,
    role: req.body.role,
  });

  // save to db
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send(user);
  });
};
