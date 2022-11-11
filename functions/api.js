/**
 * The Server Can be configured and created here...
 *
 * You can find the JSON Data file here in the Data module. Feel free to impliment a framework if needed.
 */

/*
-- This is the product data, you can view it in the file itself for more details
{
    "_id": "019",
    "isActive": "false",
    "price": "23.00",
    "picture": "/img/products/N16501_430.png",
    "name": "Damage Reverse Thickening Conditioner",
    "about": "Dolor voluptate velit consequat duis. Aute ad officia fugiat esse anim exercitation voluptate excepteur pariatur sit culpa duis qui esse. Labore amet ad eu veniam nostrud minim labore aliquip est sint voluptate nostrud reprehenderit. Ipsum nostrud culpa consequat reprehenderit.",
    "tags": [
        "ojon",
        "conditioner"
    ]
}
*/
const express = require("express");
const serverless = require("serverless-http");

const data = require("./data");
const app = express();
const router = express.Router();

router.get("/search", (req, res) => {
  let terms = req.url.split("query=")[1].toLowerCase();
  const products = data.filter(
    (product) =>
      product.name.toLowerCase().includes(terms) ||
      product.tags.some((tag) => tag === terms)
  );
  res.json(products);
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
