import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

enum Types {
  SET_USER_INFO = "SET_USER_INFO",
  ADD_TO_CART = "ADD_TO_CART",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
  CLEAR_CART = "CLEAR_CART"
}

export default new Vuex.Store({
  state: {
    userInfo: null,
    shoppingCart: Array<any>()
  },
  getters: {
    getUserInfo: (state):object|null => state.userInfo,
    getCart: (state):Array<any> => state.shoppingCart
  },
  mutations: {
    [Types.SET_USER_INFO]: (state, userInfo):void => {
      state.userInfo = userInfo ? userInfo : null;
    },
    [Types.ADD_TO_CART]: (state, goods):void => {
      state.shoppingCart.push(goods);
    },
    [Types.REMOVE_FROM_CART]: (state, id):void => {
      let length = state.shoppingCart.length;
      for (let i = length-1; i >= 0; i--) {
        if (state.shoppingCart[i].Id === id) {
          state.shoppingCart.splice(i, 1);
          return;
        }
      }
    },
    [Types.CLEAR_CART]: (state):void => {
      state.shoppingCart = [];
    }
  },
  actions: {
    setUserInfo: ({ commit }, userInfo):void => {
      commit(Types.SET_USER_INFO, userInfo);
    },
    addToCart: ({ commit }, goods):void => {
      setTimeout(() => {
        commit(Types.ADD_TO_CART, goods);
      }, 900);
    },
    addToCartImmediately: ({ commit }, goods):void => {
      commit(Types.ADD_TO_CART, goods);
    },
    removeFromCart: ({ commit }, id):void => {
      commit(Types.REMOVE_FROM_CART, id);
    },
    clearCart: ({ commit }):void => {
      commit(Types.CLEAR_CART);
    }
  }
});
