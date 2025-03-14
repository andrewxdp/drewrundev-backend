const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authenticationRoutes = require("./routes/authentication");
const { PORT } = require("./config/config");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:8000"],
  })
);

connectDB();

app.use(productRoutes);
app.use(authenticationRoutes);

app.listen(PORT, async () => {
  console.log(`Sever is running on port ${PORT}`);
});
