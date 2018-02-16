export {
    cleanParams,
    formatLocation,
    parseLocation,
}

function cleanParams(query, params) {
    let new_params = Object.assign({}, query, params);

    for (let key in new_params) {
        if (new_params.hasOwnProperty(key) && new_params[key] === null) {
            delete new_params[key];
        }
    }

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