<script>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import { RouterView } from 'vue-router';

export default {
    components: {
        AppHeader,
        AppFooter,
    },
    data() {
        return {
            search: '',
        };
    },
    methods: {
        changeSearch(data) {
            this.search = data['search'];
        },
    },
};
</script>

<template>
    <app-header :changeSearch="changeSearch"></app-header>
    <router-view :search="search"></router-view>
    <app-footer></app-footer>
</template>

<style scoped>

</style>