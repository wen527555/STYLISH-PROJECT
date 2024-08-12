import { styled } from "styled-components";
const ProductColors = ({ colors, selectedColor, onColorSelect }) => {
  return (
    <ProductColorContainer>
      {colors?.length > 0 &&
        colors.map((color, index) => (
          <ProductColor
            key={index}
            color={color.code}
            selected={selectedColor === color}
            onClick={() => onColorSelect(color)}
          />
        ))}
    </ProductColorContainer>
  );
};

export default ProductColors;

const ProductColorContainer = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 1279px) {
    gap: 27px;
  }
`;

const ProductColor = styled.button`
  width: 24px;
  height: 24px;
  border: 1px solid #d3d3d3;
  cursor: pointer;
  background-color: #${(props) => props.color};
  position: relative;

  ${(props) =>
    props.selected &&
    `
    &::after {
    content: "";
    width: 36px;
    height: 36px;
    border: 1px solid #979797;
    position: absolute;
    top:-8px;
    left:-8px;
  }
 `}
`;
