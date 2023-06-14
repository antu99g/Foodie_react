import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/slices/favoriteSlice";
import { Navbar } from "../components";
import { fetchMealById, fetchMealByArea, fetchMealByCategory } from "../api";
import { Link, useLocation } from "react-router-dom";
import { FaRegTimesCircle, FaHeart, FaRegHeart } from "react-icons/fa";
import styles from "../styles/list.module.css";

function List({ page }) {
  const location = useLocation();
  const path = location.pathname.split("/");
  const pageHeader = path[path.length - 1];

  const favorites = useSelector((state) => state.favorites);

  const dispatch = useDispatch();

  const [dishes, setDishes] = useState([]);

  const navStyle = { backgroundColor: "rgb(26, 25, 25)" };

  const fetchFavourites = async () => {
    for (let id of favorites) {
      const response = await fetchMealById(id);
      setDishes((dishes) => [...dishes, response]);
    }
  };

  const fetchWithArea = async () => {
    const filteredDishes = await fetchMealByArea(pageHeader);
    setDishes(() => filteredDishes);
  };

  const fetchWithCategory = async () => {
    const filteredDishes = await fetchMealByCategory(pageHeader);
    setDishes(() => filteredDishes);
  };

  useLayoutEffect(() => {
    if (page === "favorites") {
      if (favorites.length > 0) {
        setDishes([]);
        fetchFavourites();
      }
    } else if (page === "area") {
      fetchWithArea();
    } else if (page === "category") {
      fetchWithCategory();
    }
  }, [favorites, page]);

  const checkVeg = (dish) => {
    const nonVeg = ["Chicken", "Beef", "Lamb", "Seafood", "Pork", "Egg"];
    return nonVeg.includes(dish) ? styles.nonVeg : styles.veg;
  };

  return (
    <div>
      <Navbar customStyles={navStyle} />

      {dishes.length < 1 ? (
        <div className={styles.noFavorites}>
          <FaRegTimesCircle />
          <h1>Nothing here yet...</h1>
        </div>
      ) : (
        <>
          <h1 className={styles.favoritesHeader}>
            {page === "favorites" ? "Favorite Meals" : pageHeader}
          </h1>

          <div className={styles.favoritesContainer}>
            {dishes &&
              dishes.map((dish, i) => {
                return (
                  <div className={styles.eachDish} key={i}>
                    {favorites.includes(dish.idMeal) ? (
                      <FaHeart
                        onClick={() => dispatch(removeFavorite(dish.idMeal))}
                      />
                    ) : (
                      <FaRegHeart
                        onClick={() => dispatch(addFavorite(dish.idMeal))}
                      />
                    )}

                    <div>
                      <img src={dish.strMealThumb} alt="img" />
                    </div>

                    <span>
                      <p>
                        <Link to={`/dish/${dish.idMeal}`}>{dish.strMeal}</Link>
                      </p>
                      {page !== "area" && (
                        <p>
                          Category:{" "}
                          <small
                            className={checkVeg(dish.strCategory || pageHeader)}
                          >
                            {dish.strCategory || pageHeader}
                          </small>
                        </p>
                      )}

                      {page !== "category" && (
                        <p>Origin: {dish.strArea || pageHeader}</p>
                      )}
                    </span>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}

export default List;
