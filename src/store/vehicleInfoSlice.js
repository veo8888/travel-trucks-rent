import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../api/httpClient";

export const loadVehicleById = createAsyncThunk(
  "vehicleInfo/loadVehicleById",
  async (vehicleId, { rejectWithValue }) => {
    try {
      const { data } = await httpClient.get(`/campers/${vehicleId}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const vehicleInfoSlice = createSlice({
  name: "vehicleInfo",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetVehicleInfo: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadVehicleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadVehicleById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(loadVehicleById.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { resetVehicleInfo } = vehicleInfoSlice.actions;
export default vehicleInfoSlice.reducer;
