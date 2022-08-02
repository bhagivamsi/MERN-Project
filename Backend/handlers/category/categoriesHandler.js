//Models
const Category = require("../../models/category-model");

const { getErrorJson, getSuccessJson } = require("../../Common/Constants");

function categoriesListRandomHandler() {
  return async (req, res) => {
    const userId = req.user;
    try {
      let categories = await Category.aggregate([
        { $sample: { size: 3 } },
        { $project: { _id: 1, name: 1 } },
      ]);

      return res.status(200).json({
        status: "SUCCESS",
        categories,
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json(getErrorJson("FAILED TO DELETE IMAGE"));
    }
  };
}
exports.categoriesListRandomHandler = categoriesListRandomHandler;
