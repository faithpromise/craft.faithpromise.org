<template>
  <div style="height: 100%; width: 100%;"></div>
</template>
<script>

    import googleMaps from '../common/google-maps';

    let map_promise_resolve,
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

        props: {
            groups:   { required: true, },
            location: { default: null, },
        },

        components: {},

        data() {
            return {}
        },

        computed: {},

        watch: {

            groups: {

                immediate: true,

                handler: function (new_value) {

                    if (!new_value || new_value.length === 0)
                        return;

                    this.addMarkers();

                },

            },

            location() {
                this.setCenter();
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

                googleMaps.createMap(this.$el, config).then((map) => {
                    map_promise_resolve(map);
                    window.search_map = map; // Ref so we can remove it when navigating away from search
                });

            },

            setCenter() {
                map_promise.then((map) => {

                    if (this.location)
                        map.setCenter(this.location);

                    if (home_marker)
                        home_marker.setMap(null);

                    if (this.location) {
                        home_marker = new google.maps.Marker({
                            position: this.location,
                            map:      map,
                            icon:     {
                                url:        '/assets/map-marker-home.svg',
                                scaledSize: new google.maps.Size(32, 38),
                            }
                        });
                    }

                });
            },

            addMarkers() {

                map_promise.then((map) => {

                    console.log('adding markers');

                    let bounds      = new google.maps.LatLngBounds(),
                        marker_size = new google.maps.Size(25, 30);

                    this.groups.forEach((group) => {

                        if (!group.location || markers.hasOwnProperty(group.id)) return;

                        markers[group.id] = new google.maps.Marker({
                            position: group.location,
                            map:      map,
                            icon:     {
                                url:        '/assets/map-marker.svg',
                                scaledSize: marker_size,
                            }
                        });

                        bounds.extend(markers[group.id].getPosition());

                    });

                    if (!this.location)
                        map.setCenter(bounds.getCenter() || { lat: 35.96411, lng: -84.16774 });

                });

            },

        },

    }
</script>