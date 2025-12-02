// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

/*
  Cart shape:
  state.items = [
    { id: <uniqueId>, item: <itemInfoObject>, quantity: <number> },
    ...
  ]

  This reducer is defensive: it accepts payloads that are:
   - an item info object (itemInfo.id)
   - a wrapper object (itemWrapper.card.info.id)
   - or a raw id (number|string)
*/

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const payload = action.payload;

      // Accept payload being:
      // - the itemInfo object (preferred), OR
      // - the wrapper object (card -> info), OR
      // - a raw id (not ideal here)
      const id =
        // direct id on itemInfo (most common when you dispatch itemInfo)
        (payload && typeof payload === "object" && (payload.id ?? payload.itemId)) ??
        // nested wrapper like payload.card.info.id
        (payload && typeof payload === "object" && payload?.card?.info?.id) ??
        // if payload is directly an id (number/string)
        (typeof payload !== "object" ? payload : undefined);

      if (!id && id !== 0) return; // defensive: require an id (allow 0 if that ever occurs)

      // If payload was wrapper, prefer the clean info object for storing item
      // If payload is already the itemInfo, keep it as-is.
      const itemInfo =
        (payload && typeof payload === "object" && (payload?.id || payload?.name))
          ? // payload looks like itemInfo or wrapper with info
            // if wrapper has .card?.info use that, otherwise payload itself
            payload?.card?.info ?? payload
          : undefined;

      const index = state.items.findIndex((it) => it.id === id);

      if (index >= 0) {
        // already exists: increment quantity
        state.items[index].quantity += 1;
      } else {
        // new entry
        state.items.push({
          id,
          item: itemInfo ?? payload, // fallback safe storage
          quantity: 1,
        });
      }
    },

    decreaseItem: (state, action) => {
      const payload = action.payload;

      // Accept either an id or an object
      const id =
        (typeof payload === "object"
          ? payload?.id ?? payload?.itemId ?? payload?.card?.info?.id
          : payload);

      if (!id && id !== 0) return;

      const index = state.items.findIndex((it) => it.id === id);
      if (index >= 0) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1;
        } else {
          // remove if quantity would drop to 0
          state.items.splice(index, 1);
        }
      }
    },

    removeItem: (state, action) => {
      const payload = action.payload;
      const id =
        typeof payload === "object"
          ? payload?.id ?? payload?.itemId ?? payload?.card?.info?.id
          : payload;
      if (!id && id !== 0) return;

      state.items = state.items.filter((it) => it.id !== id);
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, decreaseItem, removeItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
