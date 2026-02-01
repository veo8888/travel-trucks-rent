import { useDispatch, useSelector } from "react-redux";
import {
  updateLocation,
  updateVehicleType,
  toggleFeature,
} from "../../store/searchSlice";
import { loadVehicles } from "../../store/vehiclesSlice";
import Button from "../ui/Button/Button";
import Icon from "../ui/Icon/Icon";
import styles from "./SearchFilters.module.css";

const featureOptions = [
  { id: "AC", name: "AC", iconName: "wind" },
  { id: "automatic", name: "Automatic", iconName: "diagram" },
  { id: "kitchen", name: "Kitchen", iconName: "cup-hot" },
  { id: "TV", name: "TV", iconName: "tv" },
  { id: "bathroom", name: "Bathroom", iconName: "shower" },
];

const vehicleTypeOptions = [
  { id: "panelTruck", name: "Van", iconName: "bi-grid-1x2" },
  { id: "fullyIntegrated", name: "Fully Integrated", iconName: "bi-grid-2x2" },
  { id: "alcove", name: "Alcove", iconName: "bi-grid-3x3-gap" },
];

const SearchFilters = () => {
  const dispatch = useDispatch();
  const { location, vehicleType, features } = useSelector(
    (state) => state.search
  );

  const handleSearchClick = () => {
    dispatch(loadVehicles());
  };

  const handleLocationChange = (e) => {
    dispatch(updateLocation(e.target.value));
  };

  const handleFeatureClick = (featureId) => {
    dispatch(toggleFeature(featureId));
  };

  const handleVehicleTypeClick = (typeId) => {
    dispatch(updateVehicleType(typeId));
  };

  return (
    <div className={styles.filtersPanel}>
      <section className={styles.filterSection}>
        <h3 className={styles.sectionHeading}>Location</h3>
        <div className={styles.locationField}>
          <Icon name="city" size={20} className={styles.fieldIcon} />
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            placeholder="Kyiv, Ukraine"
            className={styles.locationInput}
          />
        </div>
      </section>

      <div className={styles.separator}>Filters</div>

      <section className={styles.filterSection}>
        <h3 className={styles.sectionHeading}>Vehicle equipment</h3>
        <div className={styles.optionsGrid}>
          {featureOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`${styles.optionBtn} ${
                features.includes(option.id) ? styles.selected : ""
              }`}
              onClick={() => handleFeatureClick(option.id)}
            >
              <Icon name={option.iconName} size={32} />
              <span>{option.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className={styles.filterSection}>
        <h3 className={styles.sectionHeading}>Vehicle type</h3>
        <div className={styles.optionsGrid}>
          {vehicleTypeOptions.map((type) => (
            <button
              key={type.id}
              type="button"
              className={`${styles.optionBtn} ${
                vehicleType === type.id ? styles.selected : ""
              }`}
              onClick={() => handleVehicleTypeClick(type.id)}
            >
              <Icon name={type.iconName} size={32} />
              <span>{type.name}</span>
            </button>
          ))}
        </div>
      </section>

      <div className={styles.searchBtnWrapper}>
        <Button variant="primary" onClick={handleSearchClick}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchFilters;
