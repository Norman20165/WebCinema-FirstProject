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
            let response = await axios.get('/films')
            this.films = response.data;
        },
        goFilms(item) {
            this.$router.push({
                name: 'film',
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
            <div class="flex__container">
                <div class="container__for__js container row-cols-lg-4 row-cols-md-4 row-cols-4">
                    <a class='link__for__card text-decoration-none' v-for="(item, index) in films" @click="goFilms(item._id)" v-if="!NoActive">
                        <div class='col'>
                            <div class="card">
                                <img :src="'src/' + item.path" alt="" class='main__pictures'>
                                <div class="card-title">
                                    <h5 class='title__for__card'>{{ item.title }}</h5>
                                </div>
                            </div>
                        </div>
                    </a>
                    <a class='link__for__card text-decoration-none' v-for="(item, index) in otherList" @click="goFilms(item._id)" v-else>
                        <div class='col'>
                            <div class="card">
                                <img :src="'src/' + item.path" alt="" class='main__pictures'>
                                <div class="card-title">
                                    <h5 class='title__for__card'>{{ item.title }}</h5>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.main__content {
    margin-top: 15px;
}

.container__for__js {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
}

.card-title {
    padding: 12px;
    margin-bottom: 0;
}

.container__for__js img {
    object-fit: cover;
    height: 400px;
    width: 100%;
}

.title__for__card {
    margin-bottom: 0;
}

.card {
    transition: 0.35s;
}

.card:hover {
    transform: scale(1.045);
}

.link__for__card {
    cursor: auto;
    color: #000000;
}
</style>