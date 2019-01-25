<template>
  <div class="GroupResults">

    <router-view></router-view>

    <h1 class="GroupResults-title">
      <loading v-show="is_loading"></loading>
      <span v-if="groups.length && !is_loading">Found {{ total }} Groups {{ total_pages > 1 ? '(pg. ' + current_page + '/' + total_pages + ')' : '' }}</span>
      <span v-if="none_found">No Groups Found</span>
    </h1>

    <div class="GroupResults-search">
      <group-search-form
         @campus:updated="updateCampus"
         @location:updated="updateLocation"
         @category:updated="updateCategory"
         @stage:updated="updateLifeStage"></group-search-form>

      <p class="GroupResults-none" v-if="none_found">Unfortunately, there aren't any groups that match your criteria.
        However, we're adding new groups all the time. You may even want to
        <a class="nowrap" href="/groups/leaders">start a group</a> of your own! If you'd like help finding a group or
        want to know more about starting one, we'd love to hear from you. Please take a moment to
        <a class="nowrap" href="mailto:groups@faithpromise.org">send an email</a>.</p>

    </div>

    <groups-map></groups-map>

    <div class="GroupResults-items" v-show="!is_loading">

      <router-link class="GroupItem" v-for="group in groups" :key="group.id"
                   :to="{ name: 'group-detail', params: { slug: group.slug } }">

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
          <div class="GroupItem-featured" v-if="group.is_featured === '1'">Recommended Group</div>
          <h2 class="GroupItem-title">{{ group.title }}</h2>
          <p class="GroupItem-subtitle">{{ group.life_stage }}, {{ group.category.title }} Group
            <span v-show="group.city">in {{ group.city }}</span></p>
          <p class="GroupItem-description">{{ excerpt(group.description) }}</p>
          <ul class="GroupItemDetails">
            <li v-if="group.distance">
              <span class="GroupItemDetails-dist">{{ group.distance }} mi. away</span>
              <span class="GroupItemDetails-abbrevDist">{{ group.distance }} mi.</span>
            </li>
            <li>
              <span
                 class="GroupItemDetails-time">{{ group.day_of_week.substring(0, 3) }} at {{ group.start_time }}</span>
              <span class="GroupItemDetails-abbrevTime">{{ group.day_of_week.substring(0, 3) }} at {{ group.start_time }}</span>
            </li>
            <li class="GroupItemDetails-campus" v-if="group.campus">
              <span>{{ group.campus.name }}</span>
              <img :src="group.campus.map_marker" width="20" height="20" alt="Map marker color"/>
            </li>
          </ul>

        </div>

      </router-link>

      <p class="GroupResults-more" v-show="total_pages > 1">
        <button class="Button" type="button" @click="previousPage" v-show="current_page > 1">Prev Page</button>
        <button class="Button" type="button" @click="nextPage" v-show="has_more">Next Page</button>
      </p>
    </div>

  </div>
</template>
<script>

  import * as paramHelper from './group-query-params'
  import groupService from './group.service'
  import groupsMap from './groups-map.vue'
  import groupSearchForm from './group-search-form.vue'
  import imgSrcset from '../common/image-srcset.vue'
  import loading from '../common/loading.vue'

  export default {

    props: {},

    components: {
      groupsMap,
      groupSearchForm,
      imgSrcset,
      loading
    },

    data() {

      return {
        groups: [],
        markers: [],
        is_loading: true,

        per_page: 20,
        total: 0,
        total_pages: 0,
        current_page: 1
      }
    },

    computed: {

      none_found() {
        return !this.is_loading && this.total === 0
      },

      has_more() {
        return this.total_pages > this.current_page
      }

    },

    created() {
      this.load()
    },

    methods: {

      load() {
        let criteria = Object.assign({}, this.$route.query)

        this.is_loading = true

        groupService.all(criteria).then((result) => {
          this.groups = result.data.data
          this.total = result.data.meta.pagination.total
          this.total_pages = result.data.meta.pagination.total_pages
          this.current_page = result.data.meta.pagination.current_page
          this.is_loading = false
        })
      },

      previousPage() {
        this.goToPage(this.current_page - 1)
      },

      nextPage() {
        this.goToPage(this.current_page + 1)
      },

      goToPage(page) {
        let params = paramHelper.cleanParams(this.$route.query, {page})
        this.$router.push({name: this.$route.name, query: params})
        this.load()
      },

      update(new_params = {}) {
        let params = paramHelper.cleanParams(this.$route.query, new_params)
        delete params.page
        this.$router.push({name: this.$route.name, query: params})
        this.load()
      },

      updateLocation(location) {
        this.update({location: paramHelper.formatLocation(location)})
      },

      updateCampus(campus) {
        this.update({campus})
      },

      updateCategory(category) {
        this.update({category})
      },

      updateLifeStage(stage) {
        this.update({stage})
      },

      excerpt(text) {
        let limit = 120

        if (text.length <= limit)
          return text

        return text.substr(0, limit).replace(/(\s*\S+)$/, '') + '...'
      }

    }

  }
</script>
