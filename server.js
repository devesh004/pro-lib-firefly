const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");
const errorhandler = require("./middlewares/error");
const cors = require("cors");
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Mongoose Connected!"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/project", projectRoutes);

app.use(errorhandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
