<template>
  <div class="container">
    <div class="top">
      <app-switch
        label="Зарегистрироваться"
        rightLabel="Войти"
        :checked="loginMode"
        @change="toggleLoginMode"
      />
    </div>
    <div class="register" v-if="!loginMode">
      <div>
        <span>Вы проживаете здесь?</span> <br>
        <span>Номер вашей квартиры {{ flat.flatNo }}?</span> <br>
        <span>Заполните форму, чтобы зарегистрироваться</span>
      </div>
      <div class="form-group">
        <label :for="`${flat.id}-username`">
          Ваш логин
          <span class="required">*</span>
        </label>
        <input type="text" :id="`${flat.id}-username`" v-model="form.username" />
      </div>
      <div class="form-group">
        <label :for="`${flat.id}-name`">
          Ваше Имя
          <span class="required">*</span>
        </label>
        <input type="text" :id="`${flat.id}-name`" v-model="form.name" />
      </div>
      <div class="form-group">
        <label :for="`${flat.id}-vkId`">ID Вконтакте</label>
        <input type="text" :id="`${flat.id}-vkId`" v-model="form.vkId" />
      </div>
      <div class="form-group">
        <label :for="`${flat.id}-telegramId`">ID Telegram</label>
        <input type="text" :id="`${flat.id}-telegramId`" v-model="form.telegramId" />
      </div>
      <div class="form-group">
        <label :for="`${flat.id}-whatsappPhone`">Whatsapp (номер телефона)</label>
        <input type="text" :id="`${flat.id}-whatsappPhone`" v-model="form.whatsappPhone" />
      </div>
      <div class="form-group">
        <label :for="`${flat.id}-password`">
          Пароль
          <span class="required">*</span>
        </label>
        <input type="password" :id="`${flat.id}-password`" v-model="form.password" />
      </div>
      <div class="form-group">
        <label :for="`${flat.id}-confirmPassword`">
          Подтвердите пароль
          <span class="required">*</span>
        </label>
        <input type="password" :id="`${flat.id}-confirmPassword`" v-model="form.confirmPassword" />
      </div>
      <button class="btn" @click="register()">Зарегистрироваться</button>
    </div>
    <div class="login" v-if="loginMode">
      <div class="form-group">
        <label :for="`${flat.id}-username`">Ваш логин</label>
        <input type="text" :id="`${flat.id}-username`" v-model="form.username" />
      </div>
      <div class="form-group">
        <label :for="`${flat.id}-password`">Пароль</label>
        <input type="password" :id="`${flat.id}-password`" v-model="form.password" />
      </div>
      <button class="btn" @click="login()">Войти</button>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import get from "lodash/get";
import uuid from "uuid/v4";
import { GQL_AUTH_TOKEN } from "../contants";
import eventBus from "../eventBus";
import AppSwitch from "./Switch";

export default {
  components: { AppSwitch },
  props: ["flat"],
  data() {
    return {
      loginMode: false,
      form: {
        username: "",
        name: "",
        password: "",
        confirmPassword: "",
        vkId: "",
        telegramId: "",
        whatsappPhone: ""
      }
    };
  },
  methods: {
    toggleLoginMode() {
      this.loginMode = !this.loginMode;
    },
    validateForm() {
      const { form } = this;

      for (let key in form) {
        if (key === "username" && !form[key]) {
          alert("Введите логин!");
          return false;
        }
        if (key === "name" && !form[key]) {
          alert("Введите имя!");
          return false;
        }
        if (key === "vkId" || key === "telegramId") {
          if (form[key] && !/[A-Za-z\d_]/g.test(form[key])) {
            alert(
              `${key} может состоять только из латинских букв, цифр и знака подчеркивания`
            );
            return false;
          }
        }
        7914526456456456;
        if (
          key === "whatsappPhone" &&
          form.whatsappPhone &&
          !/79\d{9}$/g.test(form.whatsappPhone)
        ) {
          alert("Введите номер whatsapp в формате 79XXXXXXXXX");
          return false;
        }
        if (key === "password") {
          if (!form[key]) {
            alert("Введите пароль");
            return false;
          }
          if (form[key].length < 6) {
            alert("Пароль должен быть больше 6 символов!");
            return false;
          }
        }
      }

      if (form.password !== form.confirmPassword) {
        alert("Пароли не совпадают!");
        return false;
      }
      return true;
    },
    login() {
      this.$apollo.mutate({
        mutation: gql`
          mutation login($input: UsersPermissionsLoginInput!) {
            login(input: $input) {
              jwt
            }
          }
        `,
        variables: {
          input: {
            identifier: this.form.username,
            password: this.form.password,
            provider: "local"
          }
        },
        update: this.afterLogin
      })
      .then(() => {})
      .catch(this.handleError);
    },
    register() {
      if (!this.validateForm()) {
        return false;
      }
      const input = {
        ...this.form,
        email: `${uuid()}@sempark.xyz`,
        flat: this.flat.id
      };

      delete input.confirmPassword;

      this.$apollo
        .mutate({
          mutation: gql`
            mutation register($input: UserInput!) {
              register(input: $input) {
                jwt
              }
            }
          `,
          variables: {
            input
          },
          update: this.afterLogin
        })
        .then(() => {})
        .catch(this.handleError);
    },
    afterLogin(cache, { data }) {
      const jwt =
        (data.login && data.login.jwt) ||
        (data.register && data.register.jwt) ||
        "";
      if (jwt) {
        localStorage.setItem(GQL_AUTH_TOKEN, jwt);
        eventBus.$data.loggedIn = true;
      }
    },
    handleError(error) {
      const messages = get(
        error,
        "networkError.result.errors[0].extensions.data[0].messages"
      );
      const id = get(messages, "[0].id");
      const message = get(messages, "[0].id");
      if (id === "Auth.form.error.username.taken") {
        alert("Данный логин уже занят, попробуйте другой");
        return;
      }
      if (id === "Auth.form.error.invalid") {
        alert("Неверный логин или пароль");
        return;
      }
      alert(message);
    }
  }
};
</script>

<style scoped>
.container {
  min-width: 270px;
}
.form-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  max-width: 270px;
  text-align: left;
}
.form-group > * {
  margin: 0 5px;
}
.form-group .required {
  color: #ff7f7f;
}
</style>