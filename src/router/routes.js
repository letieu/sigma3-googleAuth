export default [
  // Advertiser
  {
    path: '/advertiser',
    name: 'advertiser',
    component: () => import('@/pages/advertiser/Index.vue'),
  },

  // Consolidation
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

  // Publisher
  {
    path: '/test',
    name: 'test',
    component: () => import('@/pages/Test.vue'),
  },
];
