/**
 * Allows us to:
 *  - Commit objects and arrays to local storage without stringifying
 *  - Set expirations on local storage items
 */
export default {

    get(key, default_value = null) {

        let dt   = Date.now();
        let item = localStorage.getItem(key);

        if (!item) return default_value;

        let data = JSON.parse(item);

        if (data.expires_at !== null && dt >= data.expires_at) {
            localStorage.removeItem(key);
            return default_value;
        }

        return data.value;
    },

    set(key, value, seconds = null) {

        let expires_at = seconds ? (Date.now() + (seconds * 1000)) : null;
        let data       = JSON.stringify({ value, expires_at });
        localStorage.setItem(key, data);

    },

    remove(key) {
        localStorage.removeItem(key);
    },

}