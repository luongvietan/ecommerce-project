import axios from "axios";

export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export const axiosWithAuth = () => {
  const token = getAuthToken();
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
