import {useContext, useEffect, useState} from 'react';
import CartContext from '../../Store/Cart-context';
import CartIcon from '../Cart/CartIcon';

import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
  const [btnIsHighLighted, setBtnIsHighLighted] = useState (false);
  const cartCtx = useContext (CartContext);

  const {items} = cartCtx;
  // use object destructuring to pull out items from cartCtx

  const numberOfCartItems = items.reduce ((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  //Add animation to the button when we add some products.

  const btnClasses = `${classes.button} ${btnIsHighLighted ? classes.bump : ''}`;

  //Adding dynamic animation by using useEffect
  useEffect (
    () => {
      if (items.length === 0) {
        return;
      }
      setBtnIsHighLighted (true);
      
      // we must remove the class because  we wont use animation when we add next items. If we don remove this 'bump' class we will have only bump once. To remove we use setTimeout
      const timer = setTimeout (() => {
        setBtnIsHighLighted (false);
      }, 300);
      // 300 because it is duration of my animation
      
      return ()=> {
      // we want to clear old setTimeout and get new setTimeout - definitely we must use clearTimeout
      clearTimeout (timer)
      }
      
    },
    [items]
  );

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}> {numberOfCartItems} </span>
    </button>
  );
};

export default HeaderCartButton;
