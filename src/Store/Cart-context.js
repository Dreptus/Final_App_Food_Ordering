import React from 'react';

const CartContext = React.createContext ({
  items: [],
  totalAmount: 0,
  // Adding items to the list
  addItem: item => {},
  // Remove items from the list
  removeItem: id => {},
  //clearing cart after order
  clearCart: () => {}
});

export default CartContext;
