import RatingStars from "../RatingStars/RatingStars";
import styles from "./CustomerFeedback.module.css";

const CustomerFeedback = ({ feedbackList }) => {
  if (!feedbackList || feedbackList.length === 0) {
    return <p>No reviews yet.</p>;
  }

  return (
    <div className={styles.feedbackContainer}>
      {feedbackList.map((feedback, idx) => (
        <article key={idx} className={styles.feedbackItem}>
          <header className={styles.feedbackHeader}>
            <div className={styles.userAvatar}>
              {feedback.reviewer_name[0]}
            </div>
            <div>
              <p className={styles.userName}>{feedback.reviewer_name}</p>
              <RatingStars rating={feedback.reviewer_rating} />
            </div>
          </header>
          <p className={styles.feedbackText}>{feedback.comment}</p>
        </article>
      ))}
    </div>
  );
};

export default CustomerFeedback;
