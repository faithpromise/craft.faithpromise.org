import user from '../common/user';

export default {

    init() {
        initToggleButton();
        initAutoClose();
        updateCartQuantity();
    }

}

let toggle     = document.getElementById('js_nav_toggle'),
    nav        = document.getElementById('js_nav'),
    is_visible = false,
    css_class  = 'is-visible';

function initToggleButton() {

    // Toggle nav when toggle button clicked
    toggle.addEventListener('click', () => {
        is_visible = !is_visible;
        nav.classList.toggle(css_class, is_visible);
    });

}

function initAutoClose() {
    // Hide nav when clicked away
    document.addEventListener('click', hideNav);
}

function hideNav(e) {
    if (e.target !== nav && !toggle.contains(e.target) && !nav.contains(e.target)) {
        is_visible = false;
        nav.classList.remove(css_class);
    }
}

function updateCartQuantity() {
    document.getElementById('js_qty_in_cart').innerText = user.getCartQuantity();
}