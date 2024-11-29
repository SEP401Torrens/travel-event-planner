import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  return localStorage.getItem("authToken");
};

export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};
