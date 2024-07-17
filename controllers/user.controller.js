const userModel = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

// signup
const createUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    bcrypt.hash(password, 10, async (err, hash) => {    //Create bcrypt hash
      let user = await userModel.create(req.body);
      return res.status(201).send(user);
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

// get all user
const getUser = async (req, res) => {
  try {
    let user = await userModel.find();
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
}

// update user
const updateUser = async (req, res) => {
  try {
    let { id } = req.params;
    let user = await userModel.findByIdAndUpdate(id, req.body);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
}

// delete user
const deleteUser = async (req, res) => {
  try {
    let { id } = req.params;
    let user = await userModel.findByIdAndDelete(id);
    return res.status(202).send(user);
  } catch (error) {
    return res.status(500).send(error);
  }
}

// login
const login = async (req, res) => {
  let { username, password } = req.body;
  try {
    let user = await userModel.findOne({ username });
    if (!user) {
      return res.status(401).send("Username Doesn't Exists");
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (isMatch) {
      let payLoad = {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
      }
      const token = jwt.sign(payLoad, "krishna");
      console.log(token);
      return res.cookie("token", token).send(token);

    } else {
      return res.status(400).send("Password Invalid");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}

// get user data
const getData = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId).select("-password");
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
module.exports = { createUser, getUser, updateUser, deleteUser, login, getData }