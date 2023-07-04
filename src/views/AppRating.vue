<script>
import axios from 'axios';

export default {
    data() {
        return {
            rating: {},
            otherRatings: [],
        };
    },
    methods: {
        async loadData() {
            let response = await axios.get('/ratings', {
                params: {
                    id: this.$route.params.id,
                },
            });
            this.rating = response.data;

            if (!this.rating) {
                this.$router.push({
                    name: 'error',
                });
            };
        },
        async getData() {
            let response = await axios.get('/ratings');
            let data = response.data;
            let array = [];
            let index = 0;
            let res = [];

            for (let i = 0; i < 2; i++) {
                for (let j of data) {
                    array.push(j);
                };
            };

            for (let i = 0; i < array.length; i++) {
                if (this.rating._id == array[i]._id) {
                    index = i;
                    break;
                };
            };

            for (let i = 1; i < 7; i++) {
                res.push(array[i + index]);
            };

            this.otherRatings = res;
            console.log(array);
        },
        goOtherRating(item) {
            this.$router.push({
                name: 'rating',
                params: {
                    id: item,
                },
            });
        },
    },
    mounted() {
        this.loadData();
        this.getData();
    },
    watch: {
        $route(newValue) {
            if (newValue) {
                this.loadData();
                this.getData();
            };
        },
    },
};
</script>

<template>
    <div class="main__content">
        <div class="container main__container">
            <div class="main__description">
                <div class="main__block__center__description">
                    <div class="block__for__image">
                        <img :src="'../src/' + rating.path" alt="" class="main__picture">
                    </div>
                    <div class="block__for__small__description">
                        <div class="main__block__title">
                            <h2>{{ rating.title }} ({{ rating.year }})</h2>
                        </div>
                        <div class="main__block__english__title">
                            <p class="text-muted main__english__title__text">{{ rating.englishTitle }}</p>
                        </div>
                        <div class="main__block__slogan">
                            <p>{{ rating.slogan }}</p>
                        </div>
                        <div class="block__for__big__description">
                            <p class="main__block__big__description">{{ rating.description }}</p>
                        </div>
                        <div class="other__main__additional__information">
                            <p class="year additional">Год производства: {{ rating.year }}</p>
                            <p class="country additional">Страна: {{ rating.country }}</p>
                            <p class="genre additional">Жанр: {{ rating.genre }}</p>
                            <p class="director additional">Режисер: {{ rating.director }}</p>
                            <p class="budget additional">Бюджет: ${{ rating.budget }}</p>
                            <p class="income additional">Сборы: ${{ rating.income }}</p>
                            <p class="time additional">Время: {{ rating.time }} мин.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="block__additional">
                <div class="block__for__listing">
                    <a class='link__for__listing' v-for="(item, index) in otherRatings" @click="goOtherRating(item._id)">
                        <div class="card__for__listing">
                            <div class="card">
                                <div class="card-body">
                                    <img :src="'../src/' + item.path" alt="" class="card-img-top image__for__listing">
                                    <h5 class="title__for__listing card-title">{{ item.title }}</h5>
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
    margin: 20px;
}

.main__picture {
    object-fit: cover;
    height: 30rem;
    width: 20rem;
}

.block__for__small__description, .block__for__image {
    display: inline-block;
}

.footer {
    margin: 0 15px 15px 15px;
}

.main__english__title__text {
    font-size: 1.2rem;
    margin-bottom: 8px;
}

.main__block__slogan {
    font-size: 1.9rem;
}

h2 {
    font-size: 2.5rem;
}

.block__for__small__description {
    margin-left: 30px;
    position: absolute;
}

.main__block__center__description {
    position: relative;
}

.additional {
    margin-bottom: 6px;
}

.block__additional {
    margin: 10px 0;
}

.card__for__listing {
    display: inline-block;
    max-width: 200px;
}

@media (min-width: 0) and (max-width: 1200px) {
    .image__for__listing {
        object-fit: cover;
        height: 50px;
        width: 80%;
    }

    .card__for__listing {
        display: inline-block;
        max-width: 150px;
    }
}

.image__for__listing {
    object-fit: cover;
    height: 200px;
    width: 100%;
}

.block__for__listing {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    gap: 20px;
}

.card {
    transition: 0.35s;
}

.card:hover {
    transform: scale(1.045);
}

.card-body {
    padding: 7.5px;
}

.card-title {
    margin-bottom: 0;
}

.link__for__listing {
    cursor: auto;
    color: #000000;
}
</style>