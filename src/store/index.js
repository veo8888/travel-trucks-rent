import { configureStore } from "@reduxjs/toolkit";
import vehiclesReducer from "./vehiclesSlice";
import searchReducer from "./searchSlice";
import wishlistReducer from "./wishlistSlice";
import vehicleInfoReducer from "./vehicleInfoSlice";

const store = configureStore({
  reducer: {
    vehicles: vehiclesReducer,
    search: searchReducer,
    wishlist: wishlistReducer,
    vehicleInfo: vehicleInfoReducer,
  },
});

export default store;
