"use strict";

let googleMapsLoading = false;
let googleMapsResolve = null;
let googleMapsLoaded  = new Promise(function (resolve, reject) {
    googleMapsResolve = resolve;
});

window.googleMapsInit = function () {
    googleMapsResolve();
};

export default {

    load() {

        if (!googleMapsLoading) {

            googleMapsLoading = true;

            let googleMapScript = document.createElement('SCRIPT');
            googleMapScript.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?callback=googleMapsInit&libraries=places&key=AIzaSyCZYpBZDETAhQ0fxHX_UWCRO_QbxrdRAIY');
            // &key=AIzaSyBkH5rBySTyP0S6q2nCFGOz3Mj2oBpNECw
            googleMapScript.setAttribute('async', '');
            googleMapScript.setAttribute('defer', '');
            document.body.appendChild(googleMapScript);

        }

        return googleMapsLoaded;
    },

    createMap(elem, config = {}) {

        return this.load().then(() => {

            let map_resolve = null;
            let map_added   = new Promise(function (resolve) {
                map_resolve = resolve;
            });

            if (typeof elem === 'string')
                elem = document.getElementById(elem);

            let map = new google.maps.Map(elem, config);

            google.maps.event.addListenerOnce(map, 'bounds_changed', () => {
                map_resolve(map);
            });

            return map_added;

        });

    }

}
