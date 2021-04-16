<!--Kortet for brukerinformasjon som skal displayes på Hjem-viewet-->
<template>
  <div class="event-card -shadow">
    <div class="my-2">
      <router-link class="edit" :to="{ name: 'edit'}">
        <v-btn class="btn btn-primary" type="button">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </router-link>
    </div>
    <v-list-item three-line>
      <v-list-item-avatar size="80" color="gray">
        <v-icon size="80" color="gray">home</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <div class="overline">{{ $t("profil") }}</div>

        <hr />

        <span style="font-size: 15px; color: grey;">
          <v-icon size="25">person_pin</v-icon>
          {{ person.studNr }}
          <br />
          <v-icon size="25">mdi-account</v-icon>
          {{ person.fornavn }} {{ person.etternavn }}
          <br />
          <v-icon size="25">mdi-clipboard-text-outline</v-icon>
          {{ person.studie }}
        </span>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {
  data() {
    return {
      person: {
        studNr: "",
        fornavn: "",
        etternavn: "",
        epost: "",
        studie: "IT & Informasjonssystemer",
        tlf: ""
      }
    };
  },
  async created() {
    this.person.studNr = await this.$store.getters.getUser.id;
    this.person.fornavn = await this.$store.getters.getUser.firstname;
    this.person.etternavn = await this.$store.getters.getUser.lastname;
    this.epost = await this.$store.getters.getUser.email;
    this.tlf = await this.$store.getters.getUser.phonenumber;
  }
};
</script>

<style scoped>
.overline {
  float: left !important;
}
.my-2 {
  float: right !important;
}
.event-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
  border: 3px;
  border-radius: 5px;
  border-color: #555;
  border-style: solid;
}
.event-card:hover {
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.event-card > .title {
  margin: 0;
}
.event-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
  border-radius: 5px;
  border: 5px;
  border-color: black;
}
.btn-primary:hover {
  color: black !important;
}
</style>