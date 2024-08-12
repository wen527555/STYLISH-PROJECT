import { useContext } from "react";
import styled from "styled-components";
import cart from "./headerImg/cart.png";
import cartHover from "./headerImg/cart-hover.png";
import cartMobile from "./headerImg/cart-mobile.png";
import member from "./headerImg/member.png";
import memberHover from "./headerImg/member-hover.png";
import memberMobile from "./headerImg/member-mobile.png";
import CartContext from "../../context/CartContext";

const HeaderIcons = ({ onCartClick, onMemberClick }) => {
  const { getTotalQuantity } = useContext(CartContext);
  return (
    <IconsContainer>
      <CartWrapper onClick={onCartClick}>
        <CartBtn>
          <CartBtnImg src={cart} />
          <CartNum>{getTotalQuantity()}</CartNum>
        </CartBtn>
        <IconsText>購物車</IconsText>
      </CartWrapper>
      <MemberWrapper onClick={onMemberClick}>
        <MemberBtnImg src={member} />
        <IconsText>會員</IconsText>
      </MemberWrapper>
    </IconsContainer>
  );
};

export default HeaderIcons;

const IconsContainer = styled.div`
  width: 130px;
  height: 44px;
  display: flex;
  align-items: center;
  gap: 42px;
  padding-right: 5px;

  @media (max-width: 1279.9px) {
    display: flex;
    background-color: #313538;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    height: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    padding: 6px 15px;
    box-sizing: border-box;
  }
`;

const CartWrapper = styled.div`
  width: 44px;
  height: 44px;

  @media (max-width: 1279.9px) {
    display: flex;
    text-align: center;
    flex: 1;
    align-items: center;
    justify-content: center;
  }
`;

const CartBtn = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  position: relative;

  @media (max-width: 1279.9px) {
    padding: 3px 0px 0px 12px;
  }
`;

const CartBtnImg = styled.img`
  position: relative;
  @media (max-width: 1279.9px) {
    content: url(${cartMobile});
  }
  &:hover {
    content: ${cartHover};
  }
`;

const CartNum = styled.div`
  position: absolute;
  background-color: #8b572a;
  color: white;
  border-radius: 50%;
  padding: 6px;
  bottom: 5px;
  right: 7px;
  width: 12px;
  height: 12px;
  text-align: center;
  font-size: 16px;
  line-height: 12px;
  font-weight: 400;

  @media (max-width: 1279.9px) {
    bottom: 3px;
    right: 0px;
  }
`;

const MemberWrapper = styled.button`
  width: 44px;
  height: 44px;
  cursor: pointer;
  background: none;
  border: none;
  @media (max-width: 1279.9px) {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }
`;

const MemberBtnImg = styled.img`
  @media (max-width: 1279.9px) {
    content: url(${memberMobile});
  }
  &:hover {
    content: ${memberHover};
  }
`;

const IconsText = styled.div`
  display: none;
  @media (max-width: 1279.9px) {
    font-size: 16px;
    padding-top: 2px;
    color: #fff;
    display: block;
  }
`;
