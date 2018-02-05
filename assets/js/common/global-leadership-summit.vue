<template>
  <div style="text-align: center;">

    <!--Select ticket type-->
    <div v-show="!ticket_type">
      <p>Are you a regular attender at Faith Promise Church?</p>
      <button class="Button" type="button" @click="setAttender">Yes</button>
      <button class="Button" type="button" @click="setGuest">No</button>
    </div>

    <!--Select campus-->
    <div v-show="should_select_campus">
      <p>Choose the campus you'd like to attend the GLS. Feel free to attend the campus most convenient to you.</p>
      <button class="Button" type="button" @click="setCampus(index)" v-for="(campus, index) in campuses" style="margin: 0 .25em;">{{ campus.location }}</button>
    </div>

    <!--Code-->
    <div v-if="should_enter_code">
      <p>Let's get you registered for the {{ selected_campus.name }} Campus. Please enter the Faith Promise priority code.</p>
      <iframe :src="selected_campus.attender_url" width="350" height="100" style="border: 0;"></iframe>
      <p>
        If you're a regular attender at Faith Promise Church, and you don't have the church priority code, please contact Brenda Moore at <a href="mailto:brendam@faithpromise.org">brendam@faithpromise.org</a>.
      </p>
    </div>

    <!--Redirect-->
    <div v-show="should_show_redirect">
      <p>Please wait. We're redirecting you to the registration page...</p>
    </div>

    <p v-show="ticket_type">
      <span class="link" @click="startOver">Start Over</span>
    </p>

  </div>
</template>
<script>

    // import foo from './

    let ATTENDER = 'attender',
        GUEST    = 'guest';

    export default {

        props: {},

        components: {},

        data() {
            return {
                ticket_type:           null,
                selected_campus_index: null,

                campuses: [
                    {
                        name:         'Pellissippi',
                        location:     'West Knoxville',
                        guest_url:    'https://www.willowcreek.com/rega/#/reg/trans/one?invtID=EV-LSS1708-MAIN-269',
                        attender_url: 'https://www.willowcreek.com/events/leadership/central/regi/htmlhost.asp?siteid=145618',
                    },
                    {
                        name:         'Blount',
                        location:     'Maryville',
                        guest_url:    'https://www.willowcreek.com/rega/#/reg/trans/one?invtID=EV-LSS1708-MAIN-343',
                        attender_url: 'https://www.willowcreek.com/events/leadership/central/regi/htmlhost.asp?siteid=1432207',
                    },
                    {
                        name:         'North Knox',
                        location:     'North Knoxville',
                        guest_url:    'https://www.willowcreek.com/rega/#/reg/trans/one?invtID=EV-LSS1708-MAIN-453',
                        attender_url: 'https://www.willowcreek.com/events/leadership/central/regi/htmlhost.asp?siteid=1600046',
                    },
                ],

                PELLISSIPPI_CAMPUS: 'pel',
                NORTH_CAMPUS:       'north',
                BLOUNT_CAMPUS:      'blount',
            }
        },

        computed: {

            selected_campus() {
                return this.selected_campus_index === null ? null : this.campuses[this.selected_campus_index];
            },

            should_select_campus() {
                return this.ticket_type && !this.selected_campus;
            },

            should_enter_code() {
                return this.ticket_type === ATTENDER && this.selected_campus;
            },

            should_show_redirect() {
                return this.selected_campus && this.ticket_type === GUEST;
            },

        },

        watch: {
            should_show_redirect() {
                window.location.href = this.selected_campus.guest_url;
            },
        },

        methods: {

            setAttender() {
                this.ticket_type = ATTENDER;
            },

            setGuest() {
                this.ticket_type = GUEST;
            },

            setCampus(value) {
                this.selected_campus_index = value;
            },

            startOver() {
                this.ticket_type           = null;
                this.selected_campus_index = null;
            },

        },

    }
</script>