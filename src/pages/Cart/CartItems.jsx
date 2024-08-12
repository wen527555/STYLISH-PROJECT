import { styled } from "styled-components";
import trashImg from "./CartImg/trash.png";
import { TitleText } from ".";
import CartContext from "../../context/CartContext";
import { useContext } from "react";

const CartItems = () => {
  const { cartItems, removeFromCart, handleQuantityChange } =
    useContext(CartContext);

  const generateQuantityOptions = (maxQuantity) => {
    return Array.from({ length: maxQuantity }, (_, index) => index + 1);
  };

  return (
    <>
      <TitleContainer>
        <CartTitleContainer>
          <TitleText>購物車</TitleText>
        </CartTitleContainer>
        <ItemTitleContainer>
          <ItemTitle>數量</ItemTitle>
          <ItemTitle>單價</ItemTitle>
          <ItemTitle>小計</ItemTitle>
        </ItemTitleContainer>
      </TitleContainer>
      <CartItemsContainer>
        {cartItems.length === 0 ? (
          <NoCartItemContainer>
            購物車是空的，立即開始選購！
          </NoCartItemContainer>
        ) : (
          cartItems.map((item, index) => (
            <CartItemContainer key={index}>
              <MobileCartLine />
              <CartItemDetailContainer>
                <CartItemImg src={item.image} alt={item.name} />
                <CartItemDetail>
                  <ItemName>{item.name}</ItemName>
                  <ItemId>{item.id}</ItemId>
                  <ItemColor>顏色｜{item.color.name}</ItemColor>
                  <ItemSize>尺寸｜{item.size}</ItemSize>
                </CartItemDetail>
              </CartItemDetailContainer>
              <MobileItemTitleContainer>
                <ItemTitle>數量</ItemTitle>
                <ItemTitle>單價</ItemTitle>
                <ItemTitle>小計</ItemTitle>
              </MobileItemTitleContainer>
              <CartPricingDetailsContainer>
                <CartItemQuantityContainer>
                  <CartItemQuantitySelect
                    value={item.qty}
                    onChange={(e) =>
                      handleQuantityChange(item, Number(e.target.value))
                    }
                  >
                    {generateQuantityOptions(item.stock).map((num) => (
                      <CartItemQuantityOption key={num} value={num}>
                        {num}
                      </CartItemQuantityOption>
                    ))}
                  </CartItemQuantitySelect>
                </CartItemQuantityContainer>
                <CartItemPriceContainer>
                  <CartItemPrice>TWD.{item.price}</CartItemPrice>
                </CartItemPriceContainer>
                <CartItemSubtotalContainer>
                  <CartItemSubtotal>
                    TWD.{item.price * item.qty}
                  </CartItemSubtotal>
                </CartItemSubtotalContainer>
              </CartPricingDetailsContainer>
              <CartItemRemoveContainer>
                <CartItemRemoveImg
                  src={trashImg}
                  alt="Remove item"
                  onClick={() => removeFromCart(item)}
                />
              </CartItemRemoveContainer>
            </CartItemContainer>
          ))
        )}
      </CartItemsContainer>
    </>
  );
};

export default CartItems;

const TitleContainer = styled.div`
  display: flex;
  width: 100%;
`;

const CartTitleContainer = styled.div`
  width: 538px;
  @media (max-width: 1279px) {
    width: 100%;
  }
`;

const ItemTitleContainer = styled.div`
  height: 19px;
  padding-bottom: 16px;
  display: flex;
  gap: 160px;
  @media (max-width: 1279px) {
    display: none;
  }
`;

const MobileItemTitleContainer = styled.div`
  display: none;
  @media (max-width: 1279px) {
    height: 17px;
    gap: 60px;
    margin-bottom: 11px;
    display: flex;
  }
`;

const ItemTitle = styled.div`
  color: #3f3a3a;
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  width: 32px;
  @media (max-width: 1279px) {
    width: 104px;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    text-align: center;
  }
`;

const CartItemsContainer = styled.div`
  padding: 40px 30px 8px 30px;
  border: 1px solid #979797;

  @media (max-width: 1279px) {
    border: none;
    padding: 0;
  }
`;

const CartItemContainer = styled.div`
  width: 100%;
  height: 152px;
  display: flex;
  margin-bottom: 30px;
  @media (max-width: 1279px) {
    flex-direction: column;
    position: relative;
    height: 251px;
  }
`;

const NoCartItemContainer = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  color: #3f3a3a;
  justify-content: center;
`;

const CartItemDetailContainer = styled.div`
  width: 484px;
  height: 100%;
  display: flex;
  gap: 15px;
  @media (max-width: 1279px) {
    width: 252px;
    margin-bottom: 20px;
  }
`;

const CartItemDetail = styled.div`
  width: 100%;
`;
const ItemName = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  color: #3f3a3a;
  margin-bottom: 18px;
  @media (max-width: 1279px) {
    font-size: 14px;
    line-height: 17px;
  }
`;
const ItemId = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  color: #000000;
  margin-bottom: 22px;
  @media (max-width: 1279px) {
    font-size: 14px;
    line-height: 17px;
  }
`;
const ItemColor = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  color: #000000;
  margin-bottom: 10px;
  @media (max-width: 1279px) {
    font-size: 14px;
    line-height: 17px;
  }
`;
const ItemSize = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  color: #000000;
  margin-bottom: 10px;
  @media (max-width: 1279px) {
    font-size: 14px;
    line-height: 17px;
  }
`;

const CartItemImg = styled.img`
  width: 114px;
  height: 152px;
`;

const CartPricingDetailsContainer = styled.div`
  display: flex;
  @media (max-width: 1279px) {
    height: 30px;
    margin-bottom: 20px;
  }
`;

const MobileCartLine = styled.div`
  display: none;
  @media (max-width: 1279px) {
    width: 100%;
    display: block;
    border-top: solid #000000 0.5px;
    margin-bottom: 20px;
  }
`;

const CartItemQuantityContainer = styled.div`
  width: 80px;
  margin-right: 56px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CartItemQuantitySelect = styled.select`
  width: 80px;
  height: 32px;
  border-radius: 8px;
  background: #f3f3f3;
  padding: 0px 8px 0px 12px;
  @media (max-width: 1279px) {
    height: 30px;
  }
`;

const CartItemQuantityOption = styled.option`
  color: #3f3a3a;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
`;

const CartItemPriceContainer = styled.div`
  width: 192px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 1px;
  @media (max-width: 1279px) {
    font-size: 144px;
  }
`;

const CartItemPrice = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  text-align: center;
  color: #3f3a3a;
  @media (max-width: 1279px) {
    line-height: 17px;
    font-size: 14px;
  }
`;

const CartItemSubtotalContainer = styled.div`
  width: 192px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 1px;
  @media (max-width: 1279px) {
    font-size: 104px;
  }
`;

const CartItemSubtotal = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  text-align: center;
  color: #3f3a3a;
  @media (max-width: 1279px) {
    line-height: 17px;
    font-size: 14px;
  }
`;

const CartItemRemoveContainer = styled.div`
  width: 44px;
  margin-left: 51px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CartItemRemoveImg = styled.img`
  width: 44px;
  height: 44px;

  @media (max-width: 1279px) {
    position: absolute;
    top: 20px;
    right: 0;
  }
`;
