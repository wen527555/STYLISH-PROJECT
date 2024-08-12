import { styled } from "styled-components";
import { useState, useEffect, useContext } from "react";
import { useMessage, MessageOverlay } from "../../components/Message";
import CartContext from "../../context/CartContext";
import ProductColors from "./ProductColors";
import ProductMoreImg from "./ProductOtherImg";
import ProductInfoText from "./ProductInfoText";
import ProductSizes from "./ProductSizes";
import ProductQuantity from "./ProductQuantity";
import ProductInfoBtn from "./ProductInfoBtn";
const appworksApi = "https://api.appworks-school.tw/api/1.0";

const Product = () => {
  const { addToCart, cartItems } = useContext(CartContext);
  const [detailData, setDetailData] = useState([]);
  const queryParams = new URLSearchParams(window.location.search);
  const productId = queryParams.get("id");
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [maxQuantities, setMaxQuantities] = useState({});
  const { showMessage, newMessage, showMsgWithTimeout } = useMessage();

  const [defaultStock, setDefaultStock] = useState(0);
  const fetchData = async () => {
    const ProductUrl = `${appworksApi}/products/details?id=${productId}`;
    try {
      const res = await fetch(ProductUrl);
      if (!res.ok) {
        throw new Error(`Error:${res.status}`);
      }
      const result = await res.json();
      return result.data;
    } catch (error) {
      console.error(error);
    }
  };

  const loadData = async () => {
    let product = await fetchData();
    if (product) {
      setDetailData(product);
    }
  };
  useEffect(() => {
    loadData();
  }, [productId]);

  useEffect(() => {
    if (cartItems && selectedColor && detailData.sizes) {
      const sizeQuantities = {};
      detailData.sizes.forEach((sizes) => {
        const variant = detailData.variants.find(
          (v) => v.color_code === selectedColor.code && v.size === sizes
        );

        const availableQuantity = variant ? variant.stock : 0;
        const savedInCart = cartItems.find(
          (cartItem) =>
            cartItem.id === productId &&
            cartItem.color === selectedColor.code &&
            cartItem.size === sizes
        );
        const cartQuantity = savedInCart ? savedInCart.quantity : 0;
        sizeQuantities[sizes] = availableQuantity - cartQuantity;
      });
      setMaxQuantities(sizeQuantities);
    }
  }, [cartItems, selectedColor]);

  useEffect(() => {
    if (selectedColor && selectedSize) {
      const variant = detailData.variants.find(
        (v) => v.color_code === selectedColor.code && v.size === selectedSize
      );
      const stockQuantity = variant ? variant.stock : 0;
      setDefaultStock(stockQuantity);
    }
  }, [selectedColor, selectedSize]);

  const handleSelectedColor = (color) => {
    setSelectedColor(color);
    setSelectedSize(null);
    setQuantity(0);
  };

  const handleSelectedSize = (size) => {
    setSelectedSize(size);
    setQuantity(0);
  };

  const handleMinusQuantity = () => {
    if (quantity > 0) {
      setQuantity((preStock) => preStock - 1);
    }
  };

  const handlePlusQuantity = () => {
    if (quantity < maxQuantities[selectedSize]) {
      setQuantity((preStock) => preStock + 1);
    }
  };

  const handleAddToCart = () => {
    const productToAdd = {
      id: productId,
      name: detailData.title,
      price: detailData.price,
      image: detailData.main_image,
      color: selectedColor,
      size: selectedSize,
      qty: quantity,
      stock: defaultStock,
    };
    addToCart(productToAdd);
    setSelectedColor(null);
    setSelectedSize(null);
    setQuantity(0);
    showMsgWithTimeout("成功加入購物車！");
  };

  return (
    <ProductContainer>
      <MessageOverlay show={showMessage} message={newMessage} />
      <ProductTop>
        <ProductImgContainer src={detailData.main_image} />
        <ProductInfoContainer>
          <ProductTitle>{detailData.title}</ProductTitle>
          <ProductId>{detailData.id}</ProductId>
          <ProductPrice>TWD.{detailData.price}</ProductPrice>
          <ProductInfoLine />
          <ProductColorsContainer>
            <LabelTitle>顏色</LabelTitle>
            <ProductColors
              colors={detailData.colors}
              onColorSelect={handleSelectedColor}
              selectedColor={selectedColor}
            />
          </ProductColorsContainer>
          <ProductSizeContainer>
            <LabelTitle>尺寸</LabelTitle>
            <ProductSizes
              onSizeSelect={handleSelectedSize}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              maxQuantities={maxQuantities}
              allSizes={detailData.sizes}
            />
          </ProductSizeContainer>
          <ProductQuantityContainer>
            <LabelTitle data-label="quantity">數量</LabelTitle>
            <ProductQuantity
              maxQuantity={maxQuantities[selectedSize] || 0}
              onMinusClick={handleMinusQuantity}
              onPlusClick={handlePlusQuantity}
              quantity={quantity}
            />
          </ProductQuantityContainer>
          <ProductInfoBtn
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            quantity={quantity}
            addToCartClick={() => handleAddToCart()}
          />
          <ProductInfoText
            note={detailData.note}
            texture={detailData.texture}
            description={detailData.description}
            wash={detailData.wash}
            place={detailData.place}
          />
        </ProductInfoContainer>
      </ProductTop>
      <ProductCenter>
        <ProductCenterText>更多產品資訊</ProductCenterText>
        <ProductCenterLine />
      </ProductCenter>
      <ProductBottom>
        <ProductStory>{detailData.story}</ProductStory>
        <ProductMoreImg images={detailData.images} />
      </ProductBottom>
    </ProductContainer>
  );
};

