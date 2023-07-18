<script>
import axios from 'axios';

export default {
    data() {
        return {
            isInvalid: false,
            login: '',
            password: '',
            birth: '',
            email: '',
            phone: '',
            isFirst: false,
            isSecond: true,
            isThird: false,
            isDisabled: true,
        };
    },
    methods: {
        async checkLogin() {
            let response = await axios.get(`/login?login=${this.login}`);
            let data = response.data;
            if (data == true) {
                this.isInvalid = true;
            } else {
                this.isInvalid = false;
            };

            this.checkDisabled();
        },
        generatePassword() {
            let getRandomInt = (min, max) => {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };
            let getRandom = (len) => {
                let password = '';
                let symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                for (let i = 0; i < len; i++){
                    password += symbols.charAt(Math.floor(Math.random() * symbols.length));     
                }
                return password;
            };
            let randomInt = getRandomInt(5, 30);
            this.password = getRandom(randomInt);
            this.isFirst = true;
            this.isSecond = true;
            this.isThird = true;

            this.checkDisabled();
        },
        inputPassword() {
            if (this.password.length < 5) {
                this.isFirst = false;
            } else {
                this.isFirst = true;
            };
            
            if (this.password.length > 30) {
                this.isSecond = false;
            } else {
                this.isSecond = true;
            };

            let list = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

            for (let i of this.password) {
                if (!(list.includes(i))) {
                    this.isThird = false;
                } else {
                    this.isThird = true;
                };
            };

            if (this.password == '' || this.password == '&nbsp') {
                this.isFirst = false;
                this.isSecond = true;
                this.isThird = false;
            };

            this.checkDisabled();
        },
        checkDisabled() {
            if (this.isFirst == true && this.isSecond == true && this.isThird == true && this.isInvalid == false && this.login != '') {
                this.isDisabled = false;
            } else {
                this.isDisabled = true;
            };
        },
        async createAccount(event) {
            event.preventDefault();

            let response = await axios.post('/create_account', {
                login: this.login,
                password: this.password,
                birth: this.birth,
                email: this.email,
                phone: this.phone,
            });

            if (response.data) {
                localStorage.active = 1;
                localStorage.setItem('login', this.login);
                
                this.$router.push({
                    name: 'main',
                });
            } else {
                this.$router.push({
                    name: 'error',
                });
            };
        },
    },
};
</script>

<template>
    <div class="main__container container">
        <form @submit="createAccount">
            <div class="block__for__main__title">
                <h2 class="text-center main__title mt-2 mb-3">Регистрация</h2>
            </div>
            <div class="sign__up mt-5 mb-3">
                <div class="block__for__login">
                    <input type="text" name="login" :class="{
                        'form-control': true,
                        'input__login': true,
                        'is-invalid': isInvalid,
                    }" placeholder="Придумайте логин" @input="checkLogin" v-model="login">
                    <div class="invalid-feedback">Этот логин уже существует</div>
                </div>
                <div class="block__for__password">
                    <div class="one__container">
                        <input name="password" class="form-control input__password" placeholder="Придумайте пароль" v-model="password" type="text" @input="inputPassword">
                        <button class="btn btn-primary password__button" type="button" @click="generatePassword">Сгенерировать пароль</button>
                        <div class="block__for__password__rules">
                            <p :class="{
                                'password__rules': true,
                                'text-danger': !isFirst,
                                'text-success': isFirst,
                            }">Пароль должен быть не менее 5 символов</p>
                            <p :class="{
                                'password__rules': true,
                                'text-danger': !isSecond,
                                'text-success': isSecond,
                            }">Пароль должен быть не более 30 символов</p>
                            <p :class="{
                                'password__rules': true,
                                'text-danger': !isThird,
                                'text-success': isThird,
                            }">Пароль может состоять из латинских букв или цифер</p>
                        </div>
                    </div>
                </div>
                <div class="block__for__date mt-4">
                    <label for="date" class="form-label">Дата рождения</label>
                    <input id="date" type="date" name="date" class="form-control input__date" placeholder="Введите вашу дату рождения" v-model="birth">
                </div>
                <div class="block__for__email">
                    <label for="email" class="form-label">Необязательно</label>
                    <input id="email" type="email" name="email" class="form-control input__email" placeholder="Введите вашу почту" v-model="email">
                </div>
                <div class="block__for__phone__number">
                    <label for="phone__number" class="form-label">Необязательно</label>
                    <input id="phone__number" type="tel" name="phone__number" class="form-control input__phone__number" placeholder="Введите ваш номер" v-model="phone">
                </div>
                <div class="block__for__registration">
                    <button class="btn btn-primary btn__registration" type="submit" :disabled="isDisabled">Зарегистрироваться</button>
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped>
.header {
    border-bottom: 3px solid #DCDCDC;
    margin: 15px 0;
    padding: 12px 0;
}

.sign__up * {
    margin: auto;
}

.form-control {
    width: 45%;
    margin-bottom: 20px;
}

.input__password {
    margin-left: 23%;
    margin-bottom: 10px;
    display: inline-block;
}

.password__button {
    margin-left: 33px;
}

.one__container {
    position: relative;
}

.password__rules {
    margin-left: 23%;
}

.form-label {
    margin-left: 28%;
    margin-bottom: 0.25%;
}

.btn__registration {
    display: block;
    margin: auto;
}

.header {
    background-color: #ffffff;
    position: sticky;
    top: 0;
    z-index: 1;
}

.invalid-feedback {
    position: relative;
    bottom: 12.5px;
    left: 27.5%;
}
</style>