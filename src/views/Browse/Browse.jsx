import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadVehicles } from "../../store/vehiclesSlice";
import VehicleCard from "../../components/VehicleCard/VehicleCard";
import SearchFilters from "../../components/SearchFilters/SearchFilters";
import Spinner from "../../components/Spinner/Spinner";
import Button from "../../components/ui/Button/Button";
import styles from "./Browse.module.css";

const ITEMS_PER_PAGE = 4;

const Browse = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.vehicles);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    dispatch(loadVehicles());
  }, [dispatch]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const displayedVehicles = list.slice(0, visibleCount);
  const hasMore = visibleCount < list.length;

  return (
    <div className="container">
      <div className={styles.pageLayout}>
        <aside className={styles.sidebar}>
          <SearchFilters />
        </aside>

        <main className={styles.content}>
          <h1 className={styles.pageTitle}>Catalog</h1>

          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>Error: {error}</p>}

          {!loading && !error && (
            <>
              {displayedVehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}

              {hasMore && (
                <Button
                  variant="secondary"
                  onClick={handleShowMore}
                  disabled={loading}
                >
                  {loading ? <Spinner /> : "Load more"}
                </Button>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Browse;
