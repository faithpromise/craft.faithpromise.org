<template>
  <div class="GroupResults">

    <h1 class="GroupResults-title">
      <loading v-show="is_loading"></loading>
      <span v-if="groups.length && !is_loading">Page {{ current_page }} of {{ total_pages }}</span>
      <span v-if="none_found">No Groups Found</span>
    </h1>

    <div class="GroupResults-search">
      <group-search-form
              @location:updated="updateLocation"
              @category:updated="updateCategory"
              @stage:updated="updateLifeStage"></group-search-form>
    </div>

    <div class="GroupResults-map">
      <groups-map
              :groups="groups"
              :location="location">
      </groups-map>
    </div>

    <div class="GroupResults-items" v-show="!is_loading">

      <div class="GroupItem" v-for="group in current_groups" :key="group.id">

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

          <h2 class="GroupItem-title">{{ group.title }}</h2>
          <p class="GroupItem-subtitle">{{ group.life_stage }} {{ group.category }} in {{ group.city }}</p>
          <p class="GroupItem-description">{{ excerpt(group.description) }}</p>
          <ul class="GroupItemDetails">
            <li v-if="group.distance">
              {{ group.distance + ' miles away' }}
            </li>
            <li>
              {{ group.day_of_week }} at {{ group.start_time }}
            </li>
          </ul>
          <!--<p class="GroupItem-subtitle"><strong>{{ group.day_of_week }} at {{ group.start_time || group.frequency }}</strong> {{ // group.subtitle }}</p>-->

        </div>

      </div>

      <p class="GroupResults-more" v-show="total_pages > 1">
        <button class="Button" type="button" @click="previousPage" v-show="current_page > 1">Prev Page</button>
        <button class="Button" type="button" @click="nextPage" v-show="has_more">Nex Page</button>
      </p>
    </div>

  </div>
</template>
<script>

    import groupService from './group.service';
    import groupsMap from './groups-map.vue';
    import groupSearchForm from './group-search-form.vue';
    import imgSrcset from '../common/image-srcset.vue';
    import loading from '../common/loading.vue';

    export default {

        props: {},

        components: {
            groupsMap,
            groupSearchForm,
            imgSrcset,
            loading,
        },

        beforeRouteUpdate(to, from, next) {
            next();
            if (this.should_reload)
                this.load();
            this.should_reload = false;
        },

        data() {

            return {
                per_page:      20,
                groups:        [],
                is_loading:    true,
                should_reload: false,
            }
        },

        computed: {

            location() {
                return parseLocation(this.$route.query.location);
            },

            total() {
                return this.groups.length;
            },

            total_pages() {
                return Math.ceil(this.groups.length / this.per_page)
            },

            current_page() {
                return parseInt(this.$route.query.page) || 1;
            },

            none_found() {
                return this.is_loaded && this.total === 0;
            },

            has_more() {
                return this.total_pages > this.current_page;
            },

            current_groups() {
                let end   = this.current_page * this.per_page,
                    start = end - this.per_page;

                return this.groups.slice(start, end);
            },

        },

        watch: {},

        created() {
            this.load();
        },

        methods: {

            load(params) {
                let criteria = Object.assign({}, this.$route.query, params);

                this.is_loading = true;

                groupService.all(criteria).then((result) => {
                    this.groups     = result.data.data;
                    this.is_loading = false;
                });
            },

            previousPage() {
                this.goToPage(this.current_page - 1);
            },

            nextPage() {
                this.goToPage(this.current_page + 1);
            },

            goToPage(page) {
                let params = Object.assign({}, this.$route.query, { page });
                this.$router.push({ name: this.$route.name, query: params });
            },

            update(new_params = {}) {
                let params = cleanParams(this.$route.query, new_params);
                delete params.page;
                this.should_reload = true;
                this.$router.push({ name: this.$route.name, query: params });
            },

            updateLocation(location) {
                console.log('updating location', location);
                this.update({ location: formatLocation(location) });
            },

            updateCategory(category) {
                this.update({ category });
            },

            updateLifeStage(stage) {
                this.update({ stage });
            },

            excerpt(text) {
                let limit = 120;

                if (text.length <= limit)
                    return text;

                return text.substr(0, limit).replace(/(\s*\S+)$/, '') + '...';
            },

        },

    }

    function cleanParams(query, params) {
        let new_params = Object.assign({}, query, params);

        for (let key in new_params) {
            if (new_params.hasOwnProperty(key) && new_params[key] === null) {
                delete new_params[key];
            }
        }
        console.log('cleanParams', new_params);
        return new_params;
    }

    function formatLocation(location) {
        return location ? location.lat + ',' + location.lng : null;
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