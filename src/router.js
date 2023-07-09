import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'main',
            component: () => import('./views/AppMain.vue'),
        },
        {
            path: '/ratings',
            name: 'ratings',
            component: () => import('./views/AppRatings.vue'),
        },
        {
            path: '/children',
            name: 'children',
            component: () => import('./views/AppChildren.vue'),
        },
        {
            path: '/premieres',
            name: 'premieres',
            component: () => import('./views/AppPremieres.vue'),
        },
        {
            path: '/news',
            name: 'news',
            component: () => import('./views/AppNews.vue'),
        },
        {
            path: '/film/:id',
            name: 'film',
            component: () => import('./views/AppFilm.vue'),
        },
        {
            path: '/rating/:id',
            name: 'rating',
            component: () => import('./views/AppRating.vue'),
        },
        {
            path: '/sign_in',
            name: 'sign_in',
            component: () => import('./views/AppSignIn.vue'),
        },
        {
            path: '/sign_up',
            name: 'sign_up',
            component: () => import('./views/AppSignUp.vue'),
        },
        {
            path: '/error',
            name: 'error',
            component: () => import('./views/AppError.vue'),
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('./views/AppProfile.vue'),
        },
    ],
});