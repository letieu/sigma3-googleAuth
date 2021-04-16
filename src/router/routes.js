export default [
  // Advertiser
  {
    path: '/advertiser',
    name: 'advertiser',
    component: () => import('@/pages/advertiser/Index.vue'),
  },
  {
    path: '/advertiser/:id',
    name: 'advertiser-detail',
    component: () => import('@/pages/advertiser/Detail.vue'),
    meta: {
      parents: ['advertiser'],
    },
  },

  // Consolidation
  {
    path: '/consolidation',
    name: 'consolidation',
    component: () => import('@/pages/consolidation/Index.vue'),
  },
  {
    path: '/consolidation/create',
    name: 'consolidation-create',
    component: () => import('@/pages/consolidation/Create.vue'),
    meta: {
      parents: ['consolidation'],
    },
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
