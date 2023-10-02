import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload); // mutating state
      // OR state.cart = [...state.cart, action.payload]; // not mutating state
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload); // not mutating state
    },
    increaseItemQty(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      // while we're at it:
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQty(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQty,
  decreaseItemQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getTotalCartQty = (state) =>
  state.cart.cart.reduce((qtySum, item) => qtySum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce(
    (totalPriceSum, item) => totalPriceSum + item.totalPrice,
    0,
  );

export const getCart = (state) => state.cart.cart;

// find out if item already in cart
// by using its quantity
// export const getCurrentItemQuantityById = (id) => (state) =>
//   state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

// ==> this one above hurts my brain, I prefer to do this:
// export const getCurrentItemById = (id) => (state) =>
//   state.cart.cart.find((item) => item.pizzaId === id);
// but we need quantity anyway for other thing

export const getCurrentItemQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity;
