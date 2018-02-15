<template>
  <div style="height: 100%; width: 100%;"></div>
</template>
<script>

    import googleMaps from '../common/google-maps';

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
                    config.center = { lat: this.location.lat, lng: this.location.lng }; // Can't use Vue object

                googleMaps.createMap(this.$el, config).then((map) => {

                    this.addMarkers(map);

                    google.maps.event.addListener(map, 'idle', () => {

                        console.log('map bounds', map.getBounds().toJSON());

                        // When map bounds change, compare the zoom and center of the map
                        // with the zoom and center of the bounds we're searching (in criteria)
                        // to determine if the user has repositioned the map.

                    });

                });


            },

            addMarkers(map) {

                let markers     = {},
                    home_marker = null,
                    bounds      = new google.maps.LatLngBounds(),
                    marker_size = new google.maps.Size(25, 30);

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

                this.groups.forEach((group) => {

                    if (!group.location) return;

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
                    map.setCenter(bounds.getCenter());

            },

        },

    }
</script>