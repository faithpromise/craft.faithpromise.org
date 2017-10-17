import axios from 'axios';

export default {

    send(params) {

        params.action = 'contactForm/sendMessage';
        // params[window.csrfTokenName] = window.csrfTokenValue;

        return axios.post('/', params);

    },

}