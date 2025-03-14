const mongoose = require("mongoose");
const authenticationSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const Authentication = mongoose.model("Authentication", authenticationSchema);

module.exports = Authentication;
