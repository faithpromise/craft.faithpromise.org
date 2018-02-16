import axios from 'axios';

export default {

    all(params) {
        return axios.get('/api/groups/categories', { params });
    },

}