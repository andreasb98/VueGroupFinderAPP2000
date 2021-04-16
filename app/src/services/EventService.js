
import axios from "axios";
import store from "@/store/store";

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    "Authorization": `Bearer ${store.getters.getToken}`,
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
});


export default {
  
  // Andreas
  getEvents() {
    return apiClient.get("/events");
  },
  // Andreas
  getEvent(id) {
    return apiClient.get("/events/" + id);
  },
  getMyEvent(id) {
    return apiClient.get("/myevents/" + id);
  },
  // Tommy
  getMyEvents() {
    return apiClient.get("/myevents");
  },
  // Tommy
  getEventAttendees(id) {
    return apiClient.get("/attendees/" + id);
  },
  // Tommy
  postJoinEvent() {
    return apiClient.post("/attendees/create");
  },
  // Tommy
  postTest(GruppeId, StudentId) {
    return apiClient.post('/attendees/create', {
        params: {
          gruppeid: GruppeId,
          studentid: StudentId
        }
    });
    
    
    
  },
  apiClient
};
/*
export {
  apiClient
}
*/
 
