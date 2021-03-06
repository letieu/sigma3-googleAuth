import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'prismjs/themes/prism-coy.css';
import '@fullcalendar/core/main.min.css';
import '@fullcalendar/daygrid/main.min.css';
import '@fullcalendar/timegrid/main.min.css';
import './assets/layout/layout.scss';
import './assets/layout/flags/flags.css';

import { createApp, reactive } from 'vue';
import router from './router';
import App from './App.vue';
import initPrime from './plugins/prime';
import { createPinia } from 'pinia';

router.beforeEach(function (to, from, next) {
  window.scrollTo(0, 0);
  next();
});

const app = createApp(App);
initPrime(app);

app.config.globalProperties.$appState = reactive({ inputStyle: 'outlined' });

app.use(router);
app.use(createPinia());

app.mount('#app');
