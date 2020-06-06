/*
 * Login
 */

export const handleLogin = async (email, password) => {
  const endpoint = "http://localhost:4000/user/login";
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
 * Data fetching
 */

export const getAllData = async () => {
  const endpoint = "http://localhost:4000/data/list";
  const res = await fetch(endpoint);
  return res.json();
};

export const getItemTotals = async () => {
  const endpoint = "http://localhost:4000/data/count";
  const res = await fetch(endpoint);
  return res.json();
};

/*
 * User state related API
 */

export const getUserInfo = async (loginToken) => {
  if (!loginToken) return;
  const endpoint = "http://localhost:4000/user";
  const options = { headers: { "auth-token": loginToken } };
  const res = await fetch(endpoint, options);
  return res.json();
};

export const addItemToList = (loginToken, item) => {
  return postItemToEndpoint(
    loginToken,
    "http://localhost:4000/list/addToList",
    item
  );
};

export const removeItemFromList = (loginToken, item) => {
  return postItemToEndpoint(
    loginToken,
    "http://localhost:4000/list/listDelete",
    item
  );
};

export const addItemToWishlist = (loginToken, item) => {
  return postItemToEndpoint(
    loginToken,
    "http://localhost:4000/list/addToWishList",
    item
  );
};

export const removeItemFromWishlist = (loginToken, item) => {
  return postItemToEndpoint(
    loginToken,
    "http://localhost:4000/list/wishDelete",
    item
  );
};

/*
 * Registration
 */

export const registerUser = async (name, email, password) => {
  const endpoint = "http://localhost:4000/user/register";
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
  const endpoint = "http://localhost:4000/user/confirm/" + userKey;
  const res = await fetch(endpoint, { method: "POST" });
  return res.json();
};

export const resendConfirmationEmail = async (email) => {
  const endpoint = "http://localhost:4000/user/resend/" + email;
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
