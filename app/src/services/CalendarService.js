import axios from 'axios';
const url = 'http://localhost:3000/api/';

export default {
    /*
    getAllReservations() {
        return axios.get(url + 'user/reservations')
            .then(response => response.data);
    },
    */

    getUserReservations() {
      return axios.get(url + 'user/userReservations')
             .then(response => response.data);
    },
    /*
    getAllRooms() {
        return axios.get(url + 'user/rooms')
            .then(response => response.data);
    },

    getGroupLeaderGroups() {
        return axios.get(url + 'user/groupLeader')
            .then(response => response.data);
    },

    getCalendar() {
            return axios.get(url + 'user/kalender')
                .then(response => response.data);
    },
    */

    getVacantRooms(nonFormatSelectedDate, selectedStart, selectedSlutt) {
            return axios.get(url + "user/vacantRooms/?date=" + nonFormatSelectedDate + "&start=" + selectedStart + "&slutt=" + selectedSlutt)
                .then(response => response.data);
    },

    reserveRoom(resInfo) {
            return axios.post(url + "user/reserveRoom", resInfo)
                .then(response => response.data);
    },

    cancelReservation(RID) {
            return axios.delete(url + 'user/cancelReservation/?RID=' + RID)
                .then(response => response.data);
    },

    updateReservation(RID, nyStartTid, nySluttTid, roomId) {
           return axios.post(url + 'user/updateReservation/?RID=' + RID + '&nyStartTid=' + nyStartTid + "&nySluttTid=" + nySluttTid + "&roomId=" + roomId)
               .then(response => response.data);
    },

    // Sjekk for lovlig redigering av reservasjoner
    checkGroupLeaderGroups(email, GID) {
        return axios.get(url + 'user/getGroupLeaderGroups/?RID=' + GID + '&email=' + email)
                .then(response => response.data);
    },
    // Henter alle gruppene til gruppeleder
    groupLeaderGroupsAll(email) {
        return axios.get(url + 'user/groupLeaderGroups/?email=' + email)
                .then(response => response.data);
    },
    /*
    
   isGroupLeader(email, GID, RID) {
        return axios.get(url + 'user/isGroupLeader/?email=' + email + "&GID=" + GID + "&RID=" + RID)
                .then(response => response.data);
    }
    */

};

