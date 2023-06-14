import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchMealById } from "../api";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../store/slices/favoriteSlice";
import { Navbar } from "../components";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import styles from "../styles/dish.module.css";

function Dish() {
  const location = useLocation();
  const path = location.pathname.split("/");
  const id = path[path.length - 1];

  const [dish, setDish] = useState({});

  const [instructions, setInstructions] = useState([]);

  const favorites = useSelector((state) => state.favorites);

  const dispatch = useDispatch();

  const navStyle = { backgroundColor: "rgb(26, 25, 25)" };

  useEffect(() => {
    fetchMealById(id).then((response) => {
      setDish(response);
      let steps = response.strInstructions.split("\r\n");
      steps = steps.filter((step) => step !== "");
      setInstructions(steps);
    });
  }, [id]);

  const checkVeg = (dish) => {
    const nonVeg = ["Chicken", "Beef", "Lamb", "Seafood", "Pork", "Egg"];
    return nonVeg.includes(dish) ? styles.nonVeg : styles.veg;
  };

  return (
    <div className={styles.detailContainer}>
      <Navbar customStyles={navStyle} />

      <h1>{dish.strMeal}</h1>

      <div>
        {favorites.includes(dish.idMeal) ? (
          <FaHeart onClick={() => dispatch(removeFavorite(dish.idMeal))} />
        ) : (
          <FaRegHeart onClick={() => dispatch(addFavorite(dish.idMeal))} />
        )}

        <span className={styles.details}>
          <img src={dish.strMealThumb} alt="img" />
          <span>
            <p>Origin : {dish.strArea}</p>
            <p>
              Category :{" "}
              <small className={checkVeg(dish.strCategory)}>
                {dish.strCategory}
              </small>
            </p>
            <p>
              Check Preperation :<a href={dish.strYoutube}>{dish.strYoutube}</a>
            </p>
          </span>
        </span>
      </div>

      <h2>Instructions :</h2>
      {instructions.length > 0 && (
        <ul>
          {instructions.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dish;
