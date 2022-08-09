const { BACKEND_BASE_URL } = require("../Common/Config");
const { store, jwttokenSelector } = require("../redux/ReduxConfig");
const { default: axios } = require("axios");

function getOrders(updateOrders) {
  axios
    .get(BACKEND_BASE_URL + "orders", {
      headers: {
        Authorization: jwttokenSelector(store.getState()),
      },
    })
    .then((res) => {
      //clear cart in store
      console.log(res.data.status);
      updateOrders(res.data.orders);
    })
    .catch((e) => {
      console.log(e);
      alert("Please login to see your orders");
    });
}

function updateOrder(orderId, updateOrders) {
  axios
    .patch(
      BACKEND_BASE_URL + "orders/" + orderId,
      {
        orders: {
          isDelivered: true,
        },
      },
      {
        headers: {
          Authorization: jwttokenSelector(store.getState()),
        },
      }
    )
    .then((res) => {
      //   ProcessButtonRef.current.className = "d-none";
      updateOrders((prev) => {
        let ordersClone = [...prev];
        let item = ordersClone.filter((t) => t._id === orderId);
        item[0].isDelivered = true;
        return ordersClone.sort((a, b) => {
          if (a.isDelivered && !b.isDelivered) return 1;
          else if (!a.isDelivered && b.isDelivered) return -1;
          return 0;
        });
      });
    })
    .catch((e) => {
      console.log(e);
      alert("Please login to update your orders");
    });
}

function deleteOrder(orderId, updateOrders) {
  axios
    .delete(BACKEND_BASE_URL + "orders/" + orderId, {
      headers: {
        Authorization: jwttokenSelector(store.getState()),
      },
    })
    .then((res) => {
      //   ProcessButtonRef.current.className = "d-none";
      updateOrders((prev) => {
        return prev.filter((t) => t._id !== orderId);
      });
    })
    .catch((e) => {
      console.log(e);
      alert("Please login to update your orders");
    });
}
exports.getOrders = getOrders;
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;
