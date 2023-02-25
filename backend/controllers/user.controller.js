exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.creatorBoard = (req, res) => {
  res.status(200).send("Creator Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.advertiserBoard = (req, res) => {
  res.status(200).send("Advertiser Content.");
};