import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { fetchAllCuisines, fetchCuisineBackground } from "../api";
import styles from "../styles/cuisine.module.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Cuisine() {
  const [cuisines, setCuisines] = useState([]);

  const [cuisineBg, setCuisineBg] = useState({});

  const [slide, setSlide] = useState(true);

  const sliderRef = useRef();

  const redirect = useNavigate();

  useLayoutEffect(() => {
    fetchAllCuisines().then((response) => {
      setCuisines(() => response);
    });
  }, []);

  useEffect(() => {
    (async () => {
      await Promise.all(
        cuisines.map((area) => {
          fetchCuisineBackground(area).then((response) => {
            setCuisineBg((bg) => {
              return { ...bg, ...response };
            });
          });
        })
      );
    })();
  }, [cuisines]);

  useEffect(() => {
    let slider = sliderRef.current;
    if (cuisines.length > 0) {
      const slideLength = slider.children[1].offsetWidth;

      const interval = setInterval(() => {
        if (slide) {
          const sliderEnd =
            slider.children[slider.children.length - 1].offsetLeft;
          if (sliderEnd < -(slider.offsetLeft - 900)) {
            slider.style.left = "0";
          } else {
            let newLeft = slider.offsetLeft - slideLength * 1.5;
            slider.style.left = `${newLeft}px`;
          }
        }
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [cuisines, slide]);

  const scrollTo = (dir) => {
    let slider = sliderRef.current;
    const slideLength = slider.children[1].offsetWidth;
    if (dir === "left") {
      let newLeft = slider.offsetLeft + slideLength * 1.5;
      slider.style.left = `${newLeft}px`;
    } else if (dir === "right") {
      let newLeft = slider.offsetLeft - slideLength * 1.5;
      slider.style.left = `${newLeft}px`;
    }
  };

  return (
    <div className={styles.container}>
      <FaAngleLeft
        onClick={() => scrollTo("left")}
        onMouseEnter={() => setSlide(false)}
        onMouseLeave={() => setSlide(true)}
      />
      <FaAngleRight
        onClick={() => scrollTo("right")}
        onMouseEnter={() => setSlide(false)}
        onMouseLeave={() => setSlide(true)}
      />

      {cuisines && cuisines.length > 0 && (
        <div
          ref={sliderRef}
          onMouseEnter={() => setSlide(false)}
          onMouseLeave={() => setSlide(true)}
        >
          {cuisines.map((cuisine, i) => {
            return (
              <span
                className={styles.cuisine}
                style={{ backgroundImage: `url(${cuisineBg[cuisine]})` }}
                onClick={() => {
                  redirect(`/area/${cuisine}`);
                }}
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
