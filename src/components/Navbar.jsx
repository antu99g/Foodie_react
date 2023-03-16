import { Link } from "react-router-dom";
import styles from '../styles/navbar.module.css';

function Navbar({ customStyles }) {
   return (
      <nav className={styles.nav} style={customStyles}>
         <h2 className={styles.logo}>foodie</h2>
         <Link to="/" id="homePageUrl" className={styles.link}>
            Home
         </Link>
         <Link to="/favourites" id="favouriteUrl" className={styles.link}>
            Favourites
         </Link>
      </nav>
   );
}

export default Navbar;