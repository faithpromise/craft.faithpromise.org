<template>
  <form class="GroupSearchForm" @submit.prevent="">
    <group-address-input class="GroupSearchForm-input" @input="go"></group-address-input>
  </form>
</template>
<script>

    /**
     | Used on the groups page to start the search.
     | This component is part of the main Vue app, not part of the groups Vue app.
     */

    import groupAddressInput from './group-address-input.vue';

    export default {

        components: {
            groupAddressInput
        },

        methods: {

            go(place) {

                let location = place.geometry.location.lat() + ',' + place.geometry.location.lng();

                window.location.href = '/groups/search/?location=' + location;
            },

        },

    }
</script>