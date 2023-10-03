import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, options) => {
  cookies.set(name, value, { ...options });
};

export const getCookie = (name) => {
  return cookies.get(name);
};

// 모든 path 에서 쿠키 삭제
export const removeCookie = async (name) => {
  cookies.remove(name, { path: "/", domain: ".stocodi.com" });
};
