import styled from "styled-components";

const links = [
  { text: "關於STYLiSH" },
  { text: "服務條款" },
  { text: "隱私政策" },
  { text: "聯絡我們" },
  { text: "FAQ" },
];

const FooterList = () => {
  return (
    <FooterLinks>
      {links.map((link, index) => (
        <FooterLinkItem key={index}>
          <FooterLink>{link.text}</FooterLink>
        </FooterLinkItem>
      ))}
    </FooterLinks>
  );
};
export default FooterList;

const FooterLinks = styled.div`
  display: flex;
  margin: 10px 101px 15px 0px;
  align-items: center;
  width: 670px;
  justify-content: center;

  @media (max-width: 1279px) {
    flex-direction: column;
    flex-wrap: wrap;
    height: 105px;
    width: 177px;
    gap: 0px 30px;
    margin: 0;
    align-items: start;
    justify-content: start;
  }
`;

const FooterLinkItem = styled.div`
  height: 22px;
  flex: 1;
  text-align: center;
  position: relative;

  @media (max-width: 1279px) {
    height: 20px;
    margin-bottom: 8px;
    flex: none;
  }

  @media (max-width: 479px) {
    height: 20px;
  }

  &:not(:last-child)::after {
    content: none;
    border: none;
    margin-left: 0;
  }
`;

const FooterLink = styled.a`
  outline: 0;
  text-decoration: none;
  cursor: pointer;
  color: inherit;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  font-weight: 400;

  &:not(:last-child)::after {
    position: absolute;
    content: "";
    color: inherit;
    right: 0;
    height: 80%;
    border-right: 1px solid rgb(255, 255, 255);
  }
  @media (max-width: 1279px) {
    color: #d3d3d3;
    font-size: 14px;
    line-height: 20px;
  }
`;
