import { styled } from "styled-components";

const ProductInfoText = ({ note, texture, description, wash, place }) => {
  return (
    <InfoTextContainer>
      <InfoText>{note}</InfoText>
      <InfoText>
        {texture}
        <br />
        {description}
      </InfoText>
      <InfoText>
        {wash}
        <br />
        {place}
      </InfoText>
    </InfoTextContainer>
  );
};

export default ProductInfoText;

const InfoTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 80px 6px 154px 4.67px;
  box-sizing: border-box;
  @media (max-width: 1279px) {
    margin: 28px 0px 28px 0px;
  }
`;

const InfoText = styled.div`
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  text-align: left;
  white-space: pre-line;
  color: #3f3a3a;
  @media (max-width: 1279px) {
    font-size: 14px;
    line-height: 24px;
  }
`;
