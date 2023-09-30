// 상수 데이터
// 년
export const YEAR = [];

const nowYear = new Date().getFullYear();
for (let i = 1980; i <= nowYear; i++) {
  YEAR.push(i);
}

// 월
export const MONTH = [];

for (let i = 1; i <= 12; i++) {
  let m = String(i).padStart(2, "0");
  MONTH.push(m);
}

// 일
export const DAY = [];
for (let i = 1; i <= 31; i++) {
  let d = String(i).padStart(2, "0");
  DAY.push(d);
}
