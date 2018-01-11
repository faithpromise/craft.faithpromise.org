import user from '../common/user';

export default {
    init() {
        addLoggedInClass();
        addCartClass();
        updateUsersName();
        replacePageTitle();
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

function replacePageTitle() {

    let replacements = {
            'My Purchase History': 'Event Registrations',
        },
        title        = document.querySelector('.mpp_formTitle');

    if (title) {

        for (let key in replacements) {
            if (replacements.hasOwnProperty(key) && title.innerText === key) {
                title.innerText = replacements[key];
            }
        }

    }

    document.body.classList.add('titles-replaced');

}