<template>
  <div class="GroupResults-map">
    <div style="height: 100%; width: 100%;" v-bind:style="{ visibility: has_markers ? 'visible' : 'hidden' }"></div>
  </div>
</template>
<script>

    import axios from 'axios';
    import * as paramHelper from './group-query-params';
    import googleMaps from '../common/google-maps';
    import groupService from './group.service';
    import imgSrcset from '../common/image-srcset.vue';

    let old_params = {},
        map_promise_resolve,
        map_promise,
        markers,
        home_marker;

    // Re-initialize map promise each time this component is created.
    function init() {

        map_promise = new Promise(function (resolve) {
            map_promise_resolve = resolve;
        });

        markers     = {};
        home_marker = null;
    }

    export default {

        components: {
            imgSrcset,
        },

        data() {
            return {
                has_markers: false,
            }
        },

        computed: {
            location() {
                return paramHelper.parseLocation(this.$route.query.location);
            }
        },

        watch: {

            '$route': {
                immediate: true,
                handler(value) {
                    if (value.name === 'groups')
                        this.loadMarkers();
                },
            },

            location: {
                immediate: true,
                handler(value) {
                    this.addHomeMarker(value);
                },
            },

        },

        beforeCreate() {
            init();
        },

        mounted() {
            this.load();
        },

        methods: {

            load() {
                this.makeMap();
            },

            makeMap() {

                let config = {
                    zoom:              12,
                    maxZoom:           14,
                    streetViewControl: false,
                    mapTypeControl:    false,
                    fullscreenControl: false,
                    scrollwheel:       false,
                    styles:            [
                        { featureType: "road", elementType: "geometry", stylers: [{ visibility: "on" }, { lightness: 70 }] },
                        { featureType: "poi", elementType: "geometry", stylers: [{ visibility: "off" }] },
                        { featureType: "water", stylers: [{ lightness: 0 }] },
                        { featureType: "road", elementType: "labels", stylers: [{ visibility: "on" }] },
                        { featureType: "transit", stylers: [{ visibility: "off" }] },
                        { featureType: "administrative", elementType: "geometry", stylers: [{ lightness: 0 }] }
                    ]
                };

                if (this.location)
                    config.center = this.location;

                googleMaps.createMap(this.$el.querySelector('div'), config).then((map) => {
                    map_promise_resolve(map);
                    window.search_map = map; // Ref so we can remove it when navigating away from search
                });

            },

            addHomeMarker(center) {

                map_promise.then((map) => {

                    if (home_marker)
                        home_marker.setMap(null);

                    if (!center)
                        return;

                    home_marker = new google.maps.Marker({
                        position: center,
                        map:      map,
                        icon:     {
                            url:        '/assets/map-marker-home.svg',
                            scaledSize: new google.maps.Size(32, 38),
                        }
                    });

                });
            },

            loadMarkers() {

                let criteria    = Object.assign({}, this.$route.query, { dataset: 'markers', page: 1 }),
                    should_load = paramsHaveChanged(criteria, old_params);

                if (!should_load)
                    return;

                axios.all([map_promise, groupService.all(criteria)])
                    .then(axios.spread((map, groups) => {
                            this.addMarkers(map, groups.data.data);
                        })
                    );

                old_params = criteria;
            },

            addMarkers(map, groups) {

                // Keeps track of current listing results so we
                // can determine if previously created markers
                // not in the current results should be removed.
                let group_ids = {};

                let bounds      = new google.maps.LatLngBounds(),
                    marker_size = new google.maps.Size(25, 30);

                // Add location to bounds
                if (this.location)
                    bounds.extend(this.location);

                groups.forEach((group) => {

                    // Nothing to do if group has no location
                    if (!group.location)
                        return;

                    group_ids[group.id] = null;

                    // Add marker if it hasn't been added previously
                    if (!markers.hasOwnProperty(group.id)) {

                        markers[group.id] = new google.maps.Marker({
                            position: group.location,
                            map:      map,
                            icon:     {
                                url:        group.campus.map_marker,
                                scaledSize: marker_size,
                            }
                        });

                    }

                    google.maps.event.addListener(markers[group.id], 'click', () => {
                        this.$router.push({ name: 'group-detail', params: { slug: group.slug } });
                    });

                    bounds.extend(markers[group.id].getPosition());

                });

                this.has_markers = Object.keys(group_ids).length > 0;

                map.fitBounds(bounds);

                // Remove markers not in the current list
                for (let id in markers) {
                    if (markers.hasOwnProperty(id)) {
                        let in_results = group_ids.hasOwnProperty(id);
                        if (!in_results) {
                            markers[id].setMap(null);
                            delete markers[id];
                        }
                    }

                }

            },

        },

    }

    function paramsHaveChanged(new_params, old_params) {

        let ignore_params = ['page', 'dataset'];

        // If old_params is empty, this is the initial request
        if (Object.keys(old_params).length === 0)
            return true;

        for (let key in new_params) {
            if (new_params.hasOwnProperty(key)) {
                if (!old_params.hasOwnProperty(key) || new_params[key] !== old_params[key])
                    return true;
            }
        }

        for (let key in old_params) {
            if (old_params.hasOwnProperty(key)) {
                if (!new_params.hasOwnProperty(key))
                    return true;
            }
        }

        return false;
    }
</script>
