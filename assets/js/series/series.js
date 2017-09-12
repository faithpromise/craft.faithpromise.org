import axios from 'axios';

export default {

    paginate(params) {
        return axios.get('/sermons', { params });
    },

}