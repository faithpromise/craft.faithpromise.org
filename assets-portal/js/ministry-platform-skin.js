window.setupCustomerEvents = function () {

    let page         = window.location.pathname.replace(/^\/portal\//, ''),
        content_elem = document.getElementById('fp_content');

    init_nav();
    init_page();
    init_user_name();

    switch (page) {
        case 'portal':
            break;
        case 'give':
            init_give_page();
            break;
        case 'login.aspx':
            init_login_page();
            break;
        case 'create_account.aspx':
            init_create_account_page();
            break;
    }

    function is_logged_in() {
        let user_link = document.getElementById('userLink');
        return user_link ? !user_link.innerText.match(/login/i) : false;
    }

    function qty_in_cart() {
        let cart_text = document.getElementById('cartLink');
        return cart_text ? parseInt(cart_text.innerText.replace(/\D/g, '')) : 0;
    }

    function init_nav() {
        let toggle     = document.getElementById('js_nav_toggle'),
            nav        = document.getElementById('js_nav'),
            is_visible = false,
            css_class  = 'is-visible';

        // Toggle nav when toggle button clicked
        toggle.addEventListener('click', () => {
            console.log('toggling nav');
            is_visible = !is_visible;
            nav.classList.toggle(css_class, is_visible);
        });

        // Hide nav when clicked away
        document.addEventListener('click', hide_nav);

        function hide_nav(e) {
            if (e.target !== nav && !toggle.contains(e.target) && !nav.contains(e.target)) {
                console.log('hiding nav');
                is_visible = false;
                nav.classList.remove(css_class);
            }
        }

    }

    function init_page() {
        if (is_logged_in())
            document.body.classList.add('logged-in');

        if (qty_in_cart()) {
            document.body.classList.add('items-in-cart');
            document.getElementById('js_qty_in_cart').innerText = qty_in_cart();
        }
    }

    function init_user_name() {
        let user_link  = document.getElementById('userLink'),
            user_name  = user_link ? user_link.innerText : '',
            name_parts = user_name.split(',');

        document.getElementById('js_first_name').innerText = name_parts[name_parts.length - 1].trim();
        document.getElementById('js_last_name').innerText  = name_parts.slice(0, -1).join(',').trim();

    }

    function init_give_page() {

        // Require login
        if (!is_logged_in())
            window.location.href = '/portal/login.aspx?ReturnUrl=%2fportal%2fgive';

        // Embed Online Giving
        let js = document.createElement('script');
        js.setAttribute('data-id', 'og-embed-script');
        js.setAttribute('data-church-code', 'faithpromise_org');
        js.setAttribute('data-default-page', '');
        js.setAttribute('data-token-type', 'mp-token');
        js.setAttribute('data-mp-token', window.fp.MPP_User_Data);
        js.setAttribute('data-bg-color', '#f9f9f9');
        js.src = 'https://www.onlinegiving.org/assets/embed.js';

        content_elem.appendChild(js);
    }

    function init_login_page() {
        let elem = document.getElementById('btnForgotPassword');

        if (elem)
            elem.innerText = 'Recover Your Password';
    }

    function init_create_account_page() {
        let elem = document.getElementById('btnForgotPassword')[0];
        if (elem)
            elem.style = 'display: none;';
    }

};
