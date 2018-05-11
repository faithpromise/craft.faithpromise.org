<template>

  <div>

    <div v-show="is_form_sent">
      <h2 class="GroupDetail-title">Thank you, {{ message.First_Name }}!</h2>
      <p>Your message was sent.</p>
    </div>

    <div v-show="!is_form_sent">

      <h2 class="GroupDetail-title">Interested?</h2>
      <p>Contact us for more information, or let us know if you'd like to join us soon.</p>

      <div class="GroupDetail-form">

        <form class="ContactForm" @submit.prevent="submit" v-show="!is_form_sent">
          <div class="ContactForm-half">
            <input type="text" placeholder="first name" v-model="message.First_Name" required>
            <input type="text" placeholder="last name" v-model="message.Last_Name" required>
          </div>
          <input type="text" placeholder="email" v-model="message.Email" required>
          <input type="text" placeholder="best phone # to reach you" v-model="message.Phone">
          <textarea name="body" v-model="message.Comments"></textarea>
          <label class="ContactForm-check">
            <input type="checkbox" v-model="save_message"> Save my info for future messages to other groups.
          </label>
          <button type="submit" :disabled="is_form_sending">{{ is_form_sending ? 'Sending...' : 'Send' }}</button>
        </form>

        <!--<p>We'll save your info so you won't have to type it again later.</p>-->

      </div>

    </div>

  </div>

</template>
<script>

    import groupInquiryService from './group-inquiry.service';
    import _client_storage from '../common/client-storage';

    let client_storage = _client_storage(window.localStorage);
    let local_data_key = 'group_contact_form';

    const FORM_STATE_IDLE    = 'idle';
    const FORM_STATE_SENDING = 'sending';
    const FORM_STATE_SENT    = 'sent';

    export default {

        props: {
            group: { required: true },
        },

        components: {},

        data() {
            return {
                message:      { Group_ID: this.group.slug, First_Name: '', Last_Name: '', Email: '', Phone: '', Comments: '', },
                save_message: true,
                form_state:   FORM_STATE_IDLE,
                is_sending:   true,
                is_sent:      true,
            }
        },

        computed: {

            is_form_sending() {
                return this.form_state === FORM_STATE_SENDING;
            },

            is_form_sent() {
                return this.form_state === FORM_STATE_SENT;
            },

        },

        watch: {
            save_message(value) {
                if (!value)
                    client_storage.remove(local_data_key);
            },
        },

        created() {
            this.loadLocalData();
        },

        methods: {

            loadLocalData() {
                let data = client_storage.get(local_data_key, {});

                // Be careful not to copy the Group_ID from a previous submission
                delete data.Group_ID;

                this.message = Object.assign(this.message, data);
            },

            submit() {

                if (this.form_state === FORM_STATE_SENDING)
                    return;

                this.form_state = FORM_STATE_SENDING;

                groupInquiryService.send(this.message)
                    .then(() => {
                        this.form_state = FORM_STATE_SENT;
                    })
                    .catch(() => {
                        this.form_state = FORM_STATE_IDLE;
                        alert('Oh no! An error occurred. Your message was not sent. Please try again or contact us for help.');
                    });

                if (this.save_message) {

                    // Be careful not to store the Group_ID
                    let data = Object.assign({}, this.message);
                    delete data.Group_ID;

                    client_storage.set(local_data_key, data);
                }

            },

        },

    }
</script>