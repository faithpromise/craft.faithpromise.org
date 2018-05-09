<template>
  <modal :show="group.id" :title="group.title" @close="closeHandler">

    <div v-if="group.id">

      <p class="margin-top-0">{{ group.description }}</p>

      <p>We're an {{ group.category.title }} Group which means we primarily focus on {{ group.category.description }} Our group is led by {{ group.leaders.toSentence() }} and usually meets on {{ group.day_of_week }}s at {{ group.start_time }}.</p>

      <groups-contact :group="group"></groups-contact>

    </div>

  </modal>
</template>
<script>

    import groupService from './group.service';
    import modal from '../common/modal.vue';
    import groupsContact from './groups-contact.vue';

    export default {

        props: {},

        components: {
            modal,
            groupsContact,
        },

        data() {
            return {
                group: {},
            }
        },

        created() {
            this.load();
        },

        methods: {

            load() {
                groupService.find(this.$route.params.slug).then((result) => {
                    this.group = result.data.data[0];
                });
            },

            closeHandler() {
                this.$router.go(-1);
            },

        },

    }
</script>