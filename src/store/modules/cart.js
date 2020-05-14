import { CART } from "../../../config";
import { localStorage } from "../../../utils";

const state = {
  cart: JSON.parse(localStorage.getItem(CART)) || [],
};

const getters = {
  cart: (state) => state.cart,
  cartCount: (state) => {
    if (!state.cart.length) {
      return 0;
    }

    return state.cart.reduce((ac, next) => ac + next.quantity, 0);
  },
  cartTotal: (state) => {
    if (!state.cart.length) {
      return 0;
    }

    return state.cart.reduce((ac, next) => ac + next.price, 0);
  },
};

const mutations = {
  addToCart: (state, payload) => {
    const itemExists = state.cart.find((item) => item.sku === payload.sku);

    if (itemExists) {
      itemExists.quantity += payload.quantity;
    } else {
      state.cart.push(payload);
    }

    localStorage.setItem(CART, JSON.stringify(state.cart));
  },
  removeFromCart: (state, sku) => {
    const updatedCart = state.cart.filter((item) => item.sku !== sku);
    state.cart = updatedCart;
    localStorage.setItem(CART, JSON.stringify(state.cart));
  },
  clearCart: (state) => {
    state.cart = [];
  },
};

export default {
  state,
  mutations,
  getters,
};
