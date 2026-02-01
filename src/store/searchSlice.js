import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  vehicleType: "",
  features: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateLocation: (state, { payload }) => {
      state.location = payload;
    },
    updateVehicleType: (state, { payload }) => {
      state.vehicleType = payload;
    },
    toggleFeature: (state, { payload }) => {
      const idx = state.features.indexOf(payload);
      if (idx !== -1) {
        state.features.splice(idx, 1);
      } else {
        state.features.push(payload);
      }
    },
    clearSearch: (state) => {
      state.location = "";
      state.vehicleType = "";
      state.features = [];
    },
  },
});

export const { updateLocation, updateVehicleType, toggleFeature, clearSearch } =
  searchSlice.actions;

export default searchSlice.reducer;
