const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { PORT } = require("./config/config");
const app = express();
app.use(express.json());
app.use(cors());
const productRoutes = require("./routes/productRoutes");

connectDB();

app.use(productRoutes);

app.listen(PORT, async () => {
  console.log(`Sever is running on port ${PORT}`);
});
