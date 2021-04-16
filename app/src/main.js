import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/index";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// import { sync } from 'vuex-router-sync'

import store from "@/store/store";
import axios from "axios";
import i18n from "./i18n";

// Global Components Anders
axios.defaults.baseURL = "http://localhost:3000/api/";
axios.defaults.headers.common["Authorization"] = `Bearer ${store.state.token}`;

Vue.config.productionTip = false;

// sync(store, router);

new Vue({
  vuetify,
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
