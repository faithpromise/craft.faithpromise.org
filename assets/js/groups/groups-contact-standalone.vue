<template>
  <groups-contact :group="group" v-if="group.id"></groups-contact>
</template>
<script>

    import groupService from './group.service';
    import groupsContact from './groups-contact.vue';

    export default {

        props: {
            id: { required: true },
        },

        components: {
            groupsContact,
        },

        data() {
            return {
                group: { id: null, },
            };
        },

        created() {
            this.load();
        },

        methods: {

            load() {
                groupService.find(this.id).then((result) => {
                    this.group = result.data.data[0];
                });
            },
        },

    }
</script>