const BACKEND_URL = "https://acnh-tracker-backend.herokuapp.com";

/*
 * Login
 */

export const handleLogin = async (email, password) => {
  const endpoint = BACKEND_URL + "/user/login";
  const body = {
    email,
    password,
  };
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  const res = await fetch(endpoint, options);
  return res.json();
};

/*
 * Forgot password
 */

export const forgotPassword = async (email) => {
  console.log(email);
  const endpoint = BACKEND_URL + "/user/forgotpassword/" + email;
  const res = await fetch(endpoint, { method: "POST" });
  return res.json();
};

export const changePassword = async (token, newPassword) => {
  const endpoint = BACKEND_URL + "/user/changepassword/" + token;
  const body = { newPassword };
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  const res = await fetch(endpoint, options);
  return res.json();
};

/*
 * Data fetching
 */

export const getAllData = async () => {
  const endpoint = BACKEND_URL + "/data/list";
  const res = await fetch(endpoint);
  return res.json();
};

export const getItemTotals = async () => {
  const endpoint = BACKEND_URL + "/data/count";
  const res = await fetch(endpoint);
  return res.json();
};

export const searchUser = async (userName) => {
  const endpoint = BACKEND_URL + "/list/" + userName;
  const res = await fetch(endpoint);
  return res.json();
};

/*
 * User state related API
 */

export const getUserInfo = async (loginToken) => {
  if (!loginToken) return;
  const endpoint = BACKEND_URL + "/user";
  const options = { headers: { "auth-token": loginToken } };
  const res = await fetch(endpoint, options);
  return res.json();
};

export const addItemToList = (loginToken, item) => {
  return postItemToEndpoint(loginToken, BACKEND_URL + "/list/addToList", item);
};

export const removeItemFromList = (loginToken, item) => {
  return postItemToEndpoint(loginToken, BACKEND_URL + "/list/listDelete", item);
};

export const addItemToWishlist = (loginToken, item) => {
  return postItemToEndpoint(
    loginToken,
    BACKEND_URL + "/list/addToWishList",
    item
  );
};

export const removeItemFromWishlist = (loginToken, item) => {
  return postItemToEndpoint(loginToken, BACKEND_URL + "/list/wishDelete", item);
};

/*
 * Registration
 */

export const registerUser = async (name, email, password) => {
  const endpoint = BACKEND_URL + "/user/register";
  const body = {
    name,
    email,
    password,
  };
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };

  const res = await fetch(endpoint, options);
  return res.json();
};

export const confirmEmail = async (userKey) => {
  const endpoint = BACKEND_URL + "/user/confirm/" + userKey;
  const res = await fetch(endpoint, { method: "POST" });
  return res.json();
};

export const resendConfirmationEmail = async (email) => {
  const endpoint = BACKEND_URL + "/user/resend/" + email;
  const res = await fetch(endpoint, { method: "POST" });
  return res.json();
};

/*
 * Helper functions
 */

const postItemToEndpoint = async (loginToken, endpoint, item) => {
  if (!loginToken) throw new Error("Must be logged in to perform that action.");

  const body = {
    item_name: item.itemName,
    category: item.itemCategory,
    variation: item.itemVariation === "NA" ? null : item.itemVariation,
    variationList: item.variationList,
  };
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json", "auth-token": loginToken },
    body: JSON.stringify(body),
  };

  const res = await fetch(endpoint, options);
  return res.json();
};
