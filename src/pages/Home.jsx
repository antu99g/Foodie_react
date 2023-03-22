import { useEffect, useRef, useState } from "react";
import { Navbar, Cuisine } from "../components";
import { fetchCategories, fetchMealByName, fetchSearchSuggestion } from "../api";
import {addFavourite, removeFavourite} from '../actions';
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/home.module.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegHeart, FaHeart } from "react-icons/fa";

function Home() {
   const [categories, setCategories] = useState([]);

   const [suggestions, setSuggestions] = useState([]);

   const inputRef = useRef();

   const [resultHead, setResultHead] = useState('');
   
   const resultHeadRef = useRef();
   
   const [results, setResults] = useState([]);

   const favourites = useSelector(state => state.favourites);

   const dispatch = useDispatch();


   const navStyle = {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      boxShadow: "0 0 8px 5px rgba(0, 0, 0, 0.9)",
   }


   useEffect(() => {
      fetchCategories().then((response) => setCategories(response));
   }, []);


   const handleSearchSuggestion = async ({target}) => {
      if(target.value === ''){
         setSuggestions([]);
      } else {
         const response = await fetchSearchSuggestion(target.value);
         if(response === null){
            setSuggestions([]);
         } else {
            setSuggestions(response);
         }
      }
   }


   const boldSubstring = (string, substring) => {
      string = string.toLowerCase();
      let normal = string.split(substring);
      if(normal.length > 2){
         let lastStrPart;
         for(let i=1; i<normal.length; i++){
            lastStrPart += normal[i];
         }
         normal = [normal[0], lastStrPart];
      }
      if(normal[0] === ''){
         substring = substring[0].toUpperCase() + substring.substring(1).toLowerCase();
      } else {
         let target = normal[0];
         target = target[0].toUpperCase() + target.substring(1).toLowerCase();
         normal[0] = target;
      }
      return {normal, bold: substring};
   }


   const handleSearchDish = async () => {
      if (inputRef.current.value === ''){
         toast.warn("Please name a dish to search");
      } else {
         const response = await fetchMealByName(inputRef.current.value);
         if(response !== null){
            let header = await inputRef.current.value;
            header = header[0].toUpperCase() + header.substring(1).toLowerCase();
            setResultHead(header);
            setResults(response);       
            setSuggestions([]);
            scroll();
         } else {
            inputRef.current.value = '';
            toast.error("Unable find dish");
         }
      }
   }


   const scroll = async () => {
      let interval = setInterval(function () {
         let targetPos = resultHeadRef.current.getBoundingClientRect().top;
         if (targetPos < 40) {
            clearInterval(interval);
         } else if (targetPos >= 40) {
            window.scrollBy(0, 1);
            targetPos -= 1;
         }
      }, 4);
   };


   const checkVeg = (dish) => {
      const nonVeg = ['Chicken', 'Beef', 'Lamb', 'Seafood', 'Pork', 'Egg'];
      return nonVeg.includes(dish) ? styles.nonVeg : styles.veg;
   }


   return (
      <div>
         <div className={styles.background}>
            <Navbar customStyles={navStyle} />

            <div className={styles.searchContainer}>
               <div className={styles.search}>
                  <input
                     type="text"
                     ref={inputRef}
                     onChange={handleSearchSuggestion}
                     placeholder="Search your Fav meal.."
                  />
                  <button
                     onClick={handleSearchDish}
                     className={styles.searchBtn}
                  >
                     Search
                  </button>

                  {suggestions.length > 0 && (
                     <div className={styles.searchSuggestion} style={{width: inputRef.current.offsetWidth}}>
                        {suggestions.map((dish, i) => {
                           let str = boldSubstring(dish.strMeal, inputRef.current.value);
                           return (
                              <p key={i}>
                                 <Link to={`/dish/${dish.idMeal}`}>
                                    {str.normal[0]}
                                    <span style={{ color: "black" }}>{str.bold}</span>
                                    {str.normal[1]}
                                 </Link>
                              </p>
                           );
                        })}                        
                     </div>
                  )}
               </div>
            </div>
         </div>

         {results.length > 0 && (
            <div>
               <h1 ref={resultHeadRef} className={styles.resultHead}>{resultHead}</h1>
               <div className={styles.searchResult}>
                  {results.map((dish, i) => {
                     return (
                        <div key={i}>
                           {favourites.includes(dish.idMeal) ? (
                              <FaHeart onClick={() => dispatch(removeFavourite(dish.idMeal))} />
                           ) : (
                              <FaRegHeart onClick={() => dispatch(addFavourite(dish.idMeal))} />
                           )}
                           <div><img src={dish.strMealThumb} alt="img"/></div>
                           <p><Link to={`/dish/${dish.idMeal}`}>{dish.strMeal}</Link></p>
                           <small className={checkVeg(dish.strCategory)}>
                              {dish.strCategory}
                           </small>
                        </div>
                     );
                  })}
               </div>
            </div>
         )}

         <Cuisine/>

         <div className={styles.categoryContainer}>
            <h1>Categories</h1>
            <div className={styles.categories}>
               {categories.length > 0 &&categories.map((category, i) => {
                  return (
                     <div key={i}>
                        <img src={category.strCategoryThumb} alt="img"/>
                        <p>{category.strCategory}</p>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
}

export default Home;