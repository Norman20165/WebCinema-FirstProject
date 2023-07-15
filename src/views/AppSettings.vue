<script>
 import axios from 'axios';

export default {
    data() {
        return {
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
        };
    },
    methods: {
        async loadData() {
            this.data = (await axios.get(`/logins?login=${localStorage.login}`)).data;
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
            await axios.get(`/delete_account?id=${this.data._id}`);
            console.log('ok');
        },
        async changeLogin() {},
        async changePassword() {},
        async saveSettings() {},
    },
    mounted() {
        this.loadData();
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
                                <button class="btn btn-primary" type="button" @click="changeLogin">Изменить логин</button>
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
</style>