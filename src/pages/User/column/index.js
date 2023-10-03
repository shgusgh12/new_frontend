import { getApi } from "../../../utils/http";
import { sendRequestWithAccessToken } from "../../../utils/token";

// sendRequestWithAccessToken 예시 사용법입니다. 참고하세요!

async function getAccount() {
  try {
    const response = await sendRequestWithAccessToken({
      apiFunction: getApi,
      url: "/members",
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

function Column() {
  // createAccount();
  // getAccount();
  getAccount();
  return (
    <div>
      <h1>칼럼 페이지</h1>
    </div>
  );
}

export default Column;
