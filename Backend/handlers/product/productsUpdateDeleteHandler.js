const {
  checkForValidationErrors,
} = require("../../Common/CheckForValidationErrors");
const { getErrorJson, getSuccessJson } = require("../../Common/Constants");
const Product = require("../../models/products-model");
const Category = require("../../models/category-model");

function productUpdateHandler() {
  return async (req, res) => {
    if (checkForValidationErrors(req, res)) {
      return res;
    }

    console.log("Updating product : " + req.params.productId);
    // console.log(req.body);
    try {
      let category = await Category.findOne({ name: req.body.category });
      if (category == null) {
        category = new Category({ name: req.params.category });
        category = await category.save();
      }
      let productInfo = req.body;
      productInfo.category = category;

      if (req.files !== null) {
        let productImageData = req.files.productImage;
        productImageData
          .mv("./public/images/" + productImageData.name)
          .then((res) => {
            let promiseDone = true;
          });
        productInfo.image = productImageData.name;
      } else {
        delete productInfo['image'];
      }
      let productToUpdate = await Product.findByIdAndUpdate(
        {
          _id: req.params.productId,
        },
        productInfo
      );
      console.log(productToUpdate);

      if (productToUpdate == null) {
        return res.status(400).json(getSuccessJson("product id not found"));
      }

      //   productToUpdate = { ...productToUpdate, ...req.body.product };
      //   console.log(productToUpdate);

      return res
        .status(200)
        .json(getSuccessJson("product edited successfully"));
    } catch (e) {
      console.log(e);
      res.status(500).json(getErrorJson("Error while updating product"));
    }
  };
}

function productDeleteHandler() {
  return async (req, res) => {
    if (checkForValidationErrors(req, res)) {
      return res;
    }
    console.log("Deleting product : " + req.params.productId);

    try {
      let deleteStatus = await Product.deleteOne({
        _id: req.params.productId,
      });
      console.log(deleteStatus);
      if (deleteStatus.deletedCount > 0) {
        res.status(200).json(getSuccessJson("product deleted successfully"));
      } else {
        res.status(400).json(getSuccessJson("product not found"));
      }
    } catch (e) {
      console.log(e);
      res.status(500).json(getErrorJson("Error while deleting product"));
    }
  };
}
exports.productUpdateHandler = productUpdateHandler;
exports.productDeleteHandler = productDeleteHandler;
