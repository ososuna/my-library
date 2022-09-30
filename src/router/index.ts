import { createRouter, createWebHashHistory, RouteComponent, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
	{
		path: '',
    name: 'app',
    component: () => import('../layouts/AppLayout.vue'),
    children: [
      {
        path: '',
        name: 'auth',
        component: () => import('../components/LoginComponent.vue')
      },
      {
        path: 'home',
        name: 'home',
        component: () => import('../components/HomeComponent.vue')
      }
    ]
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
