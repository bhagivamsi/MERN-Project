const { default: axios } = require("axios");
const { BACKEND_BASE_URL } = require("../Common/Config");
const {
  store,
  cartForCheckoutSelector,
  jwttokenSelector,
  CLEAR_CART,
} = require("../redux/ReduxConfig");

function PlaceOrder(user, address, productId) {
  let cart;
  if (productId === undefined || productId === null) {
    cart = cartForCheckoutSelector(store.getState());
  } else {
    cart = [{ productId: productId, quantity: 1 }];
  }
  const jwt = jwttokenSelector(store.getState());
  user = jwt === undefined || jwt === null ? user : null;
  console.log(jwt === undefined || jwt === null);

  axios
    .post(
      BACKEND_BASE_URL + "checkout",
      {
        user,
        address,
        cart,
      },
      {
        headers: {
          Authorization: jwttokenSelector(store.getState()),
        },
      }
    )
    .then((res) => {
      //clear cart in store
      console.log(res.data.status);
      store.dispatch({
        type: CLEAR_CART,
      });
      alert(res.data.message);
    })
    .catch((e) => {
      console.log(e);
    });
}
exports.PlaceOrder = PlaceOrder;