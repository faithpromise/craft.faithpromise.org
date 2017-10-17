<template>
  <form class="ReadingPlanNav" method="get" :action="form_action">
    <div class="ReadingPlanNav-container">
      <div>
        <select class="Select" v-model="selected_month">
          <option v-for="(name, index) in months" :value="index" :selected="index == selected_month">{{ name }}</option>
        </select>
      </div>
      <div>
        <select class="Select" v-model="selected_day">
          <option v-for="value in days" :value="value" :selected="value === selected_day">{{ value }}</option>
        </select>
      </div>
      <div>
        <button class="Submit" type="submit">Go</button>
      </div>
    </div>
  </form>
</template>
<script>

    export default {

        props: {
            month: { required: true }, // 1-12
            day:   { required: true }, // 1-31
        },

        components: {},

        data() {
            return {
                selected_month: this.month - 1, // months are zero indexed in JS
                selected_day:   this.day,
                months:         ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            }
        },

        computed: {

            days() {
                let now = new Date();
                return new Date(now.getFullYear(), this.selected_month + 1, 0).getDate();
            },

            form_action() {
                let now          = new Date(),
                    reading_date = new Date(now.getFullYear(), this.selected_month, this.selected_day);
                return '/bible-plan/' + this.months[reading_date.getMonth()].toLowerCase() + '-' + this.selected_day;
            },

        },

        created() {


        },

        methods: {}

    }
</script>