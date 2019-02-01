<template>
  <form class="GroupSearchForm" @submit.prevent="">
    <group-address-input classes="GroupSearchForm-input" @input="go" :auto-focus="true"></group-address-input>
  </form>
</template>
<script>

  /**
   | Used on the groups page to start the search.
   | This component is part of the main Vue app, not part of the groups Vue app.
   */

  import groupAddressInput from './group-address-input.vue'

  export default {

    components: {
      groupAddressInput
    },

    methods: {

      go(coords) {
        window.location.href = '/groups/search/?location=' + coords.lat + ',' + coords.lng
      }

    }

  }
</script>
