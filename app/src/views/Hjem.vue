<template>
  <div class="hjem">
    <v-container class="my-5">
      <UserCard />
      <router-link class="creategroup" :to="{ name: 'creategroup'}">
        <v-btn>{{ $t("group.new") }}</v-btn>
      </router-link>
      <h2>{{ $t("grupper") }}</h2>
      <!--Andreas - Hjem som displayer brukerinfo og en conditional rendering der det sjekkes
      om bruker er med i noen grupper-->
       <div v-if="!events.length">
        <p>
          {{ $t("group.ifgroup") }}
          <router-link to="/grupper">{{ $t("group.grouplink") }}</router-link>
          {{ $t("group.ifgroupjoin") }}
        </p>
      </div>
      <div v-else>
        <MyEventCard v-for="event in events" :key="event.id" :event="event" />
      </div>
      
    </v-container>
  </div>
</template>

<script>
// import Register from "../components/Register";
//import AuthenticationService from "../services/AuthenticationService";
import MyEventCard from "@/components/EventCard.vue";
import EventService2 from "@/services/EventService2.js";
import UserCard from "@/components/UserCard.vue";
//import store from "@/store/store";

// @ is an alias to /src
export default {
  components: {
    MyEventCard,
    UserCard
  },
  data() {
    return {
      events: []
    };
  },
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      await this.$router.push("/login");
    }

    await EventService2.getMyEvents()
      .then(response => {
        this.events = response.data;
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log("Error oppstått: " + error.response);
      });
  }
};
</script>

<style scoped>
.btn-primary:hover {
  color: black !important;
}
</style>
