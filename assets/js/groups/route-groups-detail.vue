<template>
  <modal :show="group.id" :title="group.title" @close="closeHandler">

    <div v-if="group.id">

      <!--<h2 class="GroupDetail-title margin-top-0">Details</h2>-->

      <p class="margin-top-0">{{ group.description }}</p>

      <p>We're an {{ group.category.title }} Group which means we primarily focus on {{ group.category.description }} Our group is led by {{ group.leaders.toSentence() }} and usually meets on {{ group.day_of_week }}s at {{ group.start_time }}.</p>

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
            <button type="submit" :disabled="is_form_sending">{{ is_form_sending ? 'Sending...' : 'Send' }}</button>
          </form>

          <p>We'll save your info so you won't have to type it again later.
            <!--<label class="ContactForm-check">-->
            <!--<input type="checkbox" v-model="save_message"> Save my info for future messages.-->
            </label>
          </p>

        </div>

      </div>

    </div>

  </modal>
</template>
<script>

    import groupService from './group.service';
    import groupInquiryService from './group-inquiry.service';
    import modal from '../common/modal.vue';
    import _client_storage from '../common/client-storage';

    let client_storage = _client_storage(window.localStorage);
    let local_data_key = 'group_contact_form';

    const FORM_STATE_IDLE    = 'idle';
    const FORM_STATE_SENDING = 'sending';
    const FORM_STATE_SENT    = 'sent';

    export default {

        props: {},

        components: {
            modal,
        },

        data() {
            return {
                group:        {},
                message:      { Group_ID: null, First_Name: '', Last_Name: '', Email: '', Phone: '', Comments: '', },
                save_message: true,
                form_state:   FORM_STATE_IDLE,
                is_sending:   true,
                is_sent:      true,
            }
        },

        computed: {
            is_form_idle() {
                return this.form_state === FORM_STATE_IDLE;
            },

            is_form_sending() {
                return this.form_state === FORM_STATE_SENDING;
            },

            is_form_sent() {
                return this.form_state === FORM_STATE_SENT;
            },
        },

        created() {
            this.load();
            this.loadLocalData();
        },

        methods: {

            load() {
                groupService.find(this.$route.params.slug).then((result) => {
                    this.group            = result.data.data[0];
                    this.message.Group_ID = result.data.data[0].id;
                });
            },

            closeHandler() {
                this.$router.go(-1);
            },

            loadLocalData() {
                let data = client_storage.get(local_data_key, {});

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

                client_storage.set(local_data_key, this.message);

            },

        },

    }
</script>