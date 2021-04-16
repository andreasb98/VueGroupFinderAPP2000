
import axios from "axios";
const url = 'http://localhost:3000/api';

/*
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: false,
  headers: {
    'Authorization': `Bearer ${store.state.token}`,
    "Accept": "application/json",
    "Content-Type": "application/json"
  }
});
*/


export default {
  // Tommy
  updateFirstName(newFname, StudentId) {
    return axios.post(url + '/auth/update/firstname', {
        params: {
          newfirstname: newFname,
          studentid: StudentId
        }
    });
  },
  // Tommy
  updateLastName(newLname, StudentId) {
    return axios.post(url + '/auth/update/lastname', {
        params: {
          newlastname: newLname,
          studentid: StudentId
        }
    });
  },
  // Tommy
  updatePhone(newPhone, StudentId) {
    return axios.post(url + '/auth/update/phone', {
        params: {
          newphone: newPhone,
          studentid: StudentId
        }
    });
  },
  // Tommy
  updateEmail(newEmail, StudentId) {
    return axios.post(url + '/auth/update/email', {
        params: {
          newemail: newEmail,
          studentid: StudentId
        }
    });
  }
};

 
