import axios from 'axios';

export default {

    send(message) {
        return axios.post('/actions/ministryPlatform/groups/sendInquiry', { message });
    },

}