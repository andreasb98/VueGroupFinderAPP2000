<!-- Tommy og Andreas i template -->
<template>
  <div class="Grupper">
    <div class="text-center ma-2">
      <v-btn dark @click="snackbar = true">INFO</v-btn>
      <v-snackbar v-model="snackbar" top="top">
        {{ text }}
        <v-btn color="pink" text @click="snackbar = false">Lukk</v-btn>
      </v-snackbar>
    </div>

    <v-text-field v-model="search" :placeholder="$t('group.search')"></v-text-field>
    <v-container class="my-5">
      <!-- <h1>{{ $t("nav.groups") }}</h1> -->
      <EventCard v-for="event in filteredEvents" :key="event.id" :event="event" />
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";
import EventService2 from "@/services/EventService2.js";

export default {
  components: {
    EventCard
  },
  data() {
    return {
      events: [],
      search: "",
      snackbar: false,
      text: "Klikk på gruppe for mere info og innmelding"
    };
  },
  // Tommy / Andreas
  created() {
    EventService2.getEvents()
      .then(response => {
        this.events = response.data;
        
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log("Error oppstått: " + error.response);
      });
  },
  computed: {
    // Tommy
    filteredEvents: function() {
      return this.events.filter(event => {
        return (
          event.title.toLowerCase().match(this.search.toLowerCase()) ||
          event.description.toLowerCase().match(this.search.toLowerCase()) ||
          event.category.toLowerCase().match(this.search.toLowerCase())
        );
      });
    }
  }
};
</script>

<style scoped></style>
