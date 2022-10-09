import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const importer = (path) => () => import('@/views/' + path + '.vue');

console.log(importer);
export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: importer('Home'),
		},
		{
			path: '/room/:roomid/:account',
			name: 'room',
			component: importer('webrtc/room'),
		},
		{
			path: '/many',
			name: 'many',
			component: importer('webrtc/many'),
		},
		{
			path: '/local1',
			name: 'local1',
			component: importer('webrtc/local1'),
		},
		{
			path: '/Speech',
			name: 'Speech',
			component: importer('webrtc/Speech'),
		},
		{
			path: '/transfer',
			name: 'transfer',
			component: importer('webrtc/transfer'),
		},
		{
			path: '/remote1',
			name: 'remote1',
			component: importer('webrtc/remote1'),
		},
		{
			path: '/palette',
			name: 'palette',
			component: importer('webrtc/palette'),
		},
		{
			path: '/whiteboard',
			name: 'whiteboard',
			component: importer('webrtc/whiteboard'),
		},
		{
			path: '/communication',
			name: 'communication',
			component: importer('communication/communication'),
		},
		{
			path: '/responsive',
			name: 'responsive',
			component: importer('responsive/responsive'),
		},
	],
});
