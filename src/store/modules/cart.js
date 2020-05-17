import { localStorage } from '../../../utils';

const CART = process.env.GRIDSOME_LOCAL_STORAGE_PREFIX + 'cart';

const updateCartInLocalStorage = () => {
  localStorage.setItem(CART, JSON.stringify(state.cart));
};
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
const actions = {
  addToCart: ({ commit }, item) => {
    commit('ADD_TO_CART', item);
  },
  removeFromCart: ({ commit }, sku) => {
    commit('REMOVE_FROM_CART', sku);
  },
  addOneToCart: ({ commit }, item) => {
    commit('ADD_ONE_TO_CART', item);
  },
  removeOneFromCart: ({ commit }, item) => {
    commit('REMOVE_ONE_FROM_CART', item);
  },
  emptyCart: ({ commit }) => {
    commit('EMPTY_CART');
  },
};

const mutations = {
  ADD_TO_CART: (state, item) => {
    const itemExists = state.cart.find(i => i.sku === item.sku);

    if (itemExists) {
      itemExists.quantity += item.quantity;
    } else {
      state.cart.push(item);
    }

    updateCartInLocalStorage();
  },
  REMOVE_FROM_CART: (state, sku) => {
    state.cart = state.cart.filter(i => i.sku !== sku);
    updateCartInLocalStorage();
  },
  ADD_ONE_TO_CART: (state, item) => {
    let itemExists = state.cart.find(i => i.sku === item.sku);

    if (itemExists) {
      itemExists.quantity += 1;
    } else {
      state.cart.push(item);
    }

    updateCartInLocalStorage();
  },
  REMOVE_ONE_FROM_CART: (state, item) => {
    let itemIndex = state.cart.findIndex(i => i.id === item.id);

    if (!state.cart[itemIndex]) {
      return;
    }

    state.cart[itemIndex].quantity -= 1;

    if (state.cart[itemIndex].quantity < 1) {
      state.cart.splice(itemIndex, 1);
    }

    updateCartInLocalStorage();
  },
  EMPTY_CART: state => {
    state.cart = [];
    updateCartInLocalStorage();
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
