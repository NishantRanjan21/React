// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const payload = action.payload;

      const id =
        
        (payload && typeof payload === "object" && (payload.id ?? payload.itemId)) ??
        
        (payload && typeof payload === "object" && payload?.card?.info?.id) ??
       
        (typeof payload !== "object" ? payload : undefined);

      if (!id && id !== 0) return; 

      const itemInfo =
        (payload && typeof payload === "object" && (payload?.id || payload?.name))
          ? 
            payload?.card?.info ?? payload
          : undefined;

      const index = state.items.findIndex((it) => it.id === id);

      if (index >= 0) {
        
        state.items[index].quantity += 1;
      } else {
        
        state.items.push({
          id,
          item: itemInfo ?? payload,
          quantity: 1,
        });
      }
    },

    decreaseItem: (state, action) => {
      const payload = action.payload;

      
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
