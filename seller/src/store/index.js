import Vue from "vue";
import Vuex from "vuex";
import gift from "./modules/gift";
import getters from "./getter";
import upload from "./modules/upload";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    gift,
    upload
  },
  getters,
  actions
});
