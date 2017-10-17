<template>
  <form class="VolunteerFilter" method="get" v-if="is_loaded">
    <div>
      <span class="InlineLabel">Filter by</span>
    </div>
    <div>
      <select class="Select" name="area" v-if="areas.length" v-model="selected_area">
        <option :value="null" :selected="selected_area === null">All areas</option>
        <option v-for="area in areas" :value="area.slug" :selected="areaSlug === area.slug">{{ area.title }}</option>
      </select>
    </div>
    <div>
      <select class="Select" name="skill" v-if="skills.length" v-model="selected_skill">
        <option :value="null" :selected="!selected_skill">Any skill</option>
        <option v-for="skill in skills" :value="skill.slug" :selected="skillSlug === skill.slug">{{ skill.title }}</option>
      </select>
    </div>
    <!--<div>-->
      <!--<button class="Submit" type="submit">Filter</button>-->
    <!--</div>-->
  </form>
</template>
<script>

    import volunteer_service from './volunteer.service';

    export default {

        props: {
            areaSlug:  { default: null },
            skillSlug: { default: null },
        },

        components: {},

        data() {
            return {
                areas:          [],
                skills:         [],
                selected_area:  this.areaSlug,
                selected_skill: this.skillSlug,
                is_loaded:      false,
            }
        },

        computed: {},

        created() {

            axios.all([this.load_areas(), this.load_skills()]).then(() => {
                this.is_loaded = true;
            })

        },

        watch: {

            selected_area(value) {
                this.$emit('update:area', value);
            },

            selected_skill(value) {
                this.$emit('update:skill', value);
            },

        },

        methods: {

            load_areas() {
                return volunteer_service.areas().then((result) => {
                    this.areas = result.data.data;
                });
            },

            load_skills() {
                return volunteer_service.skills().then((result) => {
                    this.skills = result.data.data;
                });
            },

        },

    }
</script>