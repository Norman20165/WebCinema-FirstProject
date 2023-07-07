<script>

export default {
    props: ['changeSearch'],
    data() {
        return {
            pic: 0,
            active: 0,
            search: '',
        };
    },
    methods: {
        goMain() {
            this.$router.push({
                name: 'main',
            });
        },
        goRatings() {
            this.$router.push({
                name: 'ratings',
            });
        },
        goChildren() {
            this.$router.push({
                name: 'children',
            });
        },
        goPremieres() {
            this.$router.push({
                name: 'premieres',
            });
        },
        goNews() {
            this.$router.push({
                name: 'news',
            });
        },
        goSignIn() {
            this.$router.push({
                name: 'sign_in',
            });
        },
        goSignUp() {
            this.$router.push({
                name: 'sign_up',
            });
        },
        pushSearch() {
            this.changeSearch({
                search: this.search,
            });
        },
    },
    mounted() {
        if (window.location.href.includes('film')) {
            this.pic = 1;
        } else if (window.location.href.includes('rating')) {
            if (!window.location.href.includes('ratings')) {
                this.pic = 1;
            };
        };

        if (localStorage.active == undefined) {
            localStorage.setItem('active', 0)
        };

        this.active = Number(localStorage.active);
    },
    watch: {
        $route(newValue, oldValue) {
            if (oldValue.fullPath == '/sign_up') {
                this.active = 1;
            };
        },
    },
};
</script>

<template>
    <div class="header">
        <div class="header__container row">
            <div class="header__buttons col-7">
                <a class="btn btn-primary" @click="goMain">Кино</a>
                <a class="btn btn-primary" @click="goRatings">Рейтинги</a>
                <a class="btn btn-primary" @click="goChildren">Дети</a>
                <a class="btn btn-primary" @click="goPremieres">Премьеры</a>
                <a class="btn btn-primary" @click="goNews">Новости</a>
            </div>
            <div class="header__account col-4">
                <div class="header__input">
                    <input type="text" placeholder="Поиск..." class="form-control header__input__for__js" v-model="search" @input="pushSearch">
                </div>
                <div class="header__account__plus">
                    <div class="header__round"><span class="header__round__text">ПЛЮС</span></div>
                </div>
                <div class="header__account__settings">
                    <div class="dropdown" v-if="!active">
                        <a class="d-block link-dark text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="src/assets/empty/empty.webp" width='58' height='58' alt="" class='header__account__round' v-if="!pic">
                            <img src="../assets/empty/empty.webp" width='58' height='58' alt="" class='header__account__round' v-else>
                        </a>

                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" @click="goSignIn">Войти</a></li>
                            <li><a class="dropdown-item" @click="goSignUp">Зарегистрироваться</a></li>
                        </ul>

                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item">Профиль</a></li>
                            <li><a class="dropdown-item">Настройки</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item">Выйти</a></li>
                        </ul>
                    </div>
                    <div class="dropdown" v-else>
                        <a class="d-block link-dark text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="src/assets/empty/empty.webp" width='58' height='58' alt="" class='header__account__round' v-if="!pic">
                            <img src="../assets/empty/empty.webp" width='58' height='58' alt="" class='header__account__round' v-else>
                        </a>

                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item">Профиль</a></li>
                            <li><a class="dropdown-item">Настройки</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item">Выйти</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.header {
    background-color: #ffffff;
    position: sticky;
    top: 0;
    z-index: 1;
}

.header__container {
    padding: 10px 20px 12px 20px;
    margin: 5px auto 0 auto;
    border-bottom: 3px solid #DCDCDC;
    width: 1000px;
}

.btn {
    margin: 2px;
    font-size: 19px;
}

.header__account__settings, .header__account__plus, .header__input {
    display: inline-block;
}

.header__account {
    position: relative;
}

.header__account__plus {
    position: absolute;
    left: 225px;
}

.header__account__settings {
    position: absolute;
    left: 340px;
    top: -5px;
}

.header__round__text {
    position: absolute;
    top: 3px;
    cursor: pointer;
}

.header__round {
    display: flex;
    align-items: start;
    justify-content: center;
    position: absolute;
    top: 2px;
    font-weight: 700;
    font-size: 20px;
    color: #ffffff;
    width: 100px;
    height: 42px;
    border-radius: 35px;
    background: -webkit-linear-gradient(left, #ff5c4d, #eb469f 26.56%, #8341ef 75%, #3f68f9);
}

.header__account__round {
    border-radius: 50%;
}

.header__input {
    position: absolute;
    left: 0;
    top: 4px;
}
</style>