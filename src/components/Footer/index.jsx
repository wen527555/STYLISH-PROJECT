import FooterList from "./FooterList";
import FooterSocialMedia from "./FooterSocialMedia";
import FooterCopyright from "./FooterCopyright";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterTop>
        <FooterList />
        <FooterSocialMedia />
        <FooterCopyright />
      </FooterTop>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  grid-row: 3/4;
  background: #313538;
  height: 115px;
  color: white;
  width: 100%;
  box-sizing: border-box;
  padding: 33px 380px 32px 380px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1919px) {
    padding: 33px 60px 32px 60px;
  }

  @media (max-width: 1279px) {
    height: 146px;
    flex-direction: column;
    padding: 0;
    align-items: center;
    margin-bottom: 60px;
  }
`;

const FooterTop = styled.div`
  display: flex;

  @media (max-width: 1279px) {
    flex-wrap: wrap;
    padding-top: 18px;
    height: 146px;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
  @media (max-width: 479px) {
    flex-wrap: wrap;
    padding: 18px 32px 0px 32px;
    height: 146px;
    box-sizing: border-box;
  }
`;
