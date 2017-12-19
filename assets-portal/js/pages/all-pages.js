import user from '../common/user';

export default {
    init() {
        addLoggedInClass();
        addCartClass();
        updateUsersName();
    }
}

function addLoggedInClass() {
    if (user.isLoggedIn())
        document.body.classList.add('logged-in');
}

function addCartClass() {
    if (user.getCartQuantity())
        document.body.classList.add('items-in-cart');
}

function updateUsersName() {
    document.getElementById('js_first_name').innerText = user.getFirstName();
    document.getElementById('js_last_name').innerText  = user.getLastName();
}