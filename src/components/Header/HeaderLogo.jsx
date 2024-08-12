import styled from "styled-components";
import logo from "./headerImg/logo.png";

const HeaderLogo = () => {
  return (
    <Logo href="/homepage.html">
      <LogoImg src={logo} />
    </Logo>
  );
};

export default HeaderLogo;

const Logo = styled.a`
  padding: 0;
  background: none;
  border: none;
  width: 258px;

  @media (max-width: 1279.9px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 52px;
    padding-left: 4px;
  }
`;

const LogoImg = styled.img`
  width: 258px;
  height: 48px;
  cursor: pointer;
  @media (max-width: 1279.9px) {
    width: 129px;
    height: 24px;
  }
`;
