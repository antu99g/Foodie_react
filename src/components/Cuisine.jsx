import { useEffect, useLayoutEffect, useState } from 'react';
import { searchAllCuisines } from "../api";
import styles from '../styles/cuisine.module.css';

function Cuisine () {
   const [cuisines, setCuisines] = useState([]);

   useLayoutEffect(() => {
      searchAllCuisines().then((response) =>
         setCuisines(response.map((dish) => dish.strArea))
      );
   }, []);

   useEffect(() => {
      
   }, [cuisines]);

   return (
      <div className={styles.container}>
         {/* <h1 className={styles.header}>Cuisine</h1> */}
         
      </div>
   );
}

export default Cuisine;