<template>
  <input
          id="js_search_by_address"
          name="location"
          placeholder="enter your address or zip">
</template>
<script>

    import googleMaps from '../common/google-maps';

    let autocomplete;

    export default {

        mounted() {

            googleMaps.load().then(() => {

                // Create the autocomplete object, restricting the search to geographical
                // location types.
                autocomplete = new window.google.maps.places.Autocomplete(
                    document.getElementById('js_search_by_address'),
                    {
                        // types:        ['regions'],
                        bounds:       { south: 35.28751442194987, west: -85.4336097868972, north: 36.62144069578115, east: -82.7144935759597 },
                        strictBounds: true,

                    }
                );

                // When the user selects an address from the dropdown, populate the address
                // fields in the form.
                autocomplete.addListener('place_changed', this.onSelect);

            });

        },

        methods: {

            onSelect() {

                let place    = autocomplete.getPlace(),
                    location = place.geometry.location.lat() + ',' + place.geometry.location.lng();

                this.$emit('input', location);

            },

        },

    }
</script>