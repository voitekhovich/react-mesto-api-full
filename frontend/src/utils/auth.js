import { BASE_URL } from "./constants";

const request = ({ url, method = "POST", token, data }) => {
  return fetch(`${BASE_URL}${url}`, {
    method,
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      ...(!!token && { Authorization: `Bearer ${token}` }),
    },
    ...(!!data && { body: JSON.stringify(data) }),
  }).then((res) => {
    if (res.ok) return res.json();
    return Promise.reject(res.status);
  });
};

export const register = (email, password) => {
  return request({
    url: "/signup",
    data: { email, password },
  });
};

export const authorize = (email, password) => {
  return request({
    url: "/signin",
    data: { email, password },
  });
};

export const signout = () => {
  return request({
    url: "/signout",
    method: "GET",
  });
};

export const getContent = (token) => {
  return request({
    url: "/users/me",
    method: "GET",
    // token,
  });
};
