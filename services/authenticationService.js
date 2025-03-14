const Authentication = require("../models/authenticationModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

const register = async (email, password) => {
  const authExists = await Authentication.findOne({ email: email });
  if (authExists) throw new Error("Email is already registered");

  const hashedPassword = await bcrypt.hash(password, 10);
  const userAuth = await Authentication.create({
    email,
    password: hashedPassword,
  });
  return userAuth;
};
const login = async (email, password) => {
  const authExists = await Authentication.findOne({ email: email });
  const match = await bcrypt.compare(password, authExists.password);
  if (!match) throw new Error("Invalid email or password");
  const token = jwt.sign({ email, role: "employee" }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return { authExists, token };
};
module.exports = { register, login };
