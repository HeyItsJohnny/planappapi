const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const productRoutes = require("./api/routes/products");
const activityRoutes = require("./api/routes/getActivities");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Headers - Prevent CORS Errors
app.use((req, res, next) => {
  //res.header('Access-Control-Allow-Origin', 'https://planapp.onrender.com');     //Give access to only PLAN APP
  res.header("Access-Control-Allow-Origin", "*"); //Give access to any origin
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); //Give access to any origin
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET"); //Allow these requests
    return res.status(200).json({});
  }
  next();
});

//Middleware -
app.use("/products", productRoutes);
app.use("/getActivities", activityRoutes);

//Handling Errors for all other requests
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  //Handling Error and Sending it back (Send Errors back from ChatGPT/Firebase)
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
