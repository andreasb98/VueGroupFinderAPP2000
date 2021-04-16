import axios from 'axios';

const state = {
  events: []
};

const getters = {
  allMyEvents: state => state.events
};

const actions = {
  async getMyEvents() { // egentlig async getMyEvents({ commit }) {
    const response = await axios.get(
      'http://localhost:3000/events'
    );
    return response;
    //commit('setMyEvents', response.data);
  }
  /*
  ,
  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

    commit('removeTodo', id);
  }
  */
};

const mutations = {
  setMyEvents: (state, events) => (state.events = events)
};

export default {
  state,
  getters,
  actions,
  mutations
};