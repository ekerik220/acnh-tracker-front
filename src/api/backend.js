export const getUserInfo = async (loginToken) => {
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

const postItemToEndpoint = async (loginToken, endpoint, item) => {
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
