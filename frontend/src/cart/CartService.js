const {
  store,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  DECREASE_PRODUCT_FROM_CART,
  INCREASE_PRODUCT_FROM_CART,
} = require("../redux/ReduxConfig");

function addToCart(e, product) {
  e.preventDefault();
  e.stopPropagation();
  store.dispatch({
    type: ADD_TO_CART,
    payload: product,
  });
}

function removeFromCart(e, productId) {
  e.preventDefault();
  e.stopPropagation();
  store.dispatch({
    type: REMOVE_FROM_CART,
    payload: productId,
  });
}

function decrQuantity(productId) {
  store.dispatch({
    type: DECREASE_PRODUCT_FROM_CART,
    payload: productId,
  });
}

function addQuantity(productId) {
  store.dispatch({
    type: INCREASE_PRODUCT_FROM_CART,
    payload: productId,
  });
}

function calculateGrandTotal(cart) {
  return cart
    .map(
      (item) =>
        item.quantity *
        (item.discountPrice === undefined ||
        item.discountPrice === null ||
        item.discountPrice === 0
          ? item.price
          : item.discountPrice)
    )
    .reduce((a, b) => a + b, 0);
}

exports.addToCart = addToCart;
exports.removeFromCart = removeFromCart;
exports.addQuantityEvent = addQuantity;
exports.decrQuantityEvent = decrQuantity;
exports.calculateGrandTotal = calculateGrandTotal;
