import { localStorage } from '../../../utils';

const CART = process.env.GRIDSOME_LOCAL_STORAGE_PREFIX + 'cart';

const state = {
  cart: localStorage.getItem(CART)
    ? JSON.parse(localStorage.getItem(CART))
    : [],
};

const getters = {
  cart: state => state.cart,
  cartCount: state => {
    if (!state.cart.length) {
      return 0;
    }

    return (
      state.cart.reduce((accumulator, next) => accumulator + next.quantity, 0) *
      1
    );
  },
  cartTotal: state => {
    if (!state.cart.length) {
      return 0;
    }

    return (
      state.cart.reduce(
        (accumulator, next) => accumulator + next.quantity * next.amount,
        0,
      ) * 1
    );
  },
};
const actions = {};

const mutations = {
  addToCart: (state, payload) => {
    const itemExists = state.cart.find(item => item.sku === payload.sku);

    if (itemExists) {
      itemExists.quantity += payload.quantity;
    } else {
      state.cart.push(payload);
    }

    localStorage.setItem(CART, JSON.stringify(state.cart));
  },
  removeFromCart: (state, sku) => {
    state.cart = state.cart.filter(item => item.sku !== sku);
    localStorage.setItem(CART, JSON.stringify(state.cart));
  },
  addOneToCart: (state, payload) => {
    let itemExists = state.cart.find(item => item.sku === payload.sku);

    if (itemExists) {
      itemExists.quantity += 1;
    } else {
      state.cart.push(payload);
    }

    localStorage.setItem(CART, JSON.stringify(state.cart));
  },
  removeOneFromCart: (state, payload) => {
    let itemIndex = state.cart.findIndex(item => item.id === payload.id);

    state.cart[itemIndex].quantity -= 1;

    if (state.cart[itemIndex].quantity < 1) {
      state.cart.splice(itemIndex, 1);
    }

    localStorage.setItem(CART, JSON.stringify(state.cart));
  },
  clearCart: state => {
    state.cart = [];
    localStorage.setItem(CART, JSON.stringify(state.cart));
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
