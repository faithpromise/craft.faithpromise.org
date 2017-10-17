<template>
  <form class="Form Form--center" @submit.prevent="send">

    <div class="Form-double">
      <div class="Form-group">
        <!--<label class="Form-label" for="first_name">First Name</label>-->
        <input class="Input" id="first_name" name="first_name" v-model="fields.first_name" placeholder="First Name" required>
      </div>
      <div class="Form-group">
        <!--<label class="Form-label" for="last_name">Last Name</label>-->
        <input class="Input" id="last_name" name="last_name" v-model="fields.last_name" placeholder="Last Name" required>
      </div>
    </div>

    <input class="Input" name="email" v-model="fields.email" placeholder="Email" required>
    <input class="Input" name="phone" v-model="fields.phone" placeholder="Phone Number">

    <textarea class="Textarea" placeholder="How would you like to volunteer?" v-model="fields.message" required></textarea>

    <div class="Form-actions">
      <button class="Submit" type="submit" :disabled="is_sending">{{ is_sending ? 'Sending...' : 'Send' }}</button>
    </div>

  </form>
</template>
<script>

    import mailer from '../common/mailer.service';

    export default {

        data() {
            return {
                is_sending: false,
                is_sent:    false,
                fields:     {
                    first_name: 'Brad',
                    last_name:  'Roberts',
                    email:      'bradr@faithpromise.org',
                    phone:      '865-973-2311',
                    message:    '',
                },
            }
        },

        methods: {

            send() {

                this.is_sending = true;

                mailer.send(this.fields)
                    .then((result) => {
                            console.log('success');
                            this.is_sending = false;
                        }
                    )
                    .catch((error) => {
                        console.log('error', error);
                        this.is_sending = false;
                    });
            },

        },

    }
</script>