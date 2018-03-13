<template>
  <form class="GroupCriteria" @submit.prevent>

    <select class="GroupCriteria-input" v-model="location" v-show="!show_address_search">
      <option :value="null">Any area</option>
      <option disabled>- - - - - - - -</option>
      <option v-for="item in locations_list" :key="item.id" :value="item.location">{{ item.name }}</option>
      <option disabled>- - - - - - - -</option>
      <option value="new">Enter a New Address</option>
    </select>

    <group-address-input class="GroupCriteria-input" @input="updateLocation" v-if="show_address_search"></group-address-input>

    <div class="GroupCriteria-row">
      <div>
        <select class="GroupCriteria-input" v-model="selected_category">
          <option :value="null">Any Group Type</option>
          <option v-for="category in categories" :key="category.id" :value="category.slug">{{ category.title }}{{ category.subtitle ? ' - ' + category.subtitle : '' }}</option>
        </select>
      </div>
      <div>
        <select class="GroupCriteria-input" v-model="selected_life_stage">
          <option :value="null">Any Life Stage</option>
          <option v-for="life_stage in life_stages" :key="life_stage.id" :value="life_stage.slug">{{ life_stage.title }}</option>
        </select>
      </div>
    </div>
  </form>
</template>
<script>

    import axios from 'axios';
    import googleMaps from '../common/google-maps';
    import campusService from '../campuses/campus.service';
    import categoryService from './group-categories.service';
    import lifeStageService from './group-life-stages.service';
    import groupAddressInput from './group-address-input.vue';

    let old_location = null;

    export default {

        props: {},

        components: {
            groupAddressInput,
        },

        data() {
            return {
                campuses:    [],
                categories:  [],
                life_stages: [],

                selected_category:   this.$route.query.category || null,
                selected_life_stage: this.$route.query.stage || null,

                geocoded_address:    null,
                is_geocode_complete: false,

                location: parseLocation(this.$route.query.location),

                show_address_search: false,
            }
        },

        computed: {

            locations_list() {

                let items              = [],
                    is_campus_selected = false;

                for (let i = 0; i < this.campuses.length; i++) {
                    let is_selected = this.location && this.location.lat === this.campuses[i].location.lat && this.location.lng === this.campuses[i].location.lng;
                    items.push({
                        id:          this.campuses[i].id,
                        name:        'Near the ' + this.campuses[i].title + ' Campus',
                        location:    this.campuses[i].location,
                        is_selected: is_selected,
                    });

                    is_campus_selected = is_selected ? true : is_campus_selected;
                }

                if (this.location && this.is_geocode_complete && !is_campus_selected) {
                    items.unshift({
                        id:          0,
                        name:        'Near ' + this.geocoded_address,
                        location:    this.location,
                        is_selected: true,
                    });
                }

                return items;

            },

        },

        watch: {

            location(value, old_value) {
                if (value === 'new') {
                    old_location = old_value;
                    return this.show_address_search = true;
                }

                this.$emit('location:updated', value);
            },

            selected_category(value) {
                this.$emit('category:updated', value);
            },

            selected_life_stage(value) {
                this.$emit('stage:updated', value);
            },

        },

        created() {
            this.load();
            this.getAddress();
        },

        methods: {

            load() {

                let campuses    = campusService.all(),
                    categories  = categoryService.all(),
                    life_stages = lifeStageService.all();

                axios.all([campuses, categories, life_stages])
                    .then(axios.spread((campuses, categories, life_stages) => {
                            this.campuses    = campuses.data.data;
                            this.categories  = categories.data.data;
                            this.life_stages = life_stages.data.data;
                        })
                    );
            },

            getAddress() {
                if (!this.location)
                    return;

                googleMaps.load().then(() => {
                    let geocoder = new google.maps.Geocoder,
                        latlng   = new google.maps.LatLng(this.location.lat, this.location.lng);

                    geocoder.geocode({ location: latlng }, (results, status) => {
                        this.is_geocode_complete = true;
                        if (status === 'OK' && results[0])
                            this.geocoded_address = formatAddress(results[0].address_components);
                    });
                });

            },

            updateLocation(place) {

                this.location = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
                this.is_geocode_complete = true;

                this.$emit('location:updated', this.location);
                this.show_address_search = false;

                this.geocoded_address = formatAddress(place.address_components);

            },

        },

    }

    function parseLocation(location_string) {
        if (!location_string)
            return null;

        let location_parts = location_string.split(',');

        return { lat: location_parts[0], lng: location_parts[1] };
    }

    function formatAddress(components) {
        let street_number = '',
            address       = [],
            rules         = {
                street_number:               'short_name',
                route:                       'long_name',
                locality:                    'short_name',
                administrative_area_level_1: 'short_name',
                postal_code:                 'short_name',
            };

        for (let part_idx = 0; part_idx < components.length; part_idx++) {
            let part = components[part_idx];
            for (let type_idx = 0; type_idx < part.types.length; type_idx++) {
                let type = part.types[type_idx];
                if (rules.hasOwnProperty(type)) {
                    if (type === 'street_number') {
                        street_number = part[rules[type]]
                    } else {
                        address.push(part[rules[type]]);
                    }
                }
            }
        }

        return (street_number + ' ' + address.join(', ')).trim();
    }
</script>