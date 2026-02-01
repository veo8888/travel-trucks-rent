import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const { pathname } = useLocation();

  const isActive = (path) => pathname === path;

  return (
    <header className={styles.navbar}>
      <div className="container">
        <div className={styles.navContent}>
          <Link to="/" className={styles.brand}>
            TravelTrucks
          </Link>

          <nav className={styles.navLinks}>
            <Link
              to="/"
              className={`${styles.navItem} ${isActive("/") ? styles.current : ""}`}
            >
              Home
            </Link>
            <Link
              to="/catalog"
              className={`${styles.navItem} ${isActive("/catalog") ? styles.current : ""}`}
            >
              Catalog
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
