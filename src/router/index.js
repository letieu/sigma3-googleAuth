import { createRouter, createWebHashHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(function (to, from, next) {
  window.scrollTo(0, 0);
  next();
});

export default router;
