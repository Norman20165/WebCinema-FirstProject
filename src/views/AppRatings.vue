<script>
import axios from 'axios';

export default {
    props: ['search'],
    data() {
        return {
            films: [],
            NoActive: 0,
            otherList: [],
        };
    },
    methods: {
        async loadData() {
            let response = await axios.get('/ratings');
            this.films = response.data;
        },
        goRating(item) {
            this.$router.push({
                name: 'rating',
                params: {
                    id: item,
                },
            });
        },
        loadRes() {
            this.otherList = [];
            for (let i of this.films) {
                let film = i['title'].toLowerCase();
                if (film.includes(this.search.toLowerCase())) {
                    this.otherList.push(i);
                };
            };
        },
    },
    mounted() {
        this.loadData();
    },
    watch: {
        search(newValue) {
            if (!newValue) {
                this.NoActive = 0;
            } else {
                this.NoActive = 1;
                this.loadRes();
            };
        }
    },
};
</script>

<template>
    <div class="main__content">
        <div class="container">
            <div class="container__for__banner">
                <h1 class="text-center main__banner">15 лучших фильмов по версии Кинопоиска</h1>
            </div>
            <div class="container__with__cards__for__js">
                <a class='link__for__ratings__card text-decoration-none' v-for="(item, index) in films" @click="goRating(item._id)" v-if="!NoActive">
                    <div class='container__for__card'>
                        <div class='card'>
                            <div class='row g-0'>
                                <div class='col-md-4'>
                                    <img :src="'src/' + item.path" class='img-fluid rounded-start' alt=''>
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h4 class="card-title mb-3">{{ item.title }}</h4>
                                        <p class="card-text mb-2">{{ item.englishTitle }}, {{ item.year }}, {{ item.filmLength }} мин.</p>
                                        <p class="card-text mb-0"><small class="text-muted">{{ item.country }} • {{ item.genre }}&nbsp;&nbsp;Режиссёр: {{ item.director }}</small></p>
                                        <p class="card-text"><small class="text-muted">В ролях: {{ item.cast }}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
                <a class='link__for__ratings__card text-decoration-none' v-for="(item, index) in otherList" @click="goRating(item._id)" v-else>
                    <div class='container__for__card'>
                        <div class='card'>
                            <div class='row g-0'>
                                <div class='col-md-4'>
                                    <img :src="'src/' + item.path" class='img-fluid rounded-start' alt=''>
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h4 class="card-title mb-3">{{ item.title }}</h4>
                                        <p class="card-text mb-2">{{ item.englishTitle }}, {{ item.year }}, {{ item.filmLength }} мин.</p>
                                        <p class="card-text mb-0"><small class="text-muted">{{ item.country }} • {{ item.genre }}&nbsp;&nbsp;Режиссёр: {{ item.director }}</small></p>
                                        <p class="card-text"><small class="text-muted">В ролях: {{ item.cast }}</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main__banner {
    margin-top: 20px;
    margin-bottom: 10px;
}

.container__for__card {
    padding: 10px;
    transition: 0.35s;
}

.container__for__card:hover {
    transform: scale(1.045);
}

.container__for__card img {
    object-fit: cover;
    height: 300px;
    width: 100%;
}

.link__for__ratings__card {
    color: #000000;
    cursor: auto;
}
</style>