import { useContext } from 'react';
import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../../Store/Cart-context';

const MealItem = props => {
const cartCtx = useContext(CartContext)
  const price = `$${props.price.toFixed (2)}`;
  
  const addToCartHandler = (amount) => {
      cartCtx.addItem ({
      
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
      })
  }
  
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        {/* name of meal through props)*/}
        <div className={classes.description}>{props.description}</div>
        {/* description of meal through props*/}
        <div className={classes.price}>{price}</div>
        {/* price of meal through props with $ sign and round to 2*/}
      </div>
      <div><MealItemForm  onAddToCart = {addToCartHandler}/></div>
    </li>
  );
};

export default MealItem;
