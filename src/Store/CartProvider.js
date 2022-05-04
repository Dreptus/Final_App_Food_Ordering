import {useReducer} from 'react';
import CartContext from './Cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const existingCartItemIndex = state.items.findIndex (
      item => item.id === action.item.id
    );
    // action was despatch
    //[] giv me access to existingCatItemIndex
    const existingCartItem = state.items[existingCartItemIndex];

    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    let updatedItems;

    if (existingCartItem) {
      // updateItem is new object when we copy existingCartItem
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
        // action.item.amount - amount is added by action
      };
      updatedItems = [...state.items];
      // updatedItems is now equal new array ... state.items - copy  existing items - copy old objects
      updatedItems[existingCartItemIndex] = updatedItem;
      // existingCartItemIndex(old array item) overwrite by new array updatedItems
    } else {
      //updatedItem is new item where I copy action.item
      // updatedItem = {...action.item}
      // Concat give me brand new array
      updatedItems = state.items.concat (action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  // logic to remove our item from cart
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex (
      item => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;

    if (existingItem.amount === 1) {
      updatedItems = state.items.filter (item => item.id !== action.id);
      // filter will return new array by applying specific condition
    } else {
      const updatedItem = {...existingItem, amount: existingItem.amount - 1};
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
if(action.type === 'CLEAR'){
return defaultCartState
}
  return defaultCartState;
};

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer (
    cartReducer,
    defaultCartState
  );

  const addItemToCarHandler = item => {
    dispatchCartAction ({type: 'ADD', item: item});
  };

  const removeItemFromCartHandler = id => {
    dispatchCartAction ({type: 'REMOVE', id: id});
  };

const clearCartHandler = () => {
  dispatchCartAction({type: 'CLEAR'})
}

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCarHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
