import { styled } from "styled-components";

const ProductSizes = ({
  selectedColor,
  allSizes,
  selectedSize,
  onSizeSelect,
  maxQuantities,
}) => {
  // console.log("selectedColorsize", selectedColor);
  const isColorSelected = Boolean(selectedColor);
  return (
    <ProductSizesContainer>
      {allSizes?.length > 0 &&
        allSizes.map((size, index) => (
          <ProductSize
            key={index}
            disabled={!isColorSelected || maxQuantities[size] <= 0}
            selected={selectedSize === size}
            onClick={() => (!isColorSelected ? null : onSizeSelect(size))}
          >
            {size}
          </ProductSize>
        ))}
    </ProductSizesContainer>
  );
};

export default ProductSizes;

const ProductSizesContainer = styled.div`
  display: flex;
  gap: 20px;
  height: 36px;
  align-items: center;
  @media (max-width: 1279px) {
    gap: 15px;
  }
`;

const ProductSize = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  font-size: 20px;
  font-weight: 400;
  border: none;
  cursor: pointer;
  background: "#ECECEC";
  color: #3f3a3a;

  &:hover {
    background: #000000;
    color: white;
  }

  &:disabled {
    background: #ececec40;
    cursor: not-allowed;
    color: #3f3a3a40;
  }

  ${(props) =>
    props.selected &&
    `
      background: #000000;
      color: white;
  `}
`;
