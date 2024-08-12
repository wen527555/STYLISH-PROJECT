import lineImg from "./footerImg/line.png";
import facebookImg from "./footerImg/facebook.png";
import twitterImg from "./footerImg/twitter.png";
import styled from "styled-components";

const socialMediaLinks = [
  { imgSrc: lineImg, altText: "Line" },
  { imgSrc: twitterImg, altText: "twitter" },
  { imgSrc: facebookImg, altText: "facebook" },
];

const FooterSocialMedia = () => {
  return (
    <SocialMediaContainer>
      {socialMediaLinks.map((item, index) => (
        <FooterSocialMediaItem key={index}>
          <a>
            <SocialMediaImg src={item.imgSrc} alt={item.altText} />
          </a>
        </FooterSocialMediaItem>
      ))}
    </SocialMediaContainer>
  );
};

export default FooterSocialMedia;

const SocialMediaContainer = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;

  @media (max-width: 1279px) {
    align-items: start;
    gap: 14px;
    margin: 0px 0px 46px 31px;
  }
`;

const FooterSocialMediaItem = styled.div`
  width: 50px;
  height: 50px;

  @media (max-width: 1279px) {
    width: 20px;
    height: 20px;
  }
`;

const SocialMediaImg = styled.img`
  width: 50px;
  height: 50px;

  @media (max-width: 1279px) {
    width: 20px;
    height: 20px;
  }
`;
