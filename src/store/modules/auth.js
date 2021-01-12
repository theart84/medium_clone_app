import authApi from '@/api/auth';
import {setItem} from '@/helpers/persistanceStorage';

const state = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null
};

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',
  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure',

  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailure: '[auth] getCurrentUserFailure'
};

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmitting = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.registerFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  [mutationTypes.loginStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmitting = true;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.loginFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true;
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false;
    state.currentUser = payload;
    state.isLoggedIn = true;
  },
  [mutationTypes.getCurrentUserFailure](state) {
    state.isLoading = false;
    state.isLoggedIn = false;
    state.currentUser = null;
  }
};
export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser'
};

export const getterType = {
  currentUser: '[auth] currentUser',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonymous: '[auth] isAnonymous'
};

const getters = {
  [getterType.currentUser]: state => {
    return state.currentUser;
  },
  [getterType.isLoggedIn]: state => {
    return Boolean(state.isLoggedIn);
  },
  [getterType.isAnonymous]: state => {
    return state.isAnonymous === false;
  }
};

const actions = {
  [actionTypes.register]({commit}, credentials) {
    return new Promise(resolve => {
      commit(mutationTypes.registerStart);
      authApi
        .register(credentials)
        .then(response => {
          commit(mutationTypes.registerSuccess, response.data.user);
          setItem('accessToken', response.data.user.token);
          resolve(response.data.user);
        })
        .catch(result => {
          commit(mutationTypes.registerFailure, result.response.data.errors);
        });
    });
  },
  [actionTypes.login]({commit}, credentials) {
    return new Promise(resolve => {
      commit(mutationTypes.loginStart);
      authApi
        .login(credentials)
        .then(response => {
          commit(mutationTypes.loginSuccess, response.data.user);
          setItem('accessToken', response.data.user.token);
          resolve(response.data.user);
        })
        .catch(result => {
          commit(mutationTypes.loginFailure, result.response.data.errors);
        });
    });
  },
  [actionTypes.getCurrentUser]({commit}) {
    return new Promise(resolve => {
      commit(mutationTypes.getCurrentUserStart);
      authApi
        .getCurrentUser()
        .then(response => {
          commit(mutationTypes.getCurrentUserSuccess, response.data.user);
          resolve(response.data.user);
        })
        .catch(() => {
          commit(mutationTypes.getCurrentUserFailure);
        });
    });
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
