import { backendurl } from "./config";
export const makeUnauthenticatedPOSTRequest = async (route, body) => {
  const response = await fetch(backendurl + route, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const formattedResponse = await response.json();
  return formattedResponse;
};
export const makeauthenticatedPOSTRequest = async (route, body) => {
  const token =getToken();
  const response = await fetch(backendurl + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }, //this token is already stored in cookies
    body: JSON.stringify(body),
  });
  const formattedResponse = await response.json();
  return formattedResponse;
};
export const makeAuthenticatedGETRequest = async (route) => {
  const token = getToken();
  const response = await fetch(backendurl + route, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const formattedResponse = await response.json();
  return formattedResponse;
};

const getToken = () => {
  const accessToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  return accessToken;
};
