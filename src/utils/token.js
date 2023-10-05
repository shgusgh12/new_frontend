import { getCookie } from "./cookie";
import { postApi } from "./http";

// 쿠키에서 accessToken을 가져오는 함수
export function getAccessTokenFromCookie() {
  const accessToken = getCookie("member_access_token");
  if (accessToken) return accessToken;
  return null;
}

// accessToken 재발급 함수
export async function refreshAccessToken() {
  // refresh token을 이용한 accessToken 재발급
  try {
    console.log("refreshAccessToken 실행");
    const { data } = await postApi({ url: "/auth/reissue-token" });
  } catch (e) {
    //refresh token이 없거나 만료된 경우 에러처리
    // 444에러라면 refresh token이 없는 것이라고 메세지를 띄워주기
    if (e.response.status === 444) {
      alert(
        "refreshToken이 없습니다. 로그인이 필요합니다. 로그인 돼있을 때 refreshToken refresh해주는 작업 예정"
      );
      // 로그인 페이지로 이동
      window.location.href = "/auth/login"; // 로그인 페이지의 URL로 변경
    }
  }
}

export async function sendRequestWithAccessToken({
  apiFunction,
  url,
  requestBody,
  headers,
  params,
}) {
  let AUTH_TOKEN = getAccessTokenFromCookie(); // 쿠키에서 AUTH_TOKEN 가져오기
  if (!AUTH_TOKEN) {
    console.log("No access token found.");
    // AUTH_TOKEN이 없으면 refreshToken을 사용하여 새로운 AUTH_TOKEN 발급받기
    try {
      console.log("Refreshing access token...");
      await refreshAccessToken();
      AUTH_TOKEN = getAccessTokenFromCookie(); // 새로 발급받은 AUTH_TOKEN 가져오기
    } catch (error) {
      // refreshToken 재발급에 실패한 경우 에러 처리
      console.log("Failed to refresh access token:");
      console.error(error);
      // 예외 처리 또는 다른 로직 추가 해야함
    }
  }

  // AUTH_TOKEN이 있는 경우 또는 새로 발급받은 경우에만 요청 보내기
  if (AUTH_TOKEN) {
    // 헤더에 AUTH_TOKEN 추가
    const token_headers = {
      ...headers,
      Authorization: `Bearer ${AUTH_TOKEN}`,
    };

    console.log("headers:", token_headers);

    // apiFunction 실행 (getApi 또는 postApi 등을 실행)
    try {
      const response = await apiFunction({
        url: url,
        headers: token_headers,
        params: params,
        requestBody: requestBody,
      });
      return response;
    } catch (error) {
      // 요청 실패에 대한 에러 처리
      console.error("Request failed:", error);
      // 예외 처리 또는 다른 로직을 추가 해야함
    }
  }
}

// access가 만료되기 전에 refreshToken을 이용하여 accessToken을 새로 발급받는 함수
