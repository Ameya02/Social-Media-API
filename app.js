const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const morgan = require("morgan");
dotenv.config();

const app = express();
const Port = process.env.PORT || 3001;
const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorMiddlewares");
connectDB();


app.use(express.json());
app.use(morgan("dev"))
app.use("/api", routes)
// app.use(errorHandler)
app.listen(Port, console.log("listening on port", Port));


app.get("/", (req, res) => {
  res.send("API are running");
});



