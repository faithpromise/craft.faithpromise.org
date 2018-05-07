/**
 * Allows us to:
 *  - Commit objects and arrays to local storage without stringifying
 *  - Set expirations on local storage items
 *  Fallback from localStorage to sessionStorage to variable storage
 */

let temp_storage = {};

const tempStorage = {
    getItem(key) { return temp_storage[key]; },
    setItem(key, value) { temp_storage[key] = value; },
    removeItem(key) { delete temp_storage[key]; },
    clear() { temp_storage = {}; },
};

function isSupported(service) {
    try {
        const key = 'is_storage_method_supported';
        service.setItem(key, 1);
        service.removeItem(key);
        return true;
    } catch (e) {
        return false;
    }
}

function storageFactory(storage = window.localStorage) {

    storage = isSupported(storage) ? storage : isSupported(sessionStorage) ? sessionStorage : tempStorage;

    function get(key, default_value = null) {

        let dt   = Date.now(),
            item = storage.getItem(key);

        if (!item) return default_value;

        let data = JSON.parse(item);

        if (data.expires_at !== null && dt >= data.expires_at) {
            storage.removeItem(key);
            return default_value;
        }

        return data.value;
    }

    function set(key, value, seconds = null) {
        let expires_at = seconds ? (Date.now() + (seconds * 1000)) : null;
        let data       = JSON.stringify({ value, expires_at });
        storage.setItem(key, data);
    }

    function remove(key) { storage.removeItem(key); }

    function clear() { storage.clear(); }

    return { get, set, remove, clear };

}

export default storageFactory;