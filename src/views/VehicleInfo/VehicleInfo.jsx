import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loadVehicleById,
  resetVehicleInfo,
} from "../../store/vehicleInfoSlice";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import Icon from "../../components/ui/Icon/Icon";
import CustomerFeedback from "../../components/CustomerFeedback/CustomerFeedback";
import ReservationForm from "../../components/ReservationForm/ReservationForm";
import styles from "./VehicleInfo.module.css";

const VehicleInfo = () => {
  const { id: vehicleId } = useParams();
  const dispatch = useDispatch();
  const { data: vehicleData, loading, error } = useSelector(
    (state) => state.vehicleInfo
  );
  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    dispatch(loadVehicleById(vehicleId));
    return () => {
      dispatch(resetVehicleInfo());
    };
  }, [dispatch, vehicleId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  if (!vehicleData) return null;

  const {
    name,
    price,
    location,
    description,
    gallery,
    form,
    length,
    width,
    height,
    tank,
    consumption,
    transmission,
    engine,
    AC,
    bathroom,
    kitchen,
    TV,
    radio,
    refrigerator,
    microwave,
    gas,
    water,
    reviews,
    rating,
  } = vehicleData;

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
  if (radio) featureBadges.push({ text: "Radio", iconName: "radio" });
  if (TV) featureBadges.push({ text: "TV", iconName: "tv" });
  if (bathroom) featureBadges.push({ text: "Bathroom", iconName: "shower" });
  if (refrigerator) featureBadges.push({ text: "Refrigerator", iconName: "fridge" });
  if (microwave) featureBadges.push({ text: "Microwave", iconName: "microwave" });
  if (gas) featureBadges.push({ text: "Gas", iconName: "gas-stove" });
  if (water) featureBadges.push({ text: "Water", iconName: "ion-water" });

  const formattedPrice = Number(price).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="container">
      <div className={styles.infoPage}>
        <section className={styles.topSection}>
          <h1 className={styles.vehicleName}>{name}</h1>

          <div className={styles.metaRow}>
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

          <p className={styles.priceTag}>&euro;{formattedPrice}</p>

          <div className={styles.imageGallery}>
            {gallery?.map((img, idx) => (
              <img
                key={idx}
                src={img.thumb}
                alt={`${name}-${idx}`}
                className={styles.galleryImg}
              />
            ))}
          </div>

          <p className={styles.vehicleDescription}>{description}</p>
        </section>

        <div className={styles.mainColumn}>
          <div className={styles.tabsContainer}>
            <button
              onClick={() => setActiveTab("features")}
              className={`${styles.tabBtn} ${activeTab === "features" ? styles.activeTab : ""}`}
            >
              Features
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`${styles.tabBtn} ${activeTab === "reviews" ? styles.activeTab : ""}`}
            >
              Reviews
            </button>
          </div>

          <div className={styles.tabPanel}>
            {activeTab === "features" && (
              <div className={styles.featuresSection}>
                <div className={styles.badgeList}>
                  {featureBadges.map((badge, idx) => (
                    <div key={idx} className={styles.featureBadge}>
                      <Icon
                        name={badge.iconName}
                        size={20}
                        className={styles.badgeIcon}
                      />
                      <span className={styles.badgeText}>{badge.text}</span>
                    </div>
                  ))}
                </div>

                <h3 className={styles.specsHeading}>Vehicle details</h3>
                <div className={styles.specsTable}>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Form</span>
                    <span className={styles.specValue}>{form}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Length</span>
                    <span className={styles.specValue}>{length}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Width</span>
                    <span className={styles.specValue}>{width}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Height</span>
                    <span className={styles.specValue}>{height}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Tank</span>
                    <span className={styles.specValue}>{tank}</span>
                  </div>
                  <div className={styles.specRow}>
                    <span className={styles.specLabel}>Consumption</span>
                    <span className={styles.specValue}>{consumption}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <CustomerFeedback feedbackList={reviews} />
            )}
          </div>
        </div>

        <aside className={styles.sideColumn}>
          <ReservationForm />
        </aside>
      </div>
    </div>
  );
};

export default VehicleInfo;
