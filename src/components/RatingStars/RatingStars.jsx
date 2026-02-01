import styles from "./RatingStars.module.css";

const RatingStars = ({ rating }) => {
  const starValues = [1, 2, 3, 4, 5];

  return (
    <div className={styles.container}>
      {starValues.map((starNum) => (
        <span
          key={starNum}
          className={starNum <= rating ? styles.filled : styles.empty}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
