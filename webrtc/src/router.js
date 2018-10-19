import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import room from './views/room.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/room/:roomid/:account',
            name: 'room',
            component: room
        }
    ],
});