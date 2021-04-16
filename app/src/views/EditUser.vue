<!--Andreas - Kort der bruker kan se/endre brukerinformasjon samt endring av passord-->
<template>
  <v-app>
    <v-card width="1100" class="mx-auto mt-5">
      <v-card-title class="pb-0">
        <h1>{{ message }}</h1>
      </v-card-title>
      <v-card-text>
        {{$t("profil")}} for student nr - {{person.studNr}}
        <v-form>
          <!--Fornavn-->
          <div class="flex">
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                width="400"
                dense 
                :label="this.person.fornavn" 
                v-model="newFname"
                filled
                prepend-icon="mdi-account-circle"
              />
            </v-col>
            <v-btn class="flexButton" @click="updateFirstName">{{ $t("save") }}</v-btn>
          </div>
          <!--Etternavn-->
          <div class="flex">
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                width="400"
                dense
                :label="this.person.etternavn"
                v-model="newLname"
                filled
                prepend-icon="mdi-account-circle-outline"
              />
            </v-col>
            <v-btn class="flexButton" @click="updateLastName">{{ $t("save") }}</v-btn>
          </div>
          <!--Telefon-->
          <div class="flex">
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                width="400"
                dense
                :label="this.person.tlf"
                v-model="newPhone"
                filled
                prepend-icon="mdi-cellphone"
              />
            </v-col>
            <v-btn class="flexButton" @click="updatePhone">{{ $t("save") }}</v-btn>
          </div>
          <!--email-->
          <div class="flex">
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                width="400"
                dense
                :label="this.person.epost"
                v-model="newEmail"
                filled
                prepend-icon="mdi-at"
              />
            </v-col>
            <v-btn class="flexButton" @click="updateEmail">{{ $t("save") }}</v-btn>
          </div>
          <!--Knapp for videresending til endring av passord-->
          <v-col cols="12" sm="6" md="6">
            <div class="flexPassord">
              <v-icon>mdi-shield-lock</v-icon>
              <h2>{{ $t("passord.passord") }}</h2>

              <router-link class="passordlink" :to="{ name: 'passord'}">
                <v-btn color="yellow">
                  <v-icon>mdi-pencil</v-icon>
                  {{ $t("passord.endre") }}
                </v-btn>
              </router-link>
            </div>
            <p class="passord">{{ $t("passord.rules") }}</p>
          </v-col>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <!--"Tilbake" - knapp-->
        <v-btn a href="/" color="info">
          <v-icon>mdi-arrow-left</v-icon>
          {{ $t("tilbake") }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <div class="text-center">
      <v-snackbar :color="snackbar.color" v-model="snackbar.show" :timeout="timeout">
        {{ snackbar.snackText }}
        <v-btn color="white" text @click="snackbar.show = false">Lukk</v-btn>
      </v-snackbar>
    </div>
  </v-app>
</template>

<script>
import UpdateUserService from "../services/UpdateUserService";

export default {
  data() {
    return {
      message: "",
      newFname: "",
      newLname: "",
      newPhone: "",
      newEmail: "",
      showPassword: false,
      person: {
        studNr: "",
        fornavn: "",
        etternavn: "",
        epost: "",
        studie: "IT & Informasjonssystemer",
        tlf: ""
      },
      snackbar: {
        show: false,
        snackText: "",
        color: null
      },
      timeout: 4000
    };
  },
  async created() {
    this.person.studNr = await this.$store.getters.getUser.id;
    this.person.fornavn = await this.$store.getters.getUser.firstname;
    this.person.etternavn = await this.$store.getters.getUser.lastname;
    this.person.epost = await this.$store.getters.getUser.email;
    this.person.tlf = await this.$store.getters.getUser.phonenumber;
  },
  methods: {
    // Tommy
    updateFirstName() {
      UpdateUserService.updateFirstName(this.newFname, this.person.studNr)
        .then(response => {
          if (response.data.error) {
            this.snackbar.show = true;
            this.snackbar.color = "error";
            this.snackbar.snackText = response.data.error;
          } else {
            const user = response.data.user;
            this.updateUser(user);
            this.person.fornavn = this.$store.getters.getUser.firstname;
            this.snackbar.show = true;
            this.snackbar.color = "success";
            this.snackbar.snackText = response.data.msg;
          }
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log("Error oppsto" + error);
        });
    },
    // Tommy
    updateLastName() {
      UpdateUserService.updateLastName(this.newLname, this.person.studNr)
        .then(response => {
          if (response.data.error) {
            this.snackbar.show = true;
            this.snackbar.color = "error";
            this.snackbar.snackText = response.data.error;
          } else {
            const user = response.data.user;
            this.updateUser(user);
            this.person.etternavn = this.$store.getters.getUser.lastname;
            this.snackbar.show = true;
            this.snackbar.color = "success";
            this.snackbar.snackText = response.data.msg;
          }
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log("Error oppstått: " + error.response);
        });
    },
    // Tommy
    updatePhone() {
      UpdateUserService.updatePhone(this.newPhone, this.person.studNr)
        .then(response => {
          if (response.data.error) {
            this.snackbar.show = true;
            this.snackbar.color = "error";
            this.snackbar.snackText = response.data.error;
          } else {
            const user = response.data.user;
            this.updateUser(user);
            this.person.tlf = this.$store.getters.getUser.phonenumber;
            this.snackbar.show = true;
            this.snackbar.color = "success";
            this.snackbar.snackText = response.data.msg;
          }
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log("Error oppstått: " + error.response);
        });
    },
    // Tommy
    updateEmail() {
      UpdateUserService.updateEmail(this.newEmail, this.person.studNr)
        .then(response => {
          if (response.data.error) {
            this.snackbar.show = true;
            this.snackbar.color = "error";
            this.snackbar.snackText = response.data.error;
          } else {
            const user = response.data.user;
            this.updateUser(user);
            this.person.epost = this.$store.getters.getUser.email;
            this.snackbar.show = true;
            this.snackbar.color = "success";
            this.snackbar.snackText = response.data.msg;
          }
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log("Error oppstått: " + error.response);
        });
    },
    // Tommy
    updateUser(user) {
      this.$store.commit("updateUser", user);
    }
  }
};
</script>

<style scoped>
.passordlink {
  padding-inline: 20%;
}
.passord {
  margin-left: 5%;
}
.flexPassord {
  display: flex;
}
h2 {
  padding-inline: 2%;
}
.fag {
  border: 1px;
  border-color: black;
}
.flex {
  display: flex;
}
.flexButton {
  margin-top: 2%;
}
</style>