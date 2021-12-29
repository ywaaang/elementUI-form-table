import Vue from 'vue'
import App from './layout'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import DlrCommon from './package'
import router from "./router";
import '@/styles/index.scss'

Vue.use(ElementUI);
Vue.use(DlrCommon);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
