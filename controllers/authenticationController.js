const authService = require("../services/authenticationService");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRegister = await authService.register(email, password);
    res.status(201).json({
      message: "User registered successfully",
      userRegister: userRegister,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "insert fail",
      error,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { userLogin, token } = await authService.login(email, password);
    res.cookie("token", token, {
      maxAge: 300000,
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
    res.json({ message: "Login successful", userLogin: userLogin });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Login fail",
      error,
    });
  }
};
module.exports = { register, login };
