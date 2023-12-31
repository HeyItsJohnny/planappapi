const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests to /products",
  });
});

//Create a new Product
router.post("/", (req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price
  }
  res.status(200).json({
    message: "Handling POST requests to /products",
    createdProduct: product
  });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  if (id === "special") {
    res.status(200).json({
      message: "You discovered the special ID",
      id: id,
    });
  } else {
    res.status(200).json({
      message: "You passed an ID",
      id: id,
    });
  }
});

router.patch("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "You patched an ID",
  });
});

router.put("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "You putted an ID",
  });
});

router.delete("/:productId", (req, res, next) => {
  res.status(200).json({
    message: "You deleted an ID",
  });
});

module.exports = router;
