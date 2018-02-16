<template>
  <div class="GroupResults">

    <h1 class="GroupResults-title">
      <loading v-show="is_loading"></loading>
      <span v-if="groups.length && !is_loading">Found {{ total }} Groups {{ total_pages > 1 ? '(pg. ' + current_page + ')' : '' }}</span>
      <span v-if="none_found">No Groups Found</span>
    </h1>

    <div class="GroupResults-search">
      <group-search-form
              @location:updated="updateLocation"
              @category:updated="updateCategory"
              @stage:updated="updateLifeStage"></group-search-form>
    </div>

    <div class="GroupResults-map">
      <groups-map></groups-map>
    </div>

    <div class="GroupResults-items" v-show="!is_loading">

      <div class="GroupItem" v-for="group in groups" :key="group.id">

        <div class="GroupItem-image">
          <div class="GroupItem-imageWrap">
            <img-srcset
                    :image="group.image"
                    :options="{ fit: 'crop', crop: 'entropy' }"
                    sizes="25w"
                    dimensions="16x9">
            </img-srcset>
          </div>
        </div>

        <div class="GroupItem-body">

          <h2 class="GroupItem-title">{{ group.title }}</h2>
          <p class="GroupItem-subtitle">{{ group.life_stage }} {{ group.category }} in {{ group.city }}</p>
          <p class="GroupItem-description">{{ excerpt(group.description) }}</p>
          <ul class="GroupItemDetails">
            <li v-if="group.distance">
              <span class="GroupItemDetails-dist">{{ group.distance }} miles away</span>
              <span class="GroupItemDetails-abbrevDist">{{ group.distance }} miles</span>
            </li>
            <li>
              <span class="GroupItemDetails-time">{{ group.day_of_week }} at {{ group.start_time }}</span>
              <span class="GroupItemDetails-abbrevTime">{{ group.day_of_week.substring(0, 3) }} at {{ group.start_time }}</span>
            </li>
          </ul>

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

    import * as paramHelper from './group-query-params';
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
            this.load();
        },

        data() {

            return {
                groups:     [],
                markers:    [],
                is_loading: true,

                per_page:     20,
                total:        0,
                total_pages:  0,
                current_page: 1,
            }
        },

        computed: {

            none_found() {
                return this.is_loaded && this.total === 0;
            },

            has_more() {
                return this.total_pages > this.current_page;
            },

        },

        created() {
            this.load();
        },

        methods: {

            load() {
                let criteria = Object.assign({}, this.$route.query);

                this.is_loading = true;

                groupService.all(criteria).then((result) => {
                    this.groups       = result.data.data;
                    this.total        = result.data.meta.pagination.total;
                    this.total_pages  = result.data.meta.pagination.total_pages;
                    this.current_page = result.data.meta.pagination.current_page;
                    this.is_loading   = false;
                });
            },

            previousPage() {
                this.goToPage(this.current_page - 1);
            },

            nextPage() {
                this.goToPage(this.current_page + 1);
            },

            goToPage(page) {
                let params = paramHelper.cleanParams(this.$route.query, { page });
                this.$router.push({ name: this.$route.name, query: params });
            },

            update(new_params = {}) {
                let params = paramHelper.cleanParams(this.$route.query, new_params);
                delete params.page;
                this.$router.push({ name: this.$route.name, query: params });
            },

            updateLocation(location) {
                console.log('updating location', location);
                this.update({ location: paramHelper.formatLocation(location) });
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
</script>