<template>
  <form class="GroupCriteria" @submit.prevent>

    <group-address-input
       :location="location"
       classes="GroupCriteria-input"
       placeholder="Near a zip code or address"
       @input="updateLocation"/>

    <select class="GroupCriteria-input" v-model="campus">
      <option :value="null">Any campus</option>
      <option disabled>- - - - - - - -</option>
      <option v-for="item in campuses" :key="item.id" :value="item.id">{{ item.title }} Campus Groups</option>
    </select>

    <div class="GroupCriteria-row">
      <div>
        <select class="GroupCriteria-input" v-model="selected_category">
          <option :value="null">Any Group Type</option>
          <option v-for="category in categories" :key="category.id" :value="category.slug">{{ category.title }}{{
            category.subtitle ? ' - ' + category.subtitle : '' }}
          </option>
        </select>
      </div>
      <div>
        <select class="GroupCriteria-input" v-model="selected_life_stage">
          <option :value="null">Any Life Stage</option>
          <option v-for="life_stage in life_stages" :key="life_stage.id" :value="life_stage.slug">{{ life_stage.title
            }}
          </option>
        </select>
      </div>
    </div>
  </form>
</template>
<script>

  import axios from 'axios'
  import campusService from '../campuses/campus.service'
  import categoryService from './group-categories.service'
  import lifeStageService from './group-life-stages.service'
  import groupAddressInput from './group-address-input.vue'

  export default {
    components: {
      groupAddressInput
    },

    data() {
      return {
        campuses: [],
        categories: [],
        life_stages: [],

        selected_category: this.$route.query.category || null,
        selected_life_stage: this.$route.query.stage || null,

        is_geocode_complete: false,

        campus: this.$route.query.campus || null
      }
    },

    computed: {
      location() {
        return parseLocation(this.$route.query.location)
      }
    },

    watch: {
      campus(value) {
        this.$emit('campus:updated', value)
      },

      selected_category(value) {
        this.$emit('category:updated', value)
      },

      selected_life_stage(value) {
        this.$emit('stage:updated', value)
      }
    },

    created() {
      this.load()
    },

    methods: {
      load() {
        let campuses = campusService.all()
        let categories = categoryService.all()
        let life_stages = lifeStageService.all()

        axios.all([campuses, categories, life_stages])
          .then(axios.spread((campuses, categories, life_stages) => {
              this.campuses = campuses.data.data
              this.categories = categories.data.data
              this.life_stages = life_stages.data.data
            })
          )
      },

      updateLocation(coords) {
        this.is_geocode_complete = true

        this.$emit('location:updated', coords)
      }
    }
  }

  function parseLocation(location_string) {
    if (!location_string)
      return null

    let location_parts = location_string.split(',')

    return {lat: location_parts[0], lng: location_parts[1]}
  }
</script>
