<!--Andreas - Viewet for oppretting av ny gruppe-->
<template>
  <v-app>
    <v-card width="1000" class="mx-auto mt-5">
      <v-card-title class="pb-0">
        <h1>{{$t("group.new")}}</h1>
      </v-card-title>
      <v-spacer></v-spacer>
      <v-card-text>
        <v-form>
          <!--Tittel på gruppen-->
          <div class="flex">
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                width="400"
                :label="$t('group.title')"
                v-model="title"
                required
                filled
                prepend-icon="mdi-account-group-outline"
              />
            </v-col>
          </div>

          <!--Fagkode/Emne/kategori for gruppen-->
          <div class="flex">
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                width="400"
                :label="$t('event.category')"
                v-model="category"
                required
                filled
                prepend-icon="mdi-account-circle-outline"
              />
            </v-col>
          </div>
          <!--Sted/Location for gruppemøter/misc-->
          <div class="flex">
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                width="400"
                :label="$t('event.location')"
                v-model="location"
                filled
                required
                prepend-icon="mdi-cellphone"
              />
            </v-col>
          </div>
          <!--Eventuelle detaljer-->
          <div class="flex">
            <v-col cols="6">
              <v-container fluid class="details">
                <v-textarea
                  filled
                  auto-grow
                  v-model="description"
                  :label="$t('event.details')"
                  prepend-icon="mdi-details"
                  required
                ></v-textarea>
              </v-container>
            </v-col>
          </div>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <!--"Opprett" - knapp-->
        <v-btn color="info" @click="createGroup">
          <v-icon>mdi-account-multiple-plus</v-icon>
          {{ $t("group.create") }}
        </v-btn>

        <!--"Kanseller" - knapp-->
        <v-btn @click="$router.go(-1)" color="info">{{ $t("avbryt") }}</v-btn>
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
import EventService2 from "../services/EventService2";
export default {
  data() {
    return {
      title: "",
      category: "",
      location: "",
      description: "",
      studentId: "",
      snackbar: {
        show: false,
        snackText: "",
        color: null
      },
      timeout: 4000
    };
  },
  async created() {
    this.studentId = await this.$store.getters.getUser.id;
  },
  methods: {
    // Tommy
    createGroup() {
      EventService2.registerGroup(
        this.studentId,
        this.title,
        this.category,
        this.location,
        this.description
      )
        .then(response => {
          if (response.data.error) {
            this.snackbar.show = true;
            this.snackbar.color = "error";
            this.snackbar.snackText = response.data.error;
          } else {
            this.$router.go(-1);
          }
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log("Error oppsto" + error.message);
        });
    }
  }
};
</script>

<style scoped>
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
.details {
  padding: 0 !important;
}
</style>


