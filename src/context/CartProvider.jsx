import CartContext from "./CartContext";
import { useState, useEffect } from "react";
const CartProvider = ({ children }) => {
  const storedCart = localStorage.getItem("cartItems");
  const [cartItems, setCartItems] = useState(
    storedCart ? JSON.parse(storedCart) : []
  );
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (newItem) => {
    const existingItem = cartItems.find(
      (cartItem) =>
        cartItem.id === newItem.id &&
        cartItem.color === newItem.color &&
        cartItem.size === newItem.size
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === newItem.id
            ? { ...cartItem, qty: cartItem.qty + newItem.qty }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, newItem]);
    }
  };

  const getTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.qty, 0);
  };

  const removeFromCart = (item) => {
    const filterCartItems = cartItems.filter(
      (cartItem) =>
        !(
          cartItem.id === item.id &&
          cartItem.color === item.color &&
          cartItem.size === item.size
        )
    );
    setCartItems(filterCartItems);
  };

  const handleQuantityChange = (item, newQuantity) => {
    const updateCartItems = cartItems.map((cartItem) => {
      if (
        cartItem.id === item.id &&
        cartItem.color === item.color &&
        cartItem.size === item.size
      ) {
        return { ...cartItem, qty: newQuantity };
      }
      return cartItem;
    });

    setCartItems(updateCartItems);
  };

  const cleanAllCart = () => {
    setCartItems([]);
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = Math.floor(item.price * item.qty);
      return total + itemTotal;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        getTotalQuantity,
        removeFromCart,
        handleQuantityChange,
        cleanAllCart,
        getTotalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
