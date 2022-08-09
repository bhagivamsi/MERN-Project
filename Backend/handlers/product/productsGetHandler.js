const Product = require("../../models/products-model");
const Category = require("../../models/category-model");
const { getErrorJson, getSuccessJson } = require("../../Common/Constants");

function productsLatestHandler() {
  return async (req, res) => {
    try {
      const products = await Product.find(
        { image: { $exists: true, $ne: "" } },
        { name: 1, image: 1, _id: 1 }
      )
        .sort({
          createdOn: -1,
        })
        .limit(3);
      return res.status(200).json({ status: "SUCCESS", products });
    } catch (e) {
      console.log(e);
      return res.status(500).json(getErrorJson("Unexpected error ocurred"));
    }
  };
}

function productsGetHandler() {
  return async (req, res) => {
    try {
      console.log(req.params.productId);
      let selection = {};
      if (req.params.productId) {
        selection = { _id: req.params.productId };
      } else if (req.query.categoryId) {
        var ObjectId = require("mongoose").Types.ObjectId;
        selection = {
          category: new ObjectId(req.query.categoryId),
        };
      }

      console.log(selection);
      let products = await Product.find(selection).populate("category");
      console.log(req.query.limit);
      if (req.query.limit) {
        products = products.slice(req.query.limit * -1);
      }
      return res.status(200).json({ status: "SUCCESS", products });
    } catch (e) {
      console.log(e);
      return res.status(500).json(getErrorJson("Unexpected error ocurred"));
    }
  };
}

function productsRandomHandler() {
  return async (req, res) => {
    try {
      let products = await Product.aggregate([
        { $sample: { size: 8 } },
        // { $project: { _id: 1, name: 1 } },
      ]);
      // .sort({})
      // .limit(8);
      products = await Product.populate(products, "category");
      return res.status(200).json({ status: "SUCCESS", products });
    } catch (e) {
      console.log(e);
      return res.status(500).json(getErrorJson("Unexpected error ocurred"));
    }
  };
}

exports.productsLatestHandler = productsLatestHandler;
exports.productsRandomHandler = productsRandomHandler;
exports.productsGetHandler = productsGetHandler;
