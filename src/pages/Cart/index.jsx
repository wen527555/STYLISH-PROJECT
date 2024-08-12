import { styled } from "styled-components";
import CartItems from "./CartItems";
import CartForm from "./CartForm";
import { useState } from "react";
import CartContext from "../../context/CartContext";
import { useContext } from "react";
import {
  useMessage,
  MessageOverlay,
  LoadingOverlay,
} from "../../components/Message";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const appworksApi = "https://api.appworks-school.tw/api/1.0";

const initialFormData = {
  name: "",
  phone: "",
  address: "",
  email: "",
  time: "",
  cardNumber: "",
  cardExpiry: "",
  cardCCV: "",
};

const Cart = () => {
  const { cartItems, cleanAllCart, getTotalAmount } = useContext(CartContext);
  const { showMessage, newMessage, showMsgWithTimeout } = useMessage();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [errorMsg, setErrorMsg] = useState(initialFormData);
  const fbAccessToken = localStorage.getItem("accessToken");
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const deliveryFee = cartItems.length > 0 ? 30 : 0;
  const errorMessagekeys = [
    "name",
    "email",
    "phone",
    "address",
    "time",
    "cardNumber",
    "cardExpiry",
    "cardCCV",
  ];

  const itemList = cartItems.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    color: item.color,
    size: item.size,
    qty: item.qty,
  }));

  const emailValidation = (email) => {
    const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return checkEmail.test(email);
  };
  const phoneValidation = (phone) => {
    const ckeckPhone = /^\d{10}$/;
    const isPhoneInput = ckeckPhone.test(phone);
    return isPhoneInput;
  };

  const validateFormData = (formData, cardStatus) => {
    console.log("cardStatus", cardStatus);
    const newErrorMsg = { ...initialFormData };
    if (!formData.name) newErrorMsg.name = "請填寫收件人姓名";
    if (!formData.address) newErrorMsg.address = "請填寫地址";
    if (!emailValidation(formData.email))
      newErrorMsg.email = "無效的電子郵件格式";
    if (!phoneValidation(formData.phone))
      newErrorMsg.phone = "無效的電話號碼,請輸入10位數字";
    if (!formData.time) newErrorMsg.time = "請選擇配送時間";
    if (cardStatus.status.number !== 0) {
      newErrorMsg.cardNumber = "信用卡卡號錯誤";
    }
    if (cardStatus.status.expiry !== 0) {
      newErrorMsg.cardExpiry = "信用卡到期日錯誤";
    }
    if (cardStatus.status.ccv !== 0) {
      newErrorMsg.cardCCV = "信用卡CCV錯誤";
    }
    return newErrorMsg;
  };

  useEffect(() => {
    const loadScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://js.tappaysdk.com/sdk/tpdirect/v5.18.0";
        script.async = true;
        script.onload = () => resolve(window.TPDirect);
        script.onerror = (error) => {
          console.error("Script load error:", error);
          reject(new Error("Script load error"));
        };
        document.body.appendChild(script);
      });
    };

    loadScript()
      .then((TPDirect) => {
        if (TPDirect) {
          TPDirect.setupSDK(
            import.meta.env.VITE_TAPPAY_ID,
            import.meta.env.VITE_TAPPAY_KEY,
            "sandbox"
          );
          TPDirect.card.setup({
            fields: {
              number: {
                element: "#card-number",
                placeholder: "**** **** **** ****",
              },
              expirationDate: {
                element: "#card-expiration-date",
                placeholder: "MM / YY",
              },
              ccv: {
                element: "#card-ccv",
                placeholder: "CCV",
              },
            },
            styles: {
              input: {
                color: "gray",
              },
              ":focus": {
                color: "black",
              },
              ".valid": {
                color: "green",
              },
              ".invalid": {
                color: "red",
              },
            },
            isMaskCreditCardNumber: true,
            maskCreditCardNumberRange: {
              beginIndex: 6,
              endIndex: 11,
            },
          });
        }
      })
      .catch((error) => {
        console.error("Error loading TapPay SDK:", error);
      });

    return () => {
      const script = document.querySelector(
        'script[src="https://js.tappaysdk.com/sdk/tpdirect/v5.18.0"]'
      );
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardStatus = window.TPDirect.card.getTappayFieldsStatus();
    const newErrorMsg = validateFormData(formData, cardStatus);
    if (cartItems.length === 0) {
      showMsgWithTimeout("購物車是空的!請先加入商品");
    } else if (errorMessagekeys.some((key) => newErrorMsg[key])) {
      setErrorMsg(newErrorMsg);
    } else {
      if (window.TPDirect) {
        setIsCheckoutLoading(true);
        try {
          const result = await new Promise((resolve, reject) => {
            window.TPDirect.card.getPrime((res) => {
              if (res.status !== 0) {
                console.error("Error getting prime:", res.msg);
                reject(res);
              } else {
                resolve(res);
              }
            });
          });
          setErrorMsg(initialFormData);
          const prime = result.card.prime;
          await fetchCheckout(prime);
        } catch (error) {
          console.log("Error", error);
        } finally {
          setIsCheckoutLoading(false);
        }
      } else {
        console.error("TPDirect is not initialized");
      }
    }
  };

  const fetchCheckout = async (prime) => {
    try {
      const res = await fetch(`${appworksApi}/order/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${fbAccessToken}`,
        },
        body: JSON.stringify({
          prime: prime,
          order: {
            shipping: "delivery",
            payment: "credit_card",
            subtotal: getTotalAmount(),
            freight: deliveryFee,
            total: getTotalAmount() + deliveryFee,
            recipient: {
              name: formData.name,
              phone: formData.phone,
              email: formData.email,
              address: formData.address,
              time: formData.time,
            },
            list: itemList,
          },
        }),
      });
      if (!res.ok) {
        throw new Error(`Error:${res.status}`);
      }
      const data = await res.json();
      const orderId = data.data.number;
      if (orderId) {
        setFormData(initialFormData);
        cleanAllCart();
        navigate("/thankyou", { state: { orderId } });
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  return (
    <CartContainer>
      <MessageOverlay show={showMessage} message={newMessage} />
      <LoadingOverlay
        show={isCheckoutLoading}
        message={"商品結帳中，請稍候..."}
      />
      <CartItems />
      <CartForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
        errorMsg={errorMsg}
        deliveryFee={deliveryFee}
        totalAmount={getTotalAmount()}
      />
    </CartContainer>
  );
};

export default Cart;

const CartContainer = styled.div`
  width: 1160px;
  padding: 51px 0px 148px 0px;
  box-sizing: border-box;
  height: 100%;
  @media (max-width: 1279px) {
    padding: 20px 24px 28px 24px;
    width: 100%;
  }
`;

export const TitleText = styled.div`
  color: #3f3a3a;
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  text-align: left;
  margin-bottom: 16px;
  @media (max-width: 1279px) {
    margin-bottom: 10px;
  }
`;
