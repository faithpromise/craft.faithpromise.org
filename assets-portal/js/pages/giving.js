import user from '../common/user';
import contentElement from '../common/content-element';

export default {

    init(page) {

        let online_giving_page = online_giving_pages[page];

        // requireLogin(online_giving_page);
        embedOnlineGiving(online_giving_page);
    }

}

let online_giving_pages = {
    'giving':           '/donate/index',
    'giving/profile':   '/donate/profile',
    'giving/recurring': '/donate/recurring',
    'giving/guest':     '/donate/guest_donate',
};

function requireLogin(page) {
    if (!user.isLoggedIn())
        window.location.href = '/portal/login.aspx?ReturnUrl=' + '/portal/' + page;
}

function embedOnlineGiving(og_page) {

    // Embed Online Giving
    let js = document.createElement('script');
    js.setAttribute('data-id', 'og-embed-script');
    js.setAttribute('data-church-code', 'faithpromise_org');
    js.setAttribute('data-default-page', og_page);
    js.setAttribute('data-token-type', 'mp-token');
    js.setAttribute('data-mp-token', window.fp.MPP_User_Data);
    js.setAttribute('data-bg-color', '#f9f9f9');
    js.src = 'https://www.onlinegiving.org/assets/embed.js';

    contentElement.get().appendChild(js);
}