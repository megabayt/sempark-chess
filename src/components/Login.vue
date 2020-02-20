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
        <label :for="`${flatId}-username`">Ваш логин <span class="required">*</span></label>
        <input type="text" :id="`${flatId}-username`" v-model="form.username" />
      </div>
      <div class="form-group">
        <label :for="`${flatId}-email`">Ваш E-mail <span class="required">*</span></label>
        <input type="text" :id="`${flatId}-email`" v-model="form.email" />
      </div>
      <div class="form-group">
        <label :for="`${flatId}-email`">Ваше Имя <span class="required">*</span></label>
        <input type="text" :id="`${flatId}-name`" v-model="form.name" />
      </div>
      <div class="form-group">
        <label :for="`${flatId}-vkId`">ID Вконтакте</label>
        <input type="text" :id="`${flatId}-vkId`" v-model="form.vkId" />
      </div>
      <div class="form-group">
        <label :for="`${flatId}-telegramId`">ID Telegram</label>
        <input type="text" :id="`${flatId}-telegramId`" v-model="form.telegramId" />
      </div>
      <div class="form-group">
        <label :for="`${flatId}-whatsappPhone`">Whatsapp (номер телефона)</label>
        <input type="text" :id="`${flatId}-whatsappPhone`" v-model="form.whatsappPhone" />
      </div>
      <div class="form-group">
        <label :for="`${flatId}-password`">Пароль <span class="required">*</span></label>
        <input type="password" :id="`${flatId}-password`" v-model="form.password" />
      </div>
      <div class="form-group">
        <label :for="`${flatId}-confirmPassword`">Подтвердите пароль <span class="required">*</span></label>
        <input type="password" :id="`${flatId}-confirmPassword`" v-model="form.confirmPassword" />
      </div>
      <button class="btn" @click="register()">Зарегистрироваться</button>
    </div>
    <div class="login" v-if="loginMode">
      <div class="form-group">
        <label :for="`${flatId}-username`">Ваш логин</label>
        <input type="text" :id="`${flatId}-username`" v-model="form.username" />
      </div>
      <div class="form-group">
        <label :for="`${flatId}-password`">Пароль</label>
        <input type="password" :id="`${flatId}-password`" v-model="form.password" />
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
  props: ["flatId"],
  data() {
    return {
      loginMode: false,
      form: {
        username: "",
        name: "",
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
    validateForm() {
      const { form } = this;

      for (let key in form) {
        if (key === "username" && !form[key]) {
          alert("Введите логин!");
          return false;
        }
        if (
          key === "email" &&
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g.test(
            form[key]
          )
        ) {
          alert("Введите E-mail в формате XXXX@XXX.XXX!");
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
      });
    },
    register() {
      if (!this.validateForm()) {
        return false;
      }
      const input = {
        ...this.form,
        flat: this.flatId
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
.form-group .required {
  color: #ff7f7f;
}
</style>