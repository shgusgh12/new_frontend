import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  word-break: keep-all;
}

.body {
  position: relative;
  flex-grow: 1;
  margin: 0;
}

html {
  font-size: 16px;
  background-color: #f9f9f9;
}

a,
a:hover,
a:active,
a:visited {
  color: #494949;
  text-decoration: none;
}

:root {
  --box-shadow: 10px 5px 10px rgb(0, 0, 0, 0.3);
}

.nav,
.footer {
  flex: none;
}
`;
