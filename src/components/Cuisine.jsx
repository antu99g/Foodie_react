import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { fetchAllCuisines, fetchCuisineBackground } from "../api";
import styles from '../styles/cuisine.module.css';

function Cuisine () {
   const [cuisines, setCuisines] = useState([]);

   // const [cuisineBg, setCuisineBg] = useState([]);

   const [slide, setSlide] = useState(true);

   const sliderRef = useRef();

   useLayoutEffect(() => {
      fetchAllCuisines().then((response) => {
         setCuisines((cuisines) => response);
         // carousal(true);
      });
      // (async () => {
      //    cuisines.forEach((area) => {
      //       fetchCuisineBackground(area).then((response) => setCuisineBg((bg) => [...bg, response]));
      //    });
      // })();
   }, []);


   // useEffect(() => {
   //    console.log("timer started");
   //    let card = document.getElementById("ppp");
   //    const timer = setInterval(() => {
   //       let left = sliderRef.current.offsetLeft;
   //       // let newLeft = left + card.offsetWidth;
   //       console.log(left, card);
   //       sliderRef.current.style.left = `${left+30}px`;
   //    }, 3000);
   //    if (!slide) {
   //       console.log("clear interval");
   //       clearInterval(timer);
   //    }
   // }, []);


   const bgImg = (cuisine) => {
      fetchCuisineBackground(cuisine).then((res) => {return {backgroundImage: `url(${res[cuisine]})`}});
   }

   

   return (
      <div className={styles.container}>
         {/* <h1 className={styles.header}>Cuisine</h1> */}
         {cuisines && cuisines.length > 0 && (
            <div ref={sliderRef}>
               {cuisines.map((cuisine, i) => {
                  return (
                     <span
                        id={i === 1 ? "ppp" : "p"}
                        className={`${styles.cuisine}`}
                        onMouseEnter={() => setSlide(false)}
                        onMouseLeave={() => setSlide(true)}
                        key={i}
                     >
                        {cuisine}
                     </span>
                  );
               })}
            </div>
         )}
      </div>
   );
}

export default Cuisine;