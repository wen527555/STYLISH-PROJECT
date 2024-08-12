import { styled } from "styled-components";

const ProductInfoBtn = ({
  selectedColor,
  selectedSize,
  quantity,
  addToCartClick,
}) => {
  let statusText = "請加入購物車";
  let disabled = false;

  if (!selectedColor) {
    statusText = "請選擇顏色";
    disabled = true;
  } else if (!selectedSize) {
    statusText = "請選擇尺寸";
    disabled = true;
  } else if (quantity <= 0) {
    statusText = "請選擇數量";
    disabled = true;
  } else {
    statusText = "請加入購物車";
    disabled = false;
  }

  return (
    <ProductStatusBtn disabled={disabled} onClick={addToCartClick}>
      {statusText}
    </ProductStatusBtn>
  );
};

export default ProductInfoBtn;

const ProductStatusBtn = styled.button`
  width: 360px;
  height: 64px;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffff;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 4px;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  @media (max-width: 1279px) {
    font-size: 16px;
    letter-spacing: 3.2px;
    padding: 0px 24px 0px 24px;
    width: 100%;
    height: 44px;
  }
`;
