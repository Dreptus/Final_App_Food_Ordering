import {useEffect, useState} from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState ([]);
  const [isLoading, setIsLoading] = useState (true);
  const [httpError, setHttpError] = useState ();

  useEffect (() => {
    const fetchMeals = async () => {
      const response = await fetch (
        'https://appfoodordering-d0212-default-rtdb.firebaseio.com/meals.json'
      );

      if (!response.ok) {
        throw new Error ('There is a problem with database!');
      }

      const responseData = await response.json (); // responseData is an object so we have to transform for an array
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push ({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals (loadedMeals);
      setIsLoading (false);
    };
    // W e cannot use this try method because fetchMeals is a async function and an error in promis will be rejected. 
    //We could use separate function for this with "await" but better solution will be use catch() method.
    // try {
    //   fetchMeals ();
    // } catch (error) {
    //   setIsLoading (false);
    //   setHttpError (error.message);
    // }
    
    fetchMeals ().catch (error => { // that's the traditional method in promis to handeling an error.
      setIsLoading (false);
      setHttpError (error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes['meals-loading']}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes['meals-error']}>
        <p> {httpError} </p>
      </section>
    );
  }

  //Transform array ofJS object to an array of JSX object
  const mealsList = meals.map (meal => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
