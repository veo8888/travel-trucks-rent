import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlistItem } from "../../store/wishlistSlice";
import { FaHeart, FaRegHeart, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import Button from "../ui/Button/Button";
import Icon from "../ui/Icon/Icon";
import styles from "./VehicleCard.module.css";

const VehicleCard = ({ vehicle }) => {
  const {
    id,
    name,
    price,
    location,
    description,
    gallery,
    rating,
    reviews,
    AC,
    bathroom,
    kitchen,
    TV,
    transmission,
    engine,
  } = vehicle;

  const dispatch = useDispatch();
  const wishlistIds = useSelector((state) => state.wishlist.ids);
  const isInWishlist = wishlistIds.includes(id);

  const featureBadges = [];

  if (transmission === "automatic") {
    featureBadges.push({ text: "Automatic", iconName: "diagram" });
  }
  if (engine === "petrol" || engine === "diesel") {
    featureBadges.push({
      text: engine === "petrol" ? "Petrol" : "Diesel",
      iconName: "fuel-pump",
    });
  }
  if (kitchen) featureBadges.push({ text: "Kitchen", iconName: "cup-hot" });
  if (AC) featureBadges.push({ text: "AC", iconName: "wind" });
  if (bathroom) featureBadges.push({ text: "Bathroom", iconName: "shower" });
  if (TV) featureBadges.push({ text: "TV", iconName: "tv" });

  const formattedPrice = Number(price).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const handleWishlistClick = () => dispatch(toggleWishlistItem(id));

  return (
    <article className={styles.card}>
      <img
        src={gallery?.[0]?.thumb || "/fallback.jpg"}
        alt={name}
        className={styles.thumbnail}
      />

      <div className={styles.body}>
        <header className={styles.cardHeader}>
          <h2 className={styles.name}>{name}</h2>
          <div className={styles.priceSection}>
            <span className={styles.priceValue}>&euro;{formattedPrice}</span>
            <button
              type="button"
              className={`${styles.wishlistBtn} ${isInWishlist ? styles.active : ""}`}
              onClick={handleWishlistClick}
              aria-label="Toggle wishlist"
            >
              {isInWishlist ? (
                <FaHeart className={styles.heartFilled} />
              ) : (
                <FaRegHeart />
              )}
            </button>
          </div>
        </header>

        <div className={styles.meta}>
          <div className={styles.ratingBlock}>
            <FaStar className={styles.starIcon} />
            <span className={styles.ratingValue}>
              {rating}({reviews?.length || 0} Reviews)
            </span>
          </div>
          <div className={styles.locationBlock}>
            <FaMapMarkerAlt className={styles.pinIcon} />
            <span>{location}</span>
          </div>
        </div>

        <p className={styles.shortDescription}>{description}</p>

        <div className={styles.featureList}>
          {featureBadges.map((badge, idx) => (
            <div key={idx} className={styles.featureTag}>
              <Icon name={badge.iconName} size={20} />
              <span>{badge.text}</span>
            </div>
          ))}
        </div>

        <Link to={`/catalog/${id}`} target="_blank" className={styles.link}>
          <Button variant="primary">Show more</Button>
        </Link>
      </div>
    </article>
  );
};

export default VehicleCard;
