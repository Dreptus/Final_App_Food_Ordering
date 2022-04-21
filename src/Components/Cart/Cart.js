import {useContext} from 'react';
import CartContext from '../../Store/Cart-context';

import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = props => {
  const cartCtx = useContext (CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed (2)}`;
  // const which will show only total amount if we have something in our order
  const hasItems = cartCtx.items.length > 0;
  
  const cartItemRemoveHandler = (id) => { 
  cartCtx.removeItem(id)
  }
  
  const cartItemAddHandler = (item) => {
  // passing new object with old items and new amount with set value 1 - from here will be pass to CartProvider useReducer and do the rest dispatcheAction
      cartCtx.addItem({...item, amount:1})
  }
  
  const cartItems = (
    <ul className={classes['cart-items']}>
      {/* adding dynamic items through cartCtx*/}
      {cartCtx.items.map (item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove = {cartItemRemoveHandler.bind(null, item.id)}
          //Bind will ensure that we remove id from our cart and this will ensure that function add and remove will be executed
          onAdd = {cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
