
import axios from 'axios';
const url = 'http://localhost:3000';



export default {
  
  // Andreas
  getEvents() {
    return axios.get(url + '/events');
  },
  // Andreas
  getEvent(id) {
    return axios.get(url + '/events/' + id);
  },
  // Tommy
  getMyEvent(id) {
    return axios.get(url + '/myevents/' + id);
  },
  // Tommy
  getMyEvents() {
    return axios.get(url + '/myevents');
  },
  // Tommy
  getEventAttendees(id) {
    return axios.get(url + '/attendees/' + id);
  },
  // Tommy  
  /*
  postJoinEvent() {
    return axios.post(url + '/attendees/create');
  },
  */
  // Tommy
  postJoinEvent(GruppeId, StudentId) {
    return axios.post(url + '/attendees/create', {
        params: {
          gruppeid: GruppeId,
          studentid: StudentId
        }
    }); 
  },
  // Tommy
  registerGroup(studentid, title, category, location, description) {
    return axios.post(url + '/events/create', {
        params: {
          studentid: studentid,
          title: title,
          category: category,
          location: location,
          description: description
        }
    }); 
  },
  /*
  leaveEvent(GruppeId, StudentId) {
    return axios.delete(url + '/attendees', { data: { gruppeid: GruppeId, studentid: StudentId}});
  }
  */
};

 
