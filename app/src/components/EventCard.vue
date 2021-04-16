<template>
  <router-link class="event-link" :to="{ name: 'event-show', params: { id: event.id } }">
    <!--//Andreas - Oppretter et contentkort, hvor informasjon blir hentet utfra
    event med tilsvarende event ID-->
    <div class="event-card -shadow">
      <p>{{ $t("group.study") }}: {{ event.category }}</p>
      <h4 class="title">{{ event.title }}</h4>
      <h6>{{ event.description }}</h6>
      <span class="text">
        <v-icon>mdi-account-multiple-outline</v-icon>
        {{ attendees.length }} {{ $t("event.attending") }}
      </span>
    </div>
  </router-link>
</template>

<script>
import EventService2 from "@/services/EventService2.js";
export default {
  props: {
    event: Object
  },
  data() {
    return {
      attendees: [],
    }
  },
  async created() {
    await EventService2.getEventAttendees(this.event.id)
      .then(response => {
        this.attendees = response.data;
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log("There was an error", error.response);
      });
  }
};
</script>

<style scoped>
.event-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
  border-radius: 10px;
  border: 1px;
  border-color: black;
  border-style: solid;
}
.event-card:hover {
  transform: scale(1.01);
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
.text {
  font-family: sans-serif;
}
</style>
