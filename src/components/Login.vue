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
        <span>Вы проживаете здесь?</span>
      </div>
      <div class="form-group">
        <label for="username">Ваше имя</label>
        <input type="text" id="username" v-model="form.username" />
      </div>
      <div class="form-group">
        <label for="email">E-mail</label>
        <input type="text" id="email" v-model="form.email" />
      </div>
      <div class="form-group">
        <label for="vkId">ID Вконтакте</label>
        <input type="text" id="vkId" v-model="form.vkId" />
      </div>
      <div class="form-group">
        <label for="telegramId">ID Telegram</label>
        <input type="text" id="telegramId" v-model="form.telegramId" />
      </div>
      <div class="form-group">
        <label for="whatsappPhone">Whatsapp (номер телефона)</label>
        <input type="text" id="whatsappPhone" v-model="form.whatsappPhone" />
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <input type="password" id="password" v-model="form.password" />
      </div>
      <div class="form-group">
        <label for="confirmPassword">Подтвердите пароль</label>
        <input type="password" id="confirmPassword" v-model="form.confirmPassword" />
      </div>
      <button class="btn" @click="register()">Зарегистрироваться</button>
    </div>
    <div class="login" v-if="loginMode">
      <div class="form-group">
        <label for="email">E-mail</label>
        <input type="text" id="email" v-model="form.email" />
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <input type="password" id="password" v-model="form.password" />
      </div>
      <button class="btn" @click="login()">Войти</button>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { GQL_AUTH_TOKEN } from "../contants";
import eventBus from "../eventBus";
import AppSwitch from "./Switch";

export default {
  components: { AppSwitch },
  props: ['flatId'],
  data() {
    return {
      loginMode: false,
      form: {
        username: "",
        email: "",
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
            identifier: this.form.email,
            password: this.form.password,
            provider: "local"
          }
        },
        update: this.afterLogin
      });
    },
    register() {
      const input = {
        ...this.form,
        flat: this.flatId,
      };

      delete input.confirmPassword;

      this.$apollo.mutate({
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
      });
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
</style>