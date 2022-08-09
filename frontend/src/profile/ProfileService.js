const { default: axios } = require("axios");
const {
  BACKEND_BASE_URL,
  BACKEND_BASE_IMAGE_URL,
  DEFAULT_PROFILE_PHOTO,
} = require("../Common/Config");
const { store, jwttokenSelector } = require("../redux/ReduxConfig");

function updateAddressInfo(
  streetAddress,
  city,
  state,
  zipcode,
  addressInfo,
  updateDisplayEditAddress
) {
  axios
    .patch(
      BACKEND_BASE_URL + "profile/address",
      { profile: { address: { streetAddress, city, state, zipcode } } },
      {
        headers: {
          Authorization: jwttokenSelector(store.getState()),
        },
      }
    )
    .then((res) => {
      console.log(res.data.status);
      addressInfo.streetAddress = streetAddress;
      addressInfo.city = city;
      addressInfo.state = state;
      addressInfo.zipcode = zipcode;
      updateDisplayEditAddress(false);
    })
    .catch((e) => {
      console.log(e);
    });
}

function getUserInfo(updateUserInfo, navigate) {
  axios
    .get(BACKEND_BASE_URL + "users", {
      headers: {
        Authorization: jwttokenSelector(store.getState()),
      },
    })
    .then((res) => {
      updateUserInfo(res.data.user);
    })
    .catch((e) => {
      console.log("Redirecting to login");
      navigate("/login", { replace: true }, [navigate]);
    });
}

function deleteProfileImage(updateUserInfo, profilePhotoRef) {
  axios
    .delete(BACKEND_BASE_URL + "profile/image", {
      headers: {
        Authorization: jwttokenSelector(store.getState()),
      },
    })
    .then((res) => {
      profilePhotoRef.current.src =
        BACKEND_BASE_IMAGE_URL + DEFAULT_PROFILE_PHOTO;
      updateUserInfo((prev) => {
        prev.profileImage = "";
        return prev;
      });
    });
}

function uploadProfileImage(fileInfo, profilePhotoRef) {
  const formData = new FormData();
  formData.append("profileImage", fileInfo, fileInfo.name);
  axios
    .patch(BACKEND_BASE_URL + "profile/image", formData, {
      headers: {
        Authorization: jwttokenSelector(store.getState()),
      },
    })
    .then((res) => {
      console.log(res);
      profilePhotoRef.current.src = BACKEND_BASE_IMAGE_URL + fileInfo.name;
    })
    .catch((e) => console.log(e));
}

exports.updateAddressInfo = updateAddressInfo;
exports.getUserInfo = getUserInfo;
exports.deleteProfileImage = deleteProfileImage;
exports.uploadProfileImage = uploadProfileImage;
