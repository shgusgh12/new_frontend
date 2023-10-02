/*
구현 목표

로그인을 하면, 쿠키에 access Token을 저장, refresh Token은 어디에 저장? 
쿠키에 저장된 access Token이 만료되었는지 확인하는 함수를 만들어서 만료가 안됐다면, 로그인 유지
access Token이 만료되면, refresh Token을 사용하여 access Token을 재발급 받는다.

*/

// 클라이언트 측 JavaScript 코드

// 쿠키에서 accessToken을 가져오는 함수

// function getAccessTokenFromCookie() {
//   const cookies = document.cookie.split('; ');
//   for (const cookie of cookies) {
//     const [name, value] = cookie.split('=');
//     if (name === 'accessToken') {
//       return value;
//     }
//   }
//   return null;
// }

// // accessToken이 만료되었을 때 새로운 accessToken을 가져오는 함수
// async function refreshAccessToken() {
//   const response = await fetch('/refreshTokenEndpoint'); // 서버에 refresh token을 보내고 새로운 accessToken을 받는 엔드포인트
//   if (response.ok) {
//     const newAccessToken = await response.text();
//     return newAccessToken;
//   } else {
//     throw new Error('AccessToken refresh failed');
//   }
// }

// // 요청을 보내기 전 accessToken을 확인하고 추가하는 함수
// async function sendRequestWithAccessToken() {
//   let accessToken = getAccessTokenFromCookie();
//   if (!accessToken) {
//     // 만료된 경우 새로운 accessToken을 가져옴
//     accessToken = await refreshAccessToken();
//   }

//   // 요청 헤더에 accessToken을 추가
//   const headers = {
//     Authorization: `Bearer ${accessToken}`,
//   };

//   // 실제 요청 보내기
//   const response = await fetch('/protectedEndpoint', { headers });
//   // 처리 로직 추가
// }

// // 요청 보내기
// sendRequestWithAccessToken();
