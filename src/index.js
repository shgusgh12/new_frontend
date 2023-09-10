import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/globalStyle";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider
      theme={{
        palette: {
          green: "#00A869",
          gray: "#7D8790",
          black: "#191919",
          red: "#F6465D",
          light_green: "#EDFFEF",
        },
      }}
    >
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
