const { default: axios } = require("axios");
const { BACKEND_BASE_URL } = require("../Common/Config");
const { LOGIN ,store} = require("../redux/ReduxConfig");

function LoginHandler(email, password, updatLoginStatusMessage) {
  axios
    .post(BACKEND_BASE_URL + "users/login", { email, password })
    .then((res) => {
      console.log(res.data.status);
      updatLoginStatusMessage(res.data.status);
      store.dispatch({
        type: LOGIN,
        payload: res.data.accessToken,
      });
    })
    .catch((e) => {
      updatLoginStatusMessage(e.response.data.message);
    });
}

exports.LoginHandler = LoginHandler;
