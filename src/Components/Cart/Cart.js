import {Fragment, useContext, useState} from 'react';
import CartContext from '../../Store/Cart-context';

import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState (false);
  const [isSubmitting, setIsSubmitting] = useState (false);
  const [didSubmit, setDidSubmit] = useState (false);
  const cartCtx = useContext (CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed (2)}`;
  // const which will show only total amount if we have something in our order
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem (id);
  };

  const cartItemAddHandler = item => {
    // passing new object with old items and new amount with set value 1 - from here will be pass to CartProvider useReducer and do the rest dispatcheAction
    cartCtx.addItem ({...item, amount: 1});
  };

  const orderHandler = () => {
    setIsCheckout (true);
  };
  const submitOrderHandler = async userData => {
    setIsSubmitting (true);
    //userData is from checkout by props.onConfirm
    await fetch (
      'https://appfoodordering-d0212-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify ({
          user: userData,
          orderItems: cartCtx.items,
        }),
      } //strigify convert string value to JSON String using JSON.
    );
    setIsSubmitting (false);
    setDidSubmit (true);
    cartCtx.clearCart ();
  };
  const cartItems = (
    <ul className={classes['cart-items']}>
      {/* adding dynamic items through cartCtx*/}
      {cartCtx.items.map (item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind (null, item.id)}
          //Bind will ensure that we remove id from our cart and this will ensure that function add and remove will be executed
          onAdd={cartItemAddHandler.bind (null, item)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems &&
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>}
    </div>
  );
  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout &&
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = <p>We are sending your order...</p>;
  const didSubmitModalContent = (
    <Fragment>
      <p>We are starting prepare your order! :)</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>

      </div> {' '}
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
