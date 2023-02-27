<template>
  <form @submit.prevent="registerUser">
    <label>
      Username:
      <input type="text" v-model="username" />
    </label>
    <label>
      Email:
      <input type="email" v-model="email" />
    </label>
    <label>
      Password:
      <input type="password" v-model="password" />
    </label>
    <button type="submit">Register</button>
  </form>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import { User } from "~/types/user";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  created() {
    if (this.$auth.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    async registerUser() {
      const user = new User(this.$auth);
      const isRegistered = await user.register({
        username: this.username,
        email: this.email,
        password: this.password,
      });
      if (isRegistered) {
        this.$router.push("/dashboard");
      }
    },
  },
};
</script>
