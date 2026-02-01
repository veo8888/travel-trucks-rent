import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../api/httpClient";

export const loadVehicles = createAsyncThunk(
  "vehicles/loadVehicles",
  async (_, { getState, rejectWithValue }) => {
    const { search } = getState();
    const { location, vehicleType, features } = search;

    const params = [];
    if (location) params.push(`location=${encodeURIComponent(location)}`);
    if (vehicleType) params.push(`form=${encodeURIComponent(vehicleType)}`);
    features.forEach((feat) => params.push(`${feat}=true`));

    const queryString = params.length ? `?${params.join("&")}` : "";

    try {
      const { data } = await httpClient.get(`/campers${queryString}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadVehicles.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.list = payload.items || [];
      })
      .addCase(loadVehicles.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default vehiclesSlice.reducer;
