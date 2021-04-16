<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-snackbar
        v-model="snackbar"
        :bottom="y === 'bottom'"
        :color="color"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :right="x === 'right'"
        :timeout="timeout"
        :top="y === 'top'"
        :vertical="mode === 'vertical'"
      >
        {{ text }}
        <v-btn dark text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
      <v-card-title class="pb-0">
        <h1>{{ $t("login") }}</h1>
      </v-card-title>
      <v-card-text>
        <v-form id="test">
          <v-text-field
            v-model="email"
            label="Email"
            name="email"
            required
            prepend-icon="mdi-account-circle"
          ></v-text-field>

          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            :label="$t('passord.passord')"
            name="password"
            required
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-checkbox :label="$t('agree')" required></v-checkbox>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <router-link to="/">
          <v-btn class="mr-4" @click="login" color="info">{{$t("login")}}</v-btn>
        </router-link>
        <v-btn class="m4-4" @click="clear" color="info">{{$t("clear")}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";

export default {
  data() {
    return {
      showPassword: false,
      email: "",
      password: "",
      color: "",
      mode: "",
      snackbar: false,
      text: "Hello, I'm a snackbar",
      timeout: 6000,
      x: null,
      y: "top"
    };
  },
  methods: {
    async login() {
      try {
        const credentials = {
          email: this.email,
          password: this.password
        };
        const response = await AuthenticationService.login(credentials);
        this.msg = response.msg;

        const token = response.token;
        const user = response.user;

        await this.$store.dispatch("login", { token, user });

        await this.$router.push("/");
      } catch (e) {
        this.msg = e.response.data.msg;
      }
    },

    clear: function() {
      this.email = "";
      this.password = "";
    }
  }
};
</script>

<style scoped>
</style>