import { createWebHistory, createRouter } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../pages/Home.vue'),
		},
		{
			path: '/room/:roomid/:account',
			name: 'room',
			component: import('../pages/Demo/index.vue'),
		},
		{
			path: '/many',
			name: 'many',
			component: import('../pages/Demo/index.vue'),
		},
		{
			path: '/local1',
			name: 'local1',
			component: import('../pages/Demo/index.vue'),
		},
		{
			path: '/speech',
			name: 'speech',
			component: import('../pages/Demo/index.vue'),
		},
		{
			path: '/transfer',
			name: 'transfer',
			component: import('../pages/transfer/index.vue'),
		},
		{
			path: '/remote1',
			name: 'remote1',
			component: import('../pages/Demo/index.vue'),
		},
		{
			path: '/palette',
			name: 'palette',
			component: import('../pages/Demo/index.vue'),
		},
		{
			path: '/whiteboard',
			name: 'whiteboard',
			component: import('../pages/Demo/index.vue'),
		},
	],
});

export default router;
