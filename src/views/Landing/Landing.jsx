import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button/Button";
import typography from "../../components/ui/Typography/Typography.module.css";
import styles from "./Landing.module.css";

const Landing = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/catalog");
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={typography.h1}>Campers of your dreams</h1>
        <h2 className={typography.h2}>
          You can find everything you want in our catalog
        </h2>
        <Button variant="primary" onClick={handleExploreClick}>
          View Now
        </Button>
      </div>
    </section>
  );
};

export default Landing;
