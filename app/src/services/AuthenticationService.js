import axios from 'axios';
const url = 'http://localhost:3000/api/';

export default { // Eksporterer et objekt, post req til register end-point på express serveren og bruker 'credentials'.
    login(credentials) {
        return axios.post(url + 'auth/login', credentials)
            .then(response => response.data);
    },
    register(credentials) {
        return axios.post(url + 'auth/register', credentials)
            .then(respone => respone.data);
    }

    

};