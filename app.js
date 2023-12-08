const express = require("express");
const app = express();
const morgan = require("morgan");

const productRoutes = require("./api/routes/products");
const activityRoutes = require("./api/routes/getActivities");

app.use(morgan("dev"));

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
