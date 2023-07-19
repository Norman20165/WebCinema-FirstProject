<script>
 import axios from 'axios';

export default {
    data() {
        return {
            allData: [],
            data: [],
            firstName: '',
            lastName: '',
            sex: 'your__sex',
            birth: '',
            phone: '',
            email: '',
            city: '',
            aboutMe: '',
            hobbies: '',
            login: '',
            isInvalidOldLogin: false,
            oldLogin: '',
            isInvalidNewLogin: false,
            newLoginError: '',
            newLogin: '',
            isDisabledLogin: true,
        };
    },
    methods: {
        async loadData() {
            this.allData = (await axios.get('/logins')).data;

            for (let i of this.allData) {
                if (i.login == localStorage.login) {
                    this.data = i;
                    break;
                };
            };
            this.firstName = this.data.firstName;
            this.lastName = this.data.lastName;
            this.sex = this.data.sex;
            this.birth = this.data.birth;
            this.phone = this.data.phone;
            this.email = this.data.mail;
            this.city = this.data.city;
            this.aboutMe = this.data.aboutMe;
            this.hobbies = this.data.hobbies;
        },
        async changeData() {},
        async deleteAccount() {
            try {
                await axios.get(`/delete_account?id=${this.data._id}`);

                localStorage.clear()

                this.$router.push({
                    name: 'main',
                });
            } catch (error) {
                this.$router.push({
                    name: 'error',
                });
            };
        },
        checkOldLogin() {
            if (this.oldLogin != this.data.login && this.oldLogin != '') {
                this.isInvalidOldLogin = true;
            } else {
                this.isInvalidOldLogin = false;
                if (this.oldLogin != '' && this.newLogin != '') {
                    this.isDisabledLogin = false;
                } else {
                    this.isDisabledLogin = true;
                };
            };
        },
        checkNewLogin() {
            if (this.newLogin == this.data.login) {
                this.newLoginError = 'Логин не должен совпадать со старым';
                this.isInvalidNewLogin = true;
                this.isDisabledLogin = true;
            } else if (this.newLogin.trim() === '' && this.newLogin != '') {
                this.newLoginError = 'Логин должен быть без пробела';
                this.isInvalidNewLogin = true;
                this.isDisabledLogin = true;
            } else {
                for (let i of this.allData) {
                    if (i.login == this.newLogin) {
                        this.newLoginError = 'Такой логин уже есть у других пользователей';
                        this.isInvalidNewLogin = true;
                        this.isDisabledLogin = true;
                        break;
                    } else {
                        this.isInvalidNewLogin = false;
                        if (this.newLogin != '' && this.oldLogin != '') {
                            this.isDisabledLogin = false;
                        } else {
                            this.isDisabledLogin = true;
                        };
                    };
                };
            };
        },
        async changeLogin() {},
        async changePassword() {},
        async saveSettings() {},
    },
    mounted() {
        this.loadData();

        if (!Number(localStorage.active)) {
            this.$router.push({
                name: 'error',
            });
        };
    },
};
</script>

<template>
    <div class="main__container container">
        <div class="block__for__main__title">
            <h2 class="text-center main__title mt-2 mb-3">Настройки</h2>
        </div>
        <form @submit="changeData">
            <div class="settings mt-5 mb-3">
                <div class="row">
                    <div class="col-3">
                        <img src="src/assets/empty/empty.webp" alt="">
                        <input type="file" class="mt-2 form-control input__file">
                    </div>
                    <div class="col">
                        <div class="block__for__first__name">
                            <input type="text" placeholder="Имя" class="form-control input__first__name" v-model="firstName">
                        </div>
                        <div class="block__for__last__name">
                            <input type="text" placeholder="Фамилия" class="form-control input__last__name" v-model="lastName">
                        </div>
                        <div class="block__for__sex">
                            <select name="sex" class="form-select select__sex" v-model="sex">
                                <option value="your__sex" selected>Ваш пол</option>
                                <option value="male">Мужской</option>
                                <option value="female">Женский</option>
                            </select>
                        </div>
                    </div>
                    <div class="col">
                        <div class="block__for__birth">
                            <input type="date" class="form-control input__birth" v-model="birth">
                        </div>
                        <div class="block__for__phone">
                            <input type="tel" placeholder="Номер телефона" class="form-control input__phone" v-model="phone">
                        </div>
                        <div class="block__for__email">
                            <input type="email" placeholder="Email" class="form-control input__email" v-model="email">
                        </div>
                        <div class="block__for__city">
                            <input type="text" placeholder="Город" class="form-control input__city" v-model="city">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="block__for__buttons">
                            <div class="block__for__delete">
                                <button class="btn btn-primary" type="button" @click="deleteAccount">Удалить аккаунт</button>
                            </div>
                            <div class="button__for__changing__login">
                                <button class="btn btn-primary" type="button" @click="changeLogin" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Изменить логин</button>
                                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Изменить логин</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="old__login">
                                                    <input type="text" placeholder="Введите старый логин" :class="{
                                                        'form-control modal__input mt-4 mb-0': true,
                                                        'is-invalid': isInvalidOldLogin,
                                                    }" @input="checkOldLogin" v-model="oldLogin">
                                                    <div class="invalid-feedback">Неверный логин</div>
                                                </div>
                                                <div class="new__login">
                                                    <input type="text" placeholder="Введите новый логин" :class="{
                                                        'form-control modal__input mt-4 mb-0': true,
                                                        'is-invalid': isInvalidNewLogin,
                                                    }" @input="checkNewLogin" v-model="newLogin">
                                                    <div class="invalid-feedback" v-if="newLoginError == 'Логин не должен совпадать со старым'">Логин не должен совпадать со старым</div>
                                                    <div class="invalid-feedback" v-else-if="newLoginError == 'Такой логин уже есть у других пользователей'">Такой логин уже есть у других пользователей</div>
                                                    <div class="invalid-feedback" v-else-if="newLoginError == 'Логин должен быть без пробела'">Логин должен быть без пробела</div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-secondary" data-bs-dismiss="modal" type="button">Отменить</button>
                                                <button class="btn btn-primary button__save__login" type="button" :disabled="isDisabledLogin">Изменить</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="button__for__changing__password">
                                <button class="btn btn-primary" type="button" @click="changePassword">Изменить пароль</button>
                            </div>
                            <div class="button__for__saving">
                                <button class="btn btn-primary" type="submit" @click="saveSettings">Сохранить изменения</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-8">
                        <div class="block__for__about__me">
                            <textarea name="about__me" rows="4" class="form-control mb-0" v-model="aboutMe"></textarea>
                            <p class="text-center about__me__text">краткий рассказ о себе - кто вы, чем занимаетесь и тд</p>
                        </div>
                        <div class="block__for__your__hobbies">
                            <input name="hobbies" class="form-control mt-4 mb-0" v-model="hobbies">
                            <p class="text-center hobbies__text">перечислите ваши интересы(хобби) через запятую</p>
                            <p class="text-center hobbies__text">например: футбол, рыбалка, вязание</p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<style scoped>
.settings * {
    margin: auto;
}

.form-control {
    margin-bottom: 20px;
}

.form-select {
    margin-bottom: 20px;
}

textarea {
    resize: none;
}

.yourself__text {
    width: auto;
}

.hobbies__text {
    width: auto;
}

.input__file {
    width: auto;
    margin: 8px 0 15px;
    padding: auto;
}

.btn {
    margin: 10px auto;
    display: block;
}

.modal-title {
    margin-right: 20px;
}

.button__save__login {
    margin-left: 20px;
}
</style>