export default Product;

const ProductContainer = styled.div`
  width: 960px;
  padding: 65px 0px 19px 0px;
  box-sizing: border-box;

  @media (max-width: 1279px) {
    flex-direction: column;
    padding: 0px 0px 12px 0px;
    width: 100%;
  }
`;

const ProductTop = styled.div`
  width: 100%;
  height: 746.67px;
  display: flex;
  margin-bottom: 50.33px;

  @media (max-width: 1279px) {
    flex-direction: column;
    height: auto;
    margin: 0;
    align-items: center;
  }
`;
const ProductInfoContainer = styled.div`
  width: 400px;
  padding-left: 40px;
  box-sizing: border-box;

  @media (max-width: 1279px) {
    width: 100%;
    padding: 0px 24px 0px 24px;
  }
`;

const ProductImgContainer = styled.img`
  width: 560px;
  height: 746.67px;
  @media (max-width: 1279px) {
    width: 480px;
    height: 640px;
  }
`;

const ProductTitle = styled.div`
  font-size: 32px;
  font-weight: 400;
  line-height: 38px;
  letter-spacing: 6.4px;
  text-align: left;
  margin-bottom: 16px;

  @media (max-width: 1279px) {
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 4px;
    margin: 17px 0px 10px 0px;
  }
`;

const ProductId = styled.div`
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 4px;
  text-align: left;
  color: #bababa;
  margin-bottom: 40px;
  @media (max-width: 1279px) {
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 3.2px;
    margin-bottom: 20px;
  }
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 400;
  line-height: 36px;
  text-align: left;
  color: #3f3a3a;
  @media (max-width: 1279px) {
    font-size: 20px;
    line-height: 24px;
  }
`;

const ProductInfoLine = styled.div`
  border-top: solid #3f3a3a 0.5px;
  width: 360px;
  margin: 10px 0px 30px 0px;

  @media (max-width: 1279px) {
    font-size: 20px;
    line-height: 24px;
    width: 100%;
  }
`;

const ProductColorsContainer = styled.div`
  height: 24px;
  width: 100%;
  margin-bottom: 36px;
  display: flex;
  align-items: center;

  @media (max-width: 1279px) {
    margin-bottom: 34px;
  }
`;

const ProductSizeContainer = styled.div`
  height: 36px;
  width: 100%;
  margin-bottom: 22px;
  display: flex;
  align-items: center;
  @media (max-width: 1279px) {
    margin-bottom: 30px;
  }
`;

const ProductQuantityContainer = styled.div`
  height: 44px;
  width: 100%;
  margin-bottom: 26px;
  display: flex;
  align-items: center;
  @media (max-width: 1279px) {
    margin-bottom: 10px;
  }
`;

const LabelTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 4px;
  text-align: left;
  color: #3f3a3a;
  height: 24px;
  margin-right: 24px;
  position: relative;
  display: flex;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    right: -7px;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    border-right: 1px solid black;
  }

  @media (max-width: 1279px) {
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 2.8px;
    &[data-label="quantity"] {
      display: none;
    }
  }
`;

const ProductCenter = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  @media (max-width: 1279px) {
    padding: 0px 24px 0px 24px;
  }
`;

const ProductCenterText = styled.div`
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  letter-spacing: 3px;
  text-align: left;
  width: 150px;
  height: 30px;
  margin: 0;
  color: #8b572a;
  @media (max-width: 1279px) {
    width: 180px;
    height: 30px;
    font-size: 16px;
    letter-spacing: 3.2px;
  }
`;

const ProductCenterLine = styled.div`
  border-top: solid #000000 0.5px;
  width: 761px;
  margin: 15px 0px 15px 64px;
  @media (max-width: 1279px) {
    width: 100%;
    margin: 15px 0px 15px 0px;
  }
`;

const ProductBottom = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 1279px) {
    padding: 0px 24px 0px 24px;
    align-items: center;
  }
`;

const ProductStory = styled.div`
  height: 60px;
  font-size: 20px;
  font-weight: 400;
  line-height: 30px;
  text-align: left;
  color: #3f3a3a;
  margin: 28px 0px 30px 0px;
  width: 100%;
  @media (max-width: 1279px) {
    height: 75px;
    font-size: 14px;
    line-height: 25px;
    margin: 12px 0px 20px 0px;
  }
`;
