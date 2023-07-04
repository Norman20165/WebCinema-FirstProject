import { createRouter, createWebHistory } from 'vue-router';
import AppMain from './views/AppMain.vue';
import AppNews from './views/AppNews.vue';
import AppRatings from './views/AppRatings.vue';
import AppChildren from './views/AppChildren.vue';
import AppPremieres from './views/AppPremieres.vue';
import AppFilm from './views/AppFilm.vue';
import AppRating from './views/AppRating.vue';
import AppSignIn from './views/AppSignIn.vue';
import AppSignUp from './views/AppSignUp.vue';
import AppError from './views/AppError.vue';

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'main',
            component: AppMain,
        },
        {
            path: '/ratings',
            name: 'ratings',
            component: AppRatings,
        },
        {
            path: '/children',
            name: 'children',
            component: AppChildren,
        },
        {
            path: '/premieres',
            name: 'premieres',
            component: AppPremieres,
        },
        {
            path: '/news',
            name: 'news',
            component: AppNews,
        },
        {
            path: '/film/:id',
            name: 'film',
            component: AppFilm,
        },
        {
            path: '/rating/:id',
            name: 'rating',
            component: AppRating,
        },
        {
            path: '/sign_in',
            name: 'sign_in',
            component: AppSignIn,
        },
        {
            path: '/sign_up',
            name: 'sign_up',
            component: AppSignUp,
        },
        {
            path: '/error',
            name: 'error',
            component: AppError,
        },
    ],
});