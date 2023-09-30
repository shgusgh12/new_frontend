import axios from "axios";

/*
예시 : 
getApi("challenges");
const headers = {
  ACCESS : "eyJ0eXBlIjoiand0IiwiYWxnIjoiSFMyNTYifQ.eyJzd"
}
getApi("challenges", headers);
*/

const BACKEND_URL = "http://api.stocodi.com:8080/api/v1";

export async function getApi(url, headers, params) {
  const response = await axios.get(BACKEND_URL + url, {
    headers: headers,
    params: params,
    withCredentials: true,
  });

  return response;
}

export async function postApi(url, requestBody, headers, params) {
  const response = await axios.post(BACKEND_URL + url, requestBody, {
    headers: headers,
    params: params,
    withCredentials: true,
  });
  return response;
}

export async function putApi(url, requestBody, headers, params) {
  const response = await axios.put(BACKEND_URL + url, requestBody, {
    headers: headers,
    params: params,
    withCredentials: true,
  });

  return response;
}

export async function patchApi(url, requestBody, headers, params) {
  const response = await axios.patch(BACKEND_URL + url, requestBody, {
    headers: headers,
    params: params,
    withCredentials: true,
  });

  return response;
}

export async function deleteApi(url, headers) {
  const response = await axios.delete(BACKEND_URL + url, {
    headers: headers,
    withCredentials: true,
  });

  return response;
}
