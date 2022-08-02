const { isAdmin } = require("../../Common/CheckAdmin");
const {
  checkForValidationErrors,
} = require("../../Common/CheckForValidationErrors");
const { getSuccessJson, getErrorJson } = require("../../Common/Constants");

const Product = require("../../models/products-model");
const Category = require("../../models/category-model");

function productsCreateHandler() {
  return async (req, res) => {
    if (!isAdmin(req, res) || checkForValidationErrors(req, res)) {
      return res;
    }

    let products = req.body.products;
    // console.log(products);
    try {
      //find and create missing categories
      //update products with new categories
      //save products

      for (var i = 0; i < products.length; i++) {
        let category = await Category.findOne({ name: products[i].category });
        if (category == null) {
          category = new Category({ name: products[i].category });
          category = await category.save();
        }
        products[i].category = category;
      }

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
