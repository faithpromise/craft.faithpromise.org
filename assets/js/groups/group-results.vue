<template>
  <div class="GroupResults">

    <div class="GroupResults-search">
      <form @submit.prevent="search">

      </form>
    </div>

    <div class="GroupResults-map">
      <groups-map
              v-if="groups.length"
              :groups="groups"
              :location="location">
      </groups-map>
    </div>

    <div class="GroupResults-items">

      <div class="GroupItem" v-for="group in groups" :key="group.id">

        <div class="GroupItem-image">
          <div class="GroupItem-imageWrap">
            <img-srcset
                    :image="group.image"
                    :options="{ fit: 'crop', crop: 'entropy' }"
                    sizes="25w"
                    dimensions="square">
            </img-srcset>
          </div>
        </div>

        <div class="GroupItem-body">
          <div class="GroupItem-overview">
            <div class="GroupItem-header">
              <div class="GroupItem-titles">
                <h2 class="GroupItem-title">{{ group.title }}</h2>
                <p class="GroupItem-subtitle">{{ group.subtitle }}</p>
              </div>
            </div>
            <p class="GroupItem-description">{{ excerpt(group.description) }}</p>
          </div>
          <div class="GroupItem-details">
            <ul class="GroupItemDetails">
              <li>
                <span class="GroupItemDetails-value">{{ group.city }}</span>
                <span class="GroupItemDetails-label">{{ group.distance !== null ? (group.distance + ' miles') : 'area' }}</span>
              </li>
              <li v-if="group.day_of_week">
                <span class="GroupItemDetails-value">{{ group.day_of_week }}</span>
                <span class="GroupItemDetails-label">{{ group.start_time || group.frequency }}</span>
              </li>
              <li v-if="group.life_stage">
                <span class="GroupItemDetails-value">{{ group.life_stage }}</span>
                <span class="GroupItemDetails-label">{{ group.category }}</span>
              </li>
            </ul>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>
<script>

    import groupService from './group.service';
    import groupsMap from './groups-map.vue';
    import imgSrcset from '../common/image-srcset.vue';

    let params          = new URLSearchParams(window.location.search),
        location_string = params.get('location');

    export default {

        props: {},

        components: {
            groupsMap,
            imgSrcset,
        },

        data() {

            return {
                groups:   [],
                location: parseLocation(location_string),
            }
        },

        computed: {},

        created() {
            this.load();
        },

        methods: {

            load() {

                groupService.all({ location: location_string }).then((result) => {
                    this.groups = result.data.data;
                });
            },

            excerpt(text) {
                let limit = 120;

                if (text.length <= limit)
                    return text;

                return text.substr(0, limit).replace(/(\s*\S+)$/, '') + '...';
            },

        },

    }

    function parseLocation(location) {
        if (location) {
            let lat_lng = location.split(',');
            return {
                lat: parseFloat(lat_lng[0]),
                lng: parseFloat(lat_lng[1]),
            };
        }

        return null;
    }
</script>