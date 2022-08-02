const Product = require("../../models/products-model");
const { getErrorJson, getSuccessJson } = require("../../Common/Constants");

function productsLatestHandler() {
  return async (req, res) => {
    try {
      const products = await Product.find({}, { name: 1, image: 1, _id: 0 })
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
      }
      const products = await Product.find(selection);
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
      const products = await Product.aggregate([
        { $sample: { size: 8 } },
        // { $project: { _id: 1, name: 1 } },
      ])
        // .sort({})
        .limit(8);
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
