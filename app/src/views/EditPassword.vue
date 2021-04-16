<!--Andreas - Kort for endring av passord-->
<template>
  <v-app>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title class="pb-0">
        <h1></h1>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            id="toggle"
            :type="showPassword ? 'text' : 'password'"
            :label="$t('passord.current')"
            prepend-icon="mdi-lock-question"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />

          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            :label="$t('passord.new')"
            prepend-icon="mdi-lock"
          />
          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            :label="$t('passord.confirm')"
            prepend-icon="mdi-lock-check"
          />
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <!--"Lagre" - knapp-->
        <v-btn a href="/" color="info">{{ $t("save") }}</v-btn>

        <!--"Kanseller" - knapp-->
        <v-btn @click="$router.go(-1)" color="info">{{ $t("avbryt") }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false
    };
  }
};
</script>