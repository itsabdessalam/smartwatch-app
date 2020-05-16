import AuthService from "../../../services/AuthService";
import { localStorage } from "../../../utils";

const LOCAL_STORAGE_PREFIX = process.env.GRIDSOME_LOCAL_STORAGE_PREFIX;
const AUTH_TOKEN = process.env.GRIDSOME_LOCAL_STORAGE_PREFIX + "auth_token";
const CURR_USER = process.env.GRIDSOME_LOCAL_STORAGE_PREFIX + "curr_user";

const state = {
  token: localStorage.getItem(AUTH_TOKEN) || "",
  user: localStorage.getItem(CURR_USER)
    ? JSON.parse(localStorage.getItem(CURR_USER))
    : {},
  status: "",
  hasLoadedOnce: false,
};

const setUser = (data) => {
  localStorage.setItem(AUTH_TOKEN, data.token);
  localStorage.setItem(CURR_USER, JSON.stringify(data.user));

  return data;
};

const removeUser = () => {
  localStorage.removeItem(AUTH_TOKEN);
  localStorage.removeItem(CURR_USER);
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  authStatus: (state) => state.status,
  token: (state) => state.token,
  user: (state) => state.user,
};

const actions = {
  login: ({ commit }, user) => {
    return new Promise((resolve, reject) => {
      commit("AUTH_LOADING");
      AuthService.login(user)
        .then((response) => {
          const { data, error } = response.data;

          if (error) {
            throw new Error(error.message);
          }

          setTimeout(() => {
            commit("AUTH_SUCCESS", setUser(data));
            resolve(data);
          }, 500);
        })
        .catch((error) => {
          commit("AUTH_ERROR", error);
          localStorage.removeItem(AUTH_TOKEN);
          localStorage.removeItem(CURR_USER);
          reject(error);
        });
    });
  },
  register: ({ commit }, user) => {
    return new Promise((resolve, reject) => {
      commit("AUTH_LOADING");
      AuthService.register(user)
        .then((response) => {
          const { data, error } = response.data;

          if (error) {
            throw new Error(error.message);
          }

          setTimeout(() => {
            commit("AUTH_SUCCESS", setUser(data));
            resolve(data);
          }, 500);
        })
        .catch((error) => {
          commit("AUTH_ERROR", error);
          localStorage.removeItem(AUTH_TOKEN);
          localStorage.removeItem(CURR_USER);
          reject(error);
        });
    });
  },
  logout: ({ commit }) => {
    return new Promise((resolve) => {
      commit("AUTH_LOGOUT");
      removeUser();
      resolve();
    });
  },
};

const mutations = {
  AUTH_LOADING: (state) => {
    state.status = "loading";
  },
  AUTH_SUCCESS: (state, response) => {
    state.status = "success";
    state.token = response.token;
    state.user = response.user;
    state.hasLoadedOnce = true;
  },
  AUTH_ERROR: (state) => {
    state.status = "error";
    state.hasLoadedOnce = true;
  },
  AUTH_LOGOUT: (state) => {
    state.token = "";
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
