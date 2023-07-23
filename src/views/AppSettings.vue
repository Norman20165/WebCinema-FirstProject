<script>
 import axios from 'axios';

export default {
    data() {
        return {
            mainButtonDisabled: false,
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
            isInvalidOldPassword: false,
            oldPassword: '',
            isInvalidNewPassword: false,
            newPassword: '',
            newPasswordError: '',
            isDisabledPassword: true,
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
            };

            this.checkDisabled('login');
        },
        checkNewLogin() {
            if (this.newLogin == this.data.login) {
                this.newLoginError = 'Логин не должен совпадать со старым';
                this.isInvalidNewLogin = true;
            } else if (this.newLogin.trim() === '' && this.newLogin != '') {
                this.newLoginError = 'Логин должен быть без пробела';
                this.isInvalidNewLogin = true;
            } else {
                for (let i of this.allData) {
                    if (i.login == this.newLogin) {
                        this.newLoginError = 'Такой логин уже есть у других пользователей';
                        this.isInvalidNewLogin = true;
                        break;
                    } else {
                        this.isInvalidNewLogin = false;
                    };
                };
            };

            this.checkDisabled('login');
        },
        checkDisabled(what) {
            if (what == 'login') {
                if (this.oldLogin != '' && !this.isInvalidOldLogin && this.newLogin != '' && !this.isInvalidNewLogin) {
                    this.isDisabledLogin = false;
                } else {
                    this.isDisabledLogin = true;
                };
            } else {
                if (this.oldPassword != '' && !this.isInvalidOldPassword && this.newPassword != '' && !this.isInvalidNewPassword) {
                    this.isDisabledPassword = false;
                } else {
                    this.isDisabledPassword = true;
                };
            };
        },
        async saveNewLogin() {
            try {
                let response = await axios.get(`/new_login?id=${this.data._id}&login=${this.newLogin}`);
                
                if (response) {
                    localStorage.setItem('login', this.newLogin);
                };

                this.mainButtonDisabled = false;

                this.data.login = this.newLogin;
                this.oldLogin = '';
                this.newLogin = '';
            } catch (error) {
                this.$router.push({
                    name: 'error',
                });
            };
        },
        async changeLogin() {
            this.mainButtonDisabled = true;
        },
        closeSaveLogin () {
            this.mainButtonDisabled = false;
            this.oldLogin = '';
            this.newLogin = '';
            this.isDisabledLogin = true;
        },
        async changePassword() {
            this.mainButtonDisabled = true;
        },
        closeSavePassword() {
            this.mainButtonDisabled = false;
            this.oldPassword = '';
            this.newPassword = '';
            this.isDisabledPassword = true;
        },
        checkOldPassword() {
            if (this.oldPassword != this.data.password && this.oldPassword != '') {
                this.isInvalidOldPassword = true;
            } else {
                this.isInvalidOldPassword = false;
            };

            this.checkDisabled();
        },
        checkNewPassword() {
            if (this.newPassword == this.data.password) {
                this.isInvalidNewPassword = true;
                this.newPasswordError = 'Пароль не должен совпадать со старым';
            } else if (this.newPassword.trim() === '' && this.newPassword != '') {
                this.isInvalidNewPassword = true;
                this.newPasswordError = 'Пароль должен быть без пробела';
            } else {
                this.isInvalidNewPassword = false;
                this.newPasswordError = '';
            };

            this.checkDisabled();
        },
        saveNewPassword() {},
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
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeSaveLogin"></button>
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
                                                <button class="btn btn-secondary" data-bs-dismiss="modal" type="button" @click="closeSaveLogin">Отменить</button>
                                                <button class="btn btn-primary button__save__login" type="button" :disabled="isDisabledLogin" @click="saveNewLogin" data-bs-dismiss="modal">Изменить</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="button__for__changing__password">
                                <button class="btn btn-primary" type="button" @click="changePassword" data-bs-toggle="modal" data-bs-target="#staticBackdropp">Изменить пароль</button>
                                <div class="modal fade" id="staticBackdropp" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="staticBackdropLabel">Изменить пароль</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeSavePassword"></button>
                                            </div>
                                            <div class="modal-body">
                                                <div class="old__password">
                                                    <input type="password" placeholder="Введите старый пароль" :class="{
                                                        'form-control modal__input mt-4 mb-0': true,
                                                        'is-invalid': isInvalidOldPassword,
                                                    }" @input="checkOldPassword" v-model="oldPassword">
                                                    <div class="invalid-feedback">Неверный пароль</div>
                                                </div>
                                                <div class="new__password">
                                                    <input type="password" placeholder="Введите новый пароль" :class="{
                                                        'form-control modal__input mt-4 mb-0': true,
                                                        'is-invalid': isInvalidNewPassword,
                                                    }" @input="checkNewPassword" v-model="newPassword">
                                                    <div class="invalid-feedback" v-if="newPasswordError == 'Пароль не должен совпадать со старым'">Пароль не должен совпадать со старым</div>
                                                    <div class="invalid-feedback" v-else-if="newPasswordError == 'Пароль должен быть без пробела'">Пароль должен быть без пробела</div>
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <button class="btn btn-secondary" data-bs-dismiss="modal" type="button" @click="closeSavePassword">Отменить</button>
                                                <button class="btn btn-primary button__save__login" type="button" :disabled="isDisabledPassword" @click="saveNewPassword" data-bs-dismiss="modal">Изменить</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="button__for__saving">
                                <button class="btn btn-primary" type="submit" @click="saveSettings" :disabled="mainButtonDisabled">Сохранить изменения</button>
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