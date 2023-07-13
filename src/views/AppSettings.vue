<script>

</script>

<template>
    <div class="main__container container">
        <div class="block__for__main__title">
            <h2 class="text-center maim__title mt-2 mb-3">Настройки</h2>
        </div>
        <div class="settings mt-5 mb-3">
            <div class="block__for__first__name">
                <input type="text" placeholder="Имя" class="form-control input__first__name">
            </div>
            <div class="block__for__last__name">
                <input type="text" placeholder="Фамилия" class="form-control input__last__name">
            </div>
            <div class="block__for__sex">
                <select name="sex" class="form-select select__sex">
                    <option value="your__sex" selected>Ваш пол</option>
                    <option value="male">Мужской</option>
                    <option value="female">Женский</option>
                </select>
            </div>
            <div class="block__for__city">
                <input type="text" placeholder="Город" class="form-control input__city">
            </div>
            <div class="block__for__yourself">
                <textarea name="yourself" rows="5" class="form-control mb-0"></textarea>
                <p class="text-center yourself__text">краткий рассказ о себе - кто вы, чем занимаетесь и тд</p>
            </div>
            <div class="block__for__your__hobbies">
                <textarea name="hobbies" rows="5" class="form-control mt-4 mb-0"></textarea>
                <p class="text-center hobbies__text">перечислите ваши интересы(хобби) через запятую</p>
                <p class="text-center hobbies__text">например: футбол, рыбалка, вязание</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.settings * {
    margin: auto;
}

.form-control {
    width: 45%;
    margin-bottom: 20px;
}

.form-select {
    width: 45%;
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
</style>