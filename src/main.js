import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCookies from "vue-cookies";
import "@/assets/sass/main.scss";

import Moment from "moment";

const app = createApp(App);
app.config.globalProperties.Moment = Moment;

app.use(store).use(router).use(VueCookies).mount("#app");
