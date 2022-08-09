const { default: axios } = require("axios");
const {
  BACKEND_BASE_URL,
  BACKEND_BASE_IMAGE_URL,
} = require("../Common/Config");
const { store, jwttokenSelector } = require("../redux/ReduxConfig");

function getProducts(updateProducts) {
  axios
    .get(BACKEND_BASE_URL + "products", {
      headers: {
        Authorization: jwttokenSelector(store.getState()),
      },
    })
    .then((res) => {
      //   console.log(res.data.products);
      updateProducts(res.data.products);
    })
    .catch((e) => {
      console.log(e);
    });
}

function addProduct(
  _id,
  name,
  category,
  price,
  discountPrice,
  description,
  image,
  isTopProduct,
  addProductStatus
) {
  const formData = new FormData();
  console.log(typeof image);
  if (typeof image === "string") {
    formData.append("image", image);
  } else {
    formData.append("productImage", image, image.name);
  }
  const isEdit = _id !== undefined && _id !== null && _id.length !== 0;

  let url = BACKEND_BASE_URL + "admin/products";
  let updateSuccessMessage = "Product added successfully!";
  let axiosPromise;

  formData.append("name", name);
  formData.append("category", category);
  formData.append("price", price);
  if (discountPrice !== null) formData.append("discountPrice", discountPrice);
  formData.append("description", description);
  formData.append("isTopProduct", isTopProduct);

  if (isEdit) {
    formData.append("_id", _id);
    url = BACKEND_BASE_URL + "admin/products/" + _id;
    updateSuccessMessage = "Product modified successfully!";
    axiosPromise = axios.patch(url, formData, {
      headers: {
        Authorization: jwttokenSelector(store.getState()),
      },
    });
  } else {
    axiosPromise = axios.post(url, formData, {
      headers: {
        Authorization: jwttokenSelector(store.getState()),
      },
    });
  }

  axiosPromise
    .then((res) => {
      console.log(res.data.status);
      addProductStatus.current.innerHTML = updateSuccessMessage;
    })
    .catch((e) => {
      console.log(e);
      addProductStatus.current.innerHTML = "Error";
    });
}

function deleteProduct(productId, updateProducts) {
  axios
    .delete(BACKEND_BASE_URL + "admin/products/" + productId, {
      headers: {
        Authorization: jwttokenSelector(store.getState()),
      },
    })
    .then((res) => {
      console.log(res.data.status);
      updateProducts((prev) => {
        return prev.filter((t) => t._id !== productId);
      });
    })
    .catch((e) => {
      console.log(e);
      alert("Error! Please try again");
    });
}

function getProductsPerCategories(categoryId, updateProducts, baseProductsRef) {
  axios
    .get(BACKEND_BASE_URL + "products?categoryId=" + categoryId)
    .then((res) => {
      //   console.log(res.data.products);
      let products = res.data.products;
      let productsSplit = splitProducts(products);
      updateProducts(productsSplit);
      baseProductsRef.current = productsSplit;
    })
    .catch((e) => {
      console.log(e);
    });
}
function splitProducts(products, chunkSize = 3) {
  let productsSplit = [];
  for (let i = 0; i < products.length; i += chunkSize) {
    productsSplit.push(products.slice(i, i + chunkSize));
  }
  return productsSplit;
}

function mergeProducts(products) {
  return [].concat.apply([], products);
}

function getProductDetails(
  productId,
  updateProduct,
  productImageRef,
  categoryIdRef
) {
  axios.get(BACKEND_BASE_URL + "products/" + productId).then((res) => {
    updateProduct(res.data.products[0]);
    productImageRef.current.src =
      BACKEND_BASE_IMAGE_URL + res.data.products[0].image;
    // if (categoryIdRef !== undefined && categoryIdRef.current !== undefined)
    categoryIdRef.current = res.data.products[0].category._id;
  });
}

function getRecProducts(categoryId, updateRecProducts, limit = 6) {
  // if (categoryIdRef.current !== undefined) {
  axios
    .get(
      BACKEND_BASE_URL + "products?categoryId=" + categoryId + "&limit=" + limit
    )
    .then((res) => {
      let products = res.data.products;
      let productsSplit = splitProducts(products);
      updateRecProducts(productsSplit);
    })
    .catch((e) => {
      console.log(e);
    });
  // }
}

exports.addProduct = addProduct;
exports.getProducts = getProducts;
exports.deleteProduct = deleteProduct;
exports.getProductsPerCategories = getProductsPerCategories;
exports.splitProducts = splitProducts;
exports.mergeProducts = mergeProducts;
exports.getProductDetails = getProductDetails;
exports.getRecProducts = getRecProducts;
