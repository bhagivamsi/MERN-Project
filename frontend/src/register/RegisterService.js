const { default: axios } = require("axios");

const { BACKEND_BASE_URL } = require("../Common/Config");

function RegisterService(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  updateRegisterStatusMessage
) {
  if (password !== confirmPassword) {
    updateRegisterStatusMessage(
      "Password and Confirm Password are not mathcing"
    );
    return;
  }
  axios
    .post(BACKEND_BASE_URL + "users/register", {
      firstName,
      lastName,
      password,
      email,
    })
    .then((res) => {
      updateRegisterStatusMessage(res.data.status + ". Redirecting to login page in 5seconds");
    })
    .catch((e) => {
      updateRegisterStatusMessage(e.response.data.message);
    });
}

exports.RegisterService = RegisterService;
