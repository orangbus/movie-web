import Vue from 'vue';
import Vuex from 'vuex';

import state from "./State";
import mutations from "./Mutations";
import actions from "./Actions";

Vue.use(Vuex);

const store = new Vuex.Store({
    state, mutations, actions
});

export default store;
