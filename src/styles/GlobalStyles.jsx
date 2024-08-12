import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`

#root{
  min-height:100vh;
  display: flex;
    flex-direction: column;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  box-sizing:border-box;
  font-family: Noto Sans TC;
}

`;
