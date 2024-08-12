import { styled } from "styled-components";
import { TitleText } from ".";

const CartForm = ({
  handleSubmit,
  handleChange,
  formData,
  errorMsg,
  deliveryFee,
  totalAmount,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <FormTop>
        <TitleText>訂購資料</TitleText>
        <Line />
        <FormNameGroup>
          <FormLabel htmlFor="name">收件人姓名</FormLabel>
          <FormInput
            id="name"
            onChange={handleChange}
            value={formData.name}
            hasError={!!errorMsg.name}
          />
          {errorMsg.name && <ErrorMsg>{errorMsg.name}</ErrorMsg>}
        </FormNameGroup>
        <FormRemindText>
          務必填寫完整收件人姓名，避免包裹無法順利簽收
        </FormRemindText>
        <FormGroup>
          <FormLabel htmlFor="phone">手機</FormLabel>
          <FormInput
            id="phone"
            onChange={handleChange}
            value={formData.phone}
            hasError={!!errorMsg.phone}
          />
          {errorMsg.phone && <ErrorMsg>{errorMsg.phone}</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="address">地址</FormLabel>
          <FormInput
            id="address"
            onChange={handleChange}
            value={formData.address}
            hasError={!!errorMsg.address}
          />
          {errorMsg.address && <ErrorMsg>{errorMsg.address}</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput
            id="email"
            onChange={handleChange}
            value={formData.email}
            hasError={!!errorMsg.email}
          />
          {errorMsg.email && <ErrorMsg>{errorMsg.email}</ErrorMsg>}
        </FormGroup>
        <FormRadioGroupContatiner>
          <FormLabel htmlFor="time">配送時間</FormLabel>
          <FormRadioGroups>
            <FormRadioGroup>
              <FormRadioInput
                id="time"
                value="morning"
                checkd={formData.time === "08:00-12:00"}
                onChange={handleChange}
              />
              <FormRadio1Label>08:00-12:00</FormRadio1Label>
            </FormRadioGroup>
            <FormRadioGroup>
              <FormRadioInput
                id="time"
                value="afternoon"
                checkd={formData.time === "14:00-18:00"}
                onChange={handleChange}
              />
              <FormRadioLabel>14:00-18:00</FormRadioLabel>
            </FormRadioGroup>
            <FormRadioGroup>
              <FormRadioInput
                id="time"
                value="anytime"
                checkd={formData.time === "不指定"}
                onChange={handleChange}
              />
              <FormRadioLabel>不指定</FormRadioLabel>
            </FormRadioGroup>
          </FormRadioGroups>
          {errorMsg.time && <ErrorMsg>{errorMsg.time}</ErrorMsg>}
        </FormRadioGroupContatiner>
      </FormTop>
      <FormBottom>
        <TitleText>付款資料</TitleText>
        <Line />
        <FormGroup>
          <FormLabel htmlFor="card-number">信用卡號碼</FormLabel>
          <TpField id="card-number" />
          {errorMsg.cardNumber && <ErrorMsg>{errorMsg.cardNumber}</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="card-expiration-date">有效期限</FormLabel>
          <TpField id="card-expiration-date" />
          {errorMsg.cardExpiry && <ErrorMsg>{errorMsg.cardExpiry}</ErrorMsg>}
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor="card-ccv">安全碼</FormLabel>
          <TpField id="card-ccv" />
          {errorMsg.cardCCV && <ErrorMsg>{errorMsg.cardCCV}</ErrorMsg>}
        </FormGroup>
      </FormBottom>
      <CartBottom>
        <TotalContainer>
          <Sum>
            <SumContainer>
              <TotalTitle>總金額</TotalTitle>
              <TotalPriceContainer>
                <TotalTitle>NT.</TotalTitle>
                <TotalPrice>{totalAmount}</TotalPrice>
              </TotalPriceContainer>
            </SumContainer>
            <SumContainer>
              <TotalTitle>運費</TotalTitle>
              <TotalPriceContainer>
                <TotalTitle>NT.</TotalTitle>
                <TotalPrice>{deliveryFee}</TotalPrice>
              </TotalPriceContainer>
            </SumContainer>
            <TotalLine />
            <SumContainer>
              <TotalTitle>應付金額</TotalTitle>
              <TotalPrice2Container>
                <TotalTitle>NT.</TotalTitle>
                <TotalPrice>{deliveryFee + totalAmount}</TotalPrice>
              </TotalPrice2Container>
            </SumContainer>
          </Sum>
          <PayBtn type="submit">確認付款</PayBtn>
        </TotalContainer>
      </CartBottom>
    </form>
  );
};

export default CartForm;

const FormTop = styled.div`
  margin-top: 50px;
  height: 363px;
  @media (max-width: 1279px) {
    margin-top: 20px;
    height: 441px;
  }
`;

const Line = styled.div`
  width: 100%;
  margin-bottom: 24px;
  border-top: solid #3f3a3a 0.5px;
  @media (max-width: 1279px) {
    margin-bottom: 20px;
  }
`;

const FormNameGroup = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  margin: 0px 0px 10px 0px;
  @media (max-width: 1279px) {
    width: 432px;
    flex-direction: column;
    height: 59px;
  }
`;

const FormGroup = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  @media (max-width: 1279px) {
    flex-direction: column;
    margin: 0px 0px 20px 0px;
    width: 432px;
    height: 59px;
  }
`;

const FormRadioGroupContatiner = styled.div`
  /* width: 476px; */
  height: 26px;
  margin-bottom: 30px;
  display: flex;
  @media (max-width: 1279px) {
    width: 100%;
    margin-bottom: 20px;
    flex-direction: column;
  }
`;

const FormLabel = styled.label`
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  text-align: left;
  width: 120px;
  margin: 6.5px 0px;
  display: block;
  @media (max-width: 1279px) {
    font-size: 14px;
    line-height: 17px;
    margin: 0px 0px 10px 0px;
  }
`;

const FormInput = styled.input.attrs({
  type: "text",
})`
  width: 576px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid ${(prop) => (prop.hasError ? "#ae2828" : "#979797")};
  box-shadow: ${(props) =>
    props.hasError ? "0 0 5px rgba(174, 40, 40, 0.5)" : "none"};
  padding: 4px 0px 0px 8px;
  box-sizing: border-box;

  /* &::placeholder {
    color: #d3d3d3;
    font-size: 15px;
    font-weight: 400;
    letter-spacing: 2px;
  } */
  @media (max-width: 1279px) {
    width: 432px;
    height: 32px;
  }
`;

const TpField = styled.div`
  width: 576px;
  height: 32px;
  border-radius: 8px;
  padding: 4px 0px 0px 8px;
  box-sizing: border-box;
  border: 1px solid #979797;
  @media (max-width: 1279px) {
    width: 432px;
    height: 32px;
  }
`;

const ErrorMsg = styled.div`
  height: 32px;
  color: #ae2828;
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const FormRemindText = styled.div`
  color: #8b572a;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  text-align: right;
  width: 696px;
  margin: 11px 0px 28px 0px;
  @media (max-width: 1279px) {
    font-size: 14px;
    line-height: 17px;
    margin: 6px 0px 20px 0px;
    text-align: left;
    width: 432px;
  }
`;

const FormRadioGroup = styled.div`
  height: 26px;
  display: flex;
  text-align: center;
  align-items: center;
`;

const FormRadioGroups = styled.div`
  display: flex;
`;
const FormRadioInput = styled.input.attrs({ type: "radio" })`
  margin: 0px 8px 0px 0px;
  border: 1px solid #979797;
  width: 16px;
  height: 16px;
`;

const FormRadioLabel = styled.label`
  margin-right: 28px;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  text-align: left;
  padding-top: 5px;
  @media (max-width: 1279px) {
    font-size: 14px;
  }
`;

const FormRadio1Label = styled.label`
  margin-right: 27px;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  text-align: left;
  padding-top: 5px;
  @media (max-width: 1279px) {
    font-size: 14px;
  }
`;

const FormBottom = styled.div`
  margin-top: 50px;
  height: 216px;
  @media (max-width: 1279px) {
    margin-top: 20px;
    height: 266px;
  }
`;

const CartBottom = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: flex-end;
  @media (max-width: 1279px) {
    width: 100%;
    flex-direction: column;
  }
`;

const TotalContainer = styled.div`
  @media (max-width: 1279px) {
    height: 248px;
    width: 100%;
  }
`;

const Sum = styled.div`
  @media (max-width: 1279px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: end;
  }
`;

const SumContainer = styled.div`
  width: 240px;
  height: 36px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const TotalTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  color: #3f3a3a;
  margin: 8.5px 0px;
`;

const TotalPriceContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const TotalPrice2Container = styled.div`
  display: flex;
`;

const TotalPrice = styled.div`
  font-size: 30px;
  font-weight: 400;
  line-height: 36px;
  text-align: right;
  color: #3f3a3a;
  margin: 0px;
  padding-right: 3px;
`;

const TotalLine = styled.div`
  width: 100%;
  border-top: solid #3f3a3a 0.5px;
  margin-bottom: 20px;
`;

const PayBtn = styled.button`
  width: 240px;
  height: 64px;
  background: #000000;
  color: white;
  font-family: Noto Sans TC;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 4px;
  margin-top: 30px;
  padding-right: 3px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  @media (max-width: 1279px) {
    width: 100%;
    height: 44px;
    font-size: 16px;
    line-height: 30px;
    letter-spacing: 3.2px;
  }
`;
