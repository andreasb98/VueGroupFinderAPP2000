<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <form id="test" autocomplete="off">
        <h1>{{ $t("reg") }}</h1>

        <v-text-field :label="$t('fornavn')" name="firstname" v-model="firstname" required></v-text-field>

        <v-text-field :label="$t('etternavn')" name="lastname" v-model="lastname" required></v-text-field>

        <v-text-field v-model="email" label="Email" name="email" required></v-text-field>

        <v-text-field
          v-model="password"
          :label="$t('passord.passord')"
          name="password"
          type="password"
          required
        ></v-text-field>

        <v-text-field
          v-model="phonenumber"
          :label="$t('telefon')"
          :counter="8"
          name="phonenumber"
          required
        ></v-text-field>

        <v-checkbox :label=" $t ('agree')" required></v-checkbox>

        <v-btn class="mr-4" @click="register">{{ $t("reg") }}</v-btn>
        <v-btn @click="clear">{{ $t("clear") }}</v-btn>
        <v-spacer></v-spacer>
        <p class="error" v-html="error"></p>
        <p>{{msg}}</p>
      </form>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";

export default {
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phonenumber: "",
      msg: "",
      error: null
    };
  },
  methods: {
    async register() {
      try {
        const credentials = {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          phonenumber: this.phonenumber,
          password: this.password
        };
        const response = await AuthenticationService.register(credentials);
        this.msg = response.msg;
        await this.$router.push("/login");
      } catch (e) {
        this.msg = e.response.data.msg;
      }
    },

    clear: function() {
      this.firstname = "";
      this.lastname = "";
      this.email = "";
      this.password = "";
      this.phonenumber = "";
    }
  }
};
</script>

<style scoped>
</style>