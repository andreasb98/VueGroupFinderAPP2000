<!--Andreas
Denne filen oppretter viewet som skal vises i det man trykker på en gruppe.
I metoder kan man se at data() henter ut events som objekter. 
Events er i denne sammenheng grupper. Gruppeinformasjonen blir hentet ut 
ved event.description, event.attendees og lignende.-->

<template>
  <div>
    <v-btn class="back" @click="$router.go(-1)" color="info">
      <v-icon>mdi-arrow-left</v-icon>
      {{ $t("tilbake") }}
    </v-btn>
    <v-container class="my-5">
      <div>
        <div class="event-header">
          <h1 class="title">{{ event.title }}</h1>
          <h5>{{ $t("event.organizer") }} {{ event.organizer }}</h5>
          <h5>{{ $t("event.category") }}: {{ event.category }}</h5>
        </div>
        <BaseIcon name="map">
          <h2>{{ $t("event.location") }}</h2>
        </BaseIcon>
        <address>{{ event.location }}</address>
        <h2>{{ $t("event.details") }}</h2>
        <p>{{ event.description }}</p>
        <h2>
          {{ $t("event.attendees") }}
          <span class="badge badge-info">
            {{
            attendees ? attendees.length : 0
            }}
          </span>
        </h2>
        <ul class="list-group">
          <li v-for="(attendee, index) in attendees" :key="index" class="list-item">
            <b>{{ attendee.name }}</b>
          </li>
        </ul>
      </div>
    </v-container>
  </div>
</template>

<script>
import EventService2 from "@/services/EventService2.js";
import store from "@/store/store";

export default {
  props: ["id"],
  data() {
    return {
      event: {},
      attendees: [],
      studentId: ""
    };
  },
  async created() {
    this.studentId = await store.getters.getUser.id;
    await EventService2.getMyEvent(this.id)
      .then(response => {
        this.event = response.data;
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.log("There was an error", error.response);
      });
    await EventService2.getEventAttendees(this.id)
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
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
.badge-info {
  background-color: #3871f7;
}
</style>


