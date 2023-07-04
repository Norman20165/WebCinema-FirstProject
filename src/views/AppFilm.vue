<script>
import axios from 'axios';

export default {
    data() {
        return {
            film: {},
        };
    },
    methods: {
        async loadData() {
            let response = await axios.get('/films', {
                params: {
                    id: this.$route.params.id,
                },
            });
            this.film = response.data;

            if (!this.film) {
                this.$router.push({
                    name: 'error',
                });
            };
        },
    },
    mounted() {
        this.loadData();
    },
};
</script>

<template>
    <div class="main__content">
        <div class="container main__container">
            <div class="main__description">
                <div class="main__block__center__description">
                    <div class="block__for__image">
                        <img :src="'../src/' + film.path" alt="" class="main__picture">
                    </div>
                    <div class="block__for__small__description">
                        <div class="main__block__title">
                            <h2>{{ film.title }} ({{ film.year }})</h2>
                        </div>
                        <div class="main__block__english__title">
                            <p class="text-muted main__english__title__text">{{ film.englishTitle }}</p>
                        </div>
                        <div class="main__block__slogan">
                            <p>{{ film.slogan }}</p>
                        </div>
                        <div class="block__for__big__description">
                            <p class="main__block__big__description">{{ film.description }}</p>
                        </div>
                        <div class="other__main__additional__information">
                            <p class="year additional">Год производства: {{ film.year }}</p>
                            <p class="country additional">Страна: {{ film.country }}</p>
                            <p class="genre additional">Жанр: {{ film.genre }}</p>
                            <p class="director additional">Режисер: {{ film.director }}</p>
                            <p class="budget additional">Бюджет: ${{ film.budget }}</p>
                            <p class="income additional">Сборы: ${{ film.income }}</p>
                            <p class="time additional">Время: {{ film.time }} мин.</p>
                        </div>
                    </div>
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