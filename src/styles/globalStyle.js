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
  overflow-y: scroll;
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
  --box-shadow: 5px 5px 10px 0 rgb(0 0 0 / 5%);
}

.nav,
.footer {
  flex: none;
}
`;
