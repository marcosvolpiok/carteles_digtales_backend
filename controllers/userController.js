const UserModel = require('../models/UserModel');
const userService=require('../services/userService');
const userServiceOb=new userService();

const updateUser = async (userId, data) => {
  try {
    const user = await userServiceOb.update(req);
    res.json(user);
  } catch (error) {
      res.status(500).send({message : error.message})
  }
}

const list = async (req, res) => {
  try {
    const user = await userServiceOb.list();
    res.json(user);
  } catch (error) {
      res.status(500).send({message : error.message})
  }
}

const signup = async (req, res) => {
  try {
    const user = await userServiceOb.signup(req, res);
    res.status(user.status).send(user.data);
  } catch (error) {
      res.status(500).send({message : error.message})
  }
}

const login = async (req, res) => {
  try {
    const user = await userServiceOb.login(req, res);
    res.status(user.status).send(user.data);
  } catch (error) {
      res.status(500).send({message : error.message})
  }
}

module.exports = {
  updateUser, list, signup, login
}