export default [
  {
    path: '/advertiser',
    name: 'advertiser',
    component: () => import('@/pages/advertiser/Index.vue'),
  },

  {
    path: '/consolidation',
    name: 'consolidation',
    component: () => import('@/pages/consolidation/Index.vue'),
  },
  {
    path: '/consolidation/:id',
    name: 'consolidation-detail',
    component: () => import('@/pages/consolidation/Detail.vue'),
    meta: {
      parents: ['consolidation'],
    },
  },

  {
    path: '/test',
    name: 'test',
    component: () => import('@/pages/Test.vue'),
  },
];
