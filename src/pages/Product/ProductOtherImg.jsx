import { styled } from "styled-components";

const ProductOtherImg = ({ images }) => {
  return (
    <OtherImgContainer>
      {images?.length > 0 &&
        images.map((image, index) => <OtherImg key={index} src={image} />)}
    </OtherImgContainer>
  );
};

export default ProductOtherImg;

const OtherImgContainer = styled.div`
  width: 960px;
  height: auto;
  display: flex;
  flex-direction: column;
  @media (max-width: 1279px) {
    width: 432px;
  }
`;

const OtherImg = styled.img`
  width: 960px;
  height: 540px;
  margin-bottom: 30px;
  @media (max-width: 1279px) {
    width: 432px;
    height: 243px;
    margin-bottom: 20px;
  }
`;
