import user from '../common/user';
import contentElement from '../common/content-element';

export default {

    init() {
        requireLogin();
        embedOnlineGiving();
    }

}

let online_giving_pages = {
    'giving':           '/donate/index',
    'giving/profile':   '/donate/profile',
    'giving/recurring': '/donate/recurring',
};

function requireLogin() {
    if (!user.isLoggedIn())
        window.location.href = '/portal/login.aspx?ReturnUrl=%2fportal%2fgiving';
}

function embedOnlineGiving() {

    // Embed Online Giving
    let js = document.createElement('script');
    js.setAttribute('data-id', 'og-embed-script');
    js.setAttribute('data-church-code', 'faithpromise_org');
    js.setAttribute('data-default-page', online_giving_pages[page]);
    js.setAttribute('data-token-type', 'mp-token');
    js.setAttribute('data-mp-token', window.fp.MPP_User_Data);
    js.setAttribute('data-bg-color', '#f9f9f9');
    js.src = 'https://www.onlinegiving.org/assets/embed.js';

    contentElement.get().appendChild(js);
}