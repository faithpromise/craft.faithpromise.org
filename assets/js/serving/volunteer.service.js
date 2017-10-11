import axios from 'axios';

export default {

    positions(params) {
        return axios.get('/api/volunteer-positions', { params });
    },

    areas() {
        return axios.get('/api/volunteer-areas');
    },

    skills() {
        return axios.get('/api/volunteer-skills');
    },

}