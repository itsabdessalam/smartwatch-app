import AuthService from '../../../services/AuthService';
import { localStorage } from '../../../utils';

const AUTH_TOKEN = process.env.GRIDSOME_LOCAL_STORAGE_PREFIX + 'auth_token';
const USER = process.env.GRIDSOME_LOCAL_STORAGE_PREFIX + 'user';

const state = {
  token: localStorage.getItem(AUTH_TOKEN) || '',
  user: localStorage.getItem(USER)
    ? JSON.parse(localStorage.getItem(USER))
    : {},
  status: '',
  hasLoadedOnce: false,
};

const setUser = data => {
  localStorage.setItem(AUTH_TOKEN, data.token);
  localStorage.setItem(USER, JSON.stringify(data.user));
};

const removeUser = () => {
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(USER);
};

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,
  token: state => state.token,
  user: state => state.user,
};

const actions = {
  login: ({ commit }, user) => {
    return new Promise((resolve, reject) => {
      commit('SET_AUTH_LOADING', 'loading');
      AuthService.login(user)
        .then(response => {
          const { data, error } = response.data;

          if (error) {
            throw new Error(error.message);
          }

          setTimeout(() => {
            commit('SET_AUTH_SUCCESS', data);
            resolve(data);
          }, 500);
        })
        .catch(error => {
          commit('SET_AUTH_ERROR', error);
          reject(error);
        });
    });
  },
  register: ({ commit }, user) => {
    return new Promise((resolve, reject) => {
      commit('SET_AUTH_LOADING', 'loading');
      AuthService.register(user)
        .then(response => {
          const { data, error } = response.data;

          if (error) {
            throw new Error(error.message);
          }

          setTimeout(() => {
            commit('SET_AUTH_SUCCESS', data);
            resolve(data);
          }, 500);
        })
        .catch(error => {
          commit('SET_AUTH_ERROR', error);
          reject(error);
        });
    });
  },
  logout: ({ commit }) => {
    return new Promise(resolve => {
      commit('SET_AUTH_LOGOUT');
      resolve();
    });
  },
};

const mutations = {
  SET_AUTH_LOADING: (state, status) => {
    state.status = status;
  },
  SET_AUTH_SUCCESS: (state, data) => {
    state.status = 'success';
    state.token = data.token;
    state.user = data.user;
    state.hasLoadedOnce = true;

    setUser({
      token: data.token,
      user: data.user,
    });
  },
  SET_AUTH_ERROR: state => {
    state.status = 'error';
    state.hasLoadedOnce = true;
    removeUser();
  },
  SET_AUTH_LOGOUT: state => {
    state.token = '';
    removeUser();
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
