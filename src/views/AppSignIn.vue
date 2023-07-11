<script>
import axios from 'axios';

export default {
    props: ['search'],
    data() {
        return {
            allLogins: '',
            login: '',
            isInvalidLogin: false,
            password: '',
            isInvalidPassword: false,
            isDisabled: true,
        };
    },
    methods: {
        async checkLogin() {
            let isInclude = 0;

            if (this.login != '') {
                for (let i of this.allLogins) {
                    if (i.login == this.login) {
                        isInclude = 1;
                    };
                };
            } else {
                isInclude = 1;
            };

            if (!isInclude) {
                this.isInvalidLogin = true;
            } else {
                this.isInvalidLogin = false;
            };
        },
        async checkPassword() {
            let isInclude = 0;

            if (this.password != '') {
                for (let i of this.allLogins) {
                    if (i.password == this.password) {
                        isInclude = 1;
                    };
                };
            } else {
                isInclude = 1;
            };

            if (!isInclude) {
                this.isInvalidPassword = true;
            } else {
                this.isInvalidPassword = false;
            };

            if (this.isInvalidLogin == false && this.isInvalidPassword == false && this.password != '' && this.login != '') {
                this.isDisabled = false;
            } else {
                this.isDisabled = true;
            };
        },
        async enterAccount(event) {
            event.preventDefault();

            localStorage.active = 1;
            localStorage.setItem('login', this.login);

            this.$router.push({
                name: 'main',
            });
        },
        async loadLogins() {
            let response = await axios.get('/logins');
            this.allLogins = response.data;
        },
    },
    mounted() {
        this.loadLogins();
    },
};
</script>

<template>
    <div class="main__container container">
        <div class="block__for__main__title">
            <h2 class="text-center main__title mt-2 mb-3">Вход</h2>
        </div>
    </div>
    <form @submit="enterAccount">
        <div class="sign__in mt-5 mb-3">
            <div class="block__for__login">
                <input type="text" name="login" :class="{
                    'form-control': true,
                    'input__login': true,
                    'is-invalid': isInvalidLogin,
                }" placeholder="Введите логин" v-model="login" @input="checkLogin">
                <div class="invalid-feedback">Этот логин не существует</div>
            </div>
            <div class="block__for__password">
                <input type="password" name="password" :class="{
                    'form-control': true,
                    'input__password': true,
                    'is-invalid': isInvalidPassword,
                }" placeholder="Введите пароль" v-model="password" @input="checkPassword">
                <div class="invalid-feedback">Неверный пароль</div>
            </div>
            <div class="block__for__entering">
                <button class="btn btn-primary btn__entering" :disabled="isDisabled" type="submit">Войти</button>
            </div>
        </div>
    </form>
</template>

<style scoped>
.sign__in * {
    margin: auto;
}

.form-control {
    width: 45%;
    margin-bottom: 20px;
}

.invalid-feedback {
    position: relative;
    bottom: 12.5px;
    left: 27.5%;
}

.btn__entering {
    display: block;
    margin: auto;
    width: 50%;
}
</style>