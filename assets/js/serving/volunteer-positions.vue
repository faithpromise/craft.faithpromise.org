<template>
  <div>

    <!--<volunteer-form></volunteer-form>-->

    <positions-filter
            :area-slug="selected_area"
            :skill-slug="selected_skill"
            @update:area="handle_area_update"
            @update:skill="handle_skill_update"
    >
    </positions-filter>

    <volunteer-position v-for="position in filtered_positions" :key="position.id" :position="position"></volunteer-position>

  </div>
</template>
<script>

    import positionsFilter from './volunteer-positions-filter.vue';
    import volunteerForm from './volunteer-signup-form.vue';
    import volunteerPosition from './volunteer-position.vue';
    import volunteer_service from './volunteer.service';

    export default {

        props: {},

        components: {
            positionsFilter,
            volunteerForm,
            volunteerPosition,
        },

        data() {

            let params = new URLSearchParams(window.location.search);

            return {
                selected_area:  params.get('area'),
                selected_skill: params.get('skill'),
                positions:      [],
            }
        },

        computed: {

            filtered_positions() {
                return this.positions.filter((position) => {

                    let satisfies_area  = (!this.selected_area) || this.selected_area === position.area.slug;
                    let satisfies_skill = (!this.selected_skill) || position.skills.filter(s => s.slug === this.selected_skill).length > 0;

                    return satisfies_area && satisfies_skill;

                });
            },

        },

        created() {
            this.load_positions();
        },

        methods: {

            load_positions() {
                volunteer_service.positions().then((result) => {
                    this.positions = result.data.data;
                });
            },

            handle_area_update(area) {
                console.log('handle_area_update', area);
                this.selected_area = area;
            },

            handle_skill_update(skill) {
                this.selected_skill = skill;
            },

        },

    }
</script>