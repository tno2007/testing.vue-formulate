import Vue from "vue";
import VueCompositionAPI, { createApp, h } from "@vue/composition-api";
import { createPinia, PiniaVuePlugin } from "pinia";

import App from "./App.vue";

Vue.use(VueCompositionAPI);

import VueFormulate from "@braid/vue-formulate";
import "@braid/vue-formulate/themes/snow/snow.scss";

import YearMonthDayFormulateInput from "./components/common/vf/YearMonthDayFormulateInput.vue";
Vue.component("YearMonthDayFormulateInput", YearMonthDayFormulateInput);

Vue.use(VueFormulate, {
  library: {
    yearmonthday: {
      classification: "select",
      component: "YearMonthDayFormulateInput",
      slotProps: {
        component: ["format"],
      },
    },
  },
  //plugins: [VueFormulateDatepickerPlugin, FormulateVueCurrencyPlugin],
});

const app = createApp({
  pinia: createPinia(),
  render: () => h(App),
});
app.use(PiniaVuePlugin);

app.mount("#app");
