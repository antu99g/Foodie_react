import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite, removeFavourite } from "../actions";
import { Navbar } from "../components";
import { fetchMealById } from "../api";
import { Link } from "react-router-dom";
import { FaRegTimesCircle, FaHeart, FaRegHeart } from "react-icons/fa";
import styles from "../styles/favourites.module.css";

function Favourites() {
   const favourites = useSelector((state) => state.favourites);

   const dispatch = useDispatch();

   const [dishes, setDishes] = useState([]);
   
   const navStyle = {backgroundColor: "rgb(26, 25, 25)"};


   useLayoutEffect(() => {
      setDishes([]);
      (async () => {
         for(let id of favourites){
            const response = await fetchMealById(id);
            setDishes((dishes) => [...dishes, response]);
         };
      })();
   }, [favourites]);


   const checkVeg = (dish) => {
      const nonVeg = ["Chicken", "Beef", "Lamb", "Seafood", "Pork", "Egg"];
      return nonVeg.includes(dish) ? styles.nonVeg : styles.veg;
   };


   return (
      <div>
         <Navbar customStyles={navStyle} />

         {favourites.length > 0 ? (
            <>
               <h1 className={styles.favouritesHeader}>Favourite Meals</h1>
               
               <div className={styles.favouritesContainer}>
                  {dishes.map((dish, i) => {
                     return (
                        <div className={styles.eachDish} key={i}>
                           {favourites.includes(dish.idMeal) ? (
                              <FaHeart onClick={() => dispatch(removeFavourite(dish.idMeal))} />
                           ) : (
                              <FaRegHeart onClick={() => dispatch(addFavourite(dish.idMeal))} />
                           )}

                           <div><img src={dish.strMealThumb} alt='img'/></div>

                           <span>
                              <p><Link to={`/dish/${dish.idMeal}`}>{dish.strMeal}</Link></p>
                              <p>Category: <small className={checkVeg(dish.strCategory)}>{dish.strCategory}</small></p>
                              <p>Origin: {dish.strArea}</p>
                           </span>
                        </div>
                     );
                  })}
               </div>
            </>
         ) : (
            <div className={styles.noFavourites}>
               <FaRegTimesCircle />
               <h1>Nothing here yet...</h1>
            </div>
         )}
      </div>
   );
}

export default Favourites;