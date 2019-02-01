<template>
  <div>
    <div class="GroupCriteria-address" v-show="location">
      <span>{{ formattedAddress }}</span>
      <span class="GroupCriteria-addressClose" @click="reset">remove</span>
    </div>
    <input
       ref="address"
       name="location"
       v-show="!location"
       v-model="inputAddress"
       :class="classes"
       :placeholder="placeholder">
  </div>
</template>
<script>
  import googleMaps from '../common/google-maps'

  let autocomplete

  export default {
    props: {
      location: {
        type: Object,
        default: null
      },
      placeholder: {
        type: String,
        default: 'enter your starting place'
      },
      classes: {
        type: String,
        default: ''
      },
      autoFocus: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        inputAddress: null,
        formattedAddress: ''
      }
    },

    mounted() {
      if (this.autoFocus) {
        this.$refs.address.focus()
      }

      googleMaps.load().then(() => {
        const elem = this.$refs.address

        // Create the autocomplete object, restricting the search to geographical
        // location types.
        autocomplete = new window.google.maps.places.Autocomplete(
          elem,
          {
            // types:        ['regions'],
            bounds: {
              south: 35.28751442194987,
              west: -85.4336097868972,
              north: 36.62144069578115,
              east: -82.7144935759597
            },
            strictBounds: true
          }
        )

        autocomplete.addListener('place_changed', this.onSelect)
      })
    },

    watch: {
      location: {
        immediate: true,
        handler(value) {
          if (value) {
            this.reverseGeocode()
          } else {
            this.clearAddress()
          }
        }
      }
    },

    methods: {
      reset() {
        this.$emit('input', null)
      },

      clearAddress() {
        this.formattedAddress = ''
        this.inputAddress = ''
        this.$nextTick(() => {
          this.$refs.address.focus()
        })
      },

      onSelect() {
        const place = autocomplete.getPlace()
        this.inputAddress = place.formatted_address
        this.formattedAddress = formatAddress(place.address_components)
        this.$emit('input', {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})
      },

      reverseGeocode() {
        if (!this.location) {
          return
        }

        this.$emit('geocode:start')
        googleMaps.load().then(() => {
          let geocoder = new google.maps.Geocoder
          let latlng = new google.maps.LatLng(this.location.lat, this.location.lng)

          geocoder.geocode({location: latlng}, (results, status) => {
            if (status === 'OK' && results[0]) {
              this.formattedAddress = formatAddress(results[0].address_components)
              this.$emit('geocode:complete')
            }
          })
        })
      }
    }
  }

  function formatAddress(components) {
    let street_number = '',
      address = [],
      rules = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'short_name',
        administrative_area_level_1: 'short_name',
        postal_code: 'short_name'
      }

    for (let part_idx = 0; part_idx < components.length; part_idx++) {
      let part = components[part_idx]
      for (let type_idx = 0; type_idx < part.types.length; type_idx++) {
        let type = part.types[type_idx]
        if (rules.hasOwnProperty(type)) {
          if (type === 'street_number') {
            street_number = part[rules[type]]
          } else {
            address.push(part[rules[type]])
          }
        }
      }
    }

    return (street_number + ' ' + address.join(', ')).trim()
  }
</script>
