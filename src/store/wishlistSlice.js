import { createSlice } from "@reduxjs/toolkit";

const STORAGE_KEY = "wishlist";

const getStoredWishlist = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const persistWishlist = (items) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Silent fail
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    ids: getStoredWishlist(),
  },
  reducers: {
    toggleWishlistItem: (state, { payload: vehicleId }) => {
      const idx = state.ids.indexOf(vehicleId);
      if (idx !== -1) {
        state.ids.splice(idx, 1);
      } else {
        state.ids.push(vehicleId);
      }
      persistWishlist(state.ids);
    },
  },
});

export const { toggleWishlistItem } = wishlistSlice.actions;
export default wishlistSlice.reducer;
