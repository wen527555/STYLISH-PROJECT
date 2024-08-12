import { styled } from "styled-components";

export const AppContainer = styled.div`
  display: grid;
  grid-template-rows: 140px 1fr 115px;
  grid-template-columns: 1fr;
  min-height: 100vh;

  @media (max-width: 1279.9px) {
    grid-template-rows: 102px 1fr 206px;
  }
`;

export const MainContent = styled.main`
  /* grid-row: 2/3; */
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  margin-top: 140px;

  @media (max-width: 1279.9px) {
    margin-top: 102px;
  }
`;
