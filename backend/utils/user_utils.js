const User = require("../models/User");

// get account details
const retrieveUserByUsername = async (username) => {
  try {
    const doc = await User.findOne({ username: username }).exec();
    return doc;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const retrieveUserById = async (id) => {
  try {
    const doc = await User.findById(id).exec();
    return doc;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  retrieveUserByUsername,
  retrieveUserById,
};
