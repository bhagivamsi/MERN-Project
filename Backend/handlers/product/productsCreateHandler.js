const { isAdmin } = require("../../Common/CheckAdmin");
const {
  checkForValidationErrors,
} = require("../../Common/CheckForValidationErrors");
const { getSuccessJson, getErrorJson } = require("../../Common/Constants");

const Product = require("../../models/products-model");
const Category = require("../../models/category-model");

function productsCreateHandler() {
  return async (req, res) => {
    if (!isAdmin(req, res)){//} || checkForValidationErrors(req, res)) {
      return res;
    }

    let products = req.body;
    try {
      let promiseDone = false;
      let productImageData = req.files.productImage;
      productImageData
        .mv("./public/images/" + productImageData.name)
        .then((res) => {
          promiseDone = true;
        });

      while (!promiseDone) {
        break;
      }

      let category = await Category.findOne({ name: products.category });
      if (category == null) {
        category = new Category({ name: products.category });
        category = await category.save();
      }
      products.image = productImageData.name;
      products.category = category;

      await Product.insertMany(products);
      return res
        .status(200)
        .json(getSuccessJson("Products Created successfully"));
    } catch (e) {
      console.log(e);
      return res.status(500).json(getErrorJson(e));
    }
  };
}

exports.productsCreateHandler = productsCreateHandler;
