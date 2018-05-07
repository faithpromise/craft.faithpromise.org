import axios from 'axios';

export default {

    all(params) {
        return axios.get('/api/groups', { params });
    },

    find(slug) {
        return axios.get('/api/groups/' + slug);
    },

}