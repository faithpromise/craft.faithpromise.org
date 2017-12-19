export default {

    isLoggedIn() {
        return user_link ? !user_link.innerText.match(/login/i) : false;
    },

    getCartQuantity() {
        return cart_text ? parseInt(cart_text.innerText.replace(/\D/g, '')) : 0;
    },

    getFirstName() {
        return this.isLoggedIn() ? name_parts[name_parts.length - 1].trim() : null;
    },

    getLastName() {
        return this.isLoggedIn() ? name_parts.slice(0, -1).join(',').trim() : null;
    },

}

let user_link  = document.getElementById('userLink'),
    user_name  = user_link ? user_link.innerText : '',
    name_parts = user_name.split(','),
    cart_text  = document.getElementById('cartLink');