import { CART } from "../../../config";
import { localStorage } from "../../../utils";

const state = {
  cart: localStorage.getItem(CART)
    ? JSON.parse(localStorage.getItem(CART))
    : [],
};

const getters = {
  cart: (state) => state.cart,
  cartCount: (state) => {
    if (!state.cart.length) {
      return 0;
    }

    return (
      state.cart.reduce((accumulator, next) => accumulator + next.quantity, 0) *
      1
    );
  },
  cartTotal: (state) => {
    if (!state.cart.length) {
      return 0;
    }

    return (
      state.cart.reduce(
        (accumulator, next) => accumulator + next.quantity * next.amount,
        0
      ) * 1
    );
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
    state.cart = state.cart.filter((item) => item.sku !== sku);
    localStorage.setItem(CART, JSON.stringify(state.cart));
  },
  addOneToCart: (state, payload) => {
    let itemExists = state.cart.find((item) => item.sku === payload.sku);

    if (itemExists) {
      itemExists.quantity++;
    } else {
      state.cart.push(payload);
    }

    localStorage.setItem(CART, JSON.stringify(state.cart));
  },
  removeOneFromCart: (state, payload) => {
    let index = state.cart.findIndex((item) => item.id === payload.id);
    state.cart[index].quantity
      ? state.cart[index].quantity--
      : state.cart.splice(index, 1);
  },
  clearCart: (state) => {
    state.cart = [];
    localStorage.setItem(CART, JSON.stringify(state.cart));
  },
};

export default {
  state,
  mutations,
  getters,
};
