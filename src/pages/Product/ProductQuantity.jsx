import { styled } from "styled-components";

const ProductQuantity = ({
  onMinusClick,
  onPlusClick,
  quantity,
  maxQuantity,
}) => {
  return (
    <ProductQuantityContainer>
      <MinusBtn onClick={onMinusClick} disabled={quantity <= 0}>
        -
      </MinusBtn>
      <QuantityNum>{quantity}</QuantityNum>
      <PlusBtn onClick={onPlusClick} disabled={quantity >= maxQuantity}>
        +
      </PlusBtn>
    </ProductQuantityContainer>
  );
};

export default ProductQuantity;

const ProductQuantityContainer = styled.div`
  display: flex;
  width: 160px;
  height: 44px;
  border: 1px solid #d3d3d3;
  padding: 0px 6px 0px 15px;
  align-items: center;
  justify-content: center;
  @media (max-width: 1279px) {
    width: 100%;
    padding: 0px 48.46px 0px 48.46px;
  }
`;

const MinusBtn = styled.button`
  width: 6px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  @media (max-width: 1279px) {
    width: 8.31px;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const PlusBtn = styled.button`
  width: 9px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  @media (max-width: 1279px) {
    width: 12.46px;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;
const QuantityNum = styled.div`
  width: 124px;
  text-align: center;
  @media (max-width: 1279px) {
    width: 100%;
  }
`;
