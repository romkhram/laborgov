/**
 * Auth Module
 */
import axios from 'axios'
import router from '../../../router';
import Nprogress from 'nprogress';
import { forToken } from './tokenapi';

const auth = {
state: {
  tokenParams: {
    token_type: '',
    access_token: null,
    refresh_token: '',
    expires_in: '',
    tokenTime: null,
    logInSnackbar: false,
    progress: false,
    userId: null,
    txt: ""
  }
},

// getters
getters: {

},

// actions
actions: {
  logoutUserFromFirebase ({state}) {
    state.tokenParams.access_token = null;
    router.push("/session/login");
  },

  getToken({state, dispatch, commit, getters}, val) {
    commit('progressOn');
    axios.post(forToken.api, {},
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${window.btoa(forToken.client + ":" + forToken.password)}`
      },
      params: {
        grant_type: forToken.grantType,
        username: val.login,
        password: val.password
      }
    })
    .then(function (response) {
      // commit('refTokenMut', );
      commit('loginUser', response);
      commit('progressOff');
      setTimeout(() => {
        dispatch('getRefToken');
      }, 10);
    })
    .catch(function (error) {
      console.log(error.response.status);
      commit('progressOff');
      if (error.response.status === 400) {
        state.tokenParams.txt = 'Вы ввели неверный логин или пароль';
        commit('logInSnackbarOn');
      } else if (error.response.status === 404) {
        state.tokenParams.txt = 'Сервер авторизации не доступен';
        commit('logInSnackbarOn');
      } else {
        state.tokenParams.txt = 'Авторизация не доступна, обратитесь к администратору';
        commit('logInSnackbarOn');
      }
    });
  },

  refToken({state, dispatch, commit, getters}) {
    axios.post(forToken.api, {},
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${window.btoa(forToken.client + ":" + forToken.password)}`
      },
      params: {
        grant_type: 'refresh_token',
        refresh_token: state.tokenParams.refresh_token
      }
    })
    .then(function (response) {
      console.log(response);
      commit('refLoginUser', response);
    })
    .catch(function (error) {
      console.log(error);
    });
  },

  getRefToken({state, dispatch, commit, getters}) {
    setInterval(() => {
      console.log("повторяю токен");
      console.log(state.tokenParams.tokenTime);
      dispatch('refToken');
    }, state.tokenParams.tokenTime);
  }
},

// mutations
mutations: {
  loginUser(state, response) {
    console.log(response);
    state.tokenParams.tokenTime = (response.data.expires_in - 1199) * 1000;
    state.tokenParams.token_type = response.data.token_type;
    state.tokenParams.access_token = response.data.access_token;
    state.tokenParams.refresh_token = response.data.refresh_token;
    state.tokenParams.expires_in = response.data.expires_in;
    state.tokenParams.userId = response.data.userId;
    console.log(state.tokenParams.access_token);
    router.push("/eais/employers/employers");
  },
  refLoginUser(state, response) {
    state.tokenParams.access_token = response.data.access_token;
    state.tokenParams.refresh_token = response.data.refresh_token;
  },
  logInSnackbarOn(state) {
    state.tokenParams.logInSnackbar = true;
    setTimeout(() => {
      state.tokenParams.logInSnackbar = false;
      state.tokenParams.txt = '';
    }, 3000);
  },
  logInSnackbarOff(state) {
    state.tokenParams.logInSnackbar = false;
    state.tokenParams.txt = '';
    console.log(state.tokenParams.logInSnackbar);
  },
  progressOn(state) {
    state.tokenParams.progress = true;
  },
  progressOff(state) {
    state.tokenParams.progress = false;
  }
}
}
export default auth
