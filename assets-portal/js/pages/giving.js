import user from '../common/user';
import contentElement from '../common/content-element';

let online_giving_pages = {
    'giving':           { path: '/donate/index', login_required: true, },
    'giving/profile':   { path: '/donate/profile', login_required: true, },
    'giving/recurring': { path: '/donate/recurring', login_required: true, },
    'giving/guest':     { path: '/donate/guest_donate', login_required: false, },
};

export default {

    init(page) {

        let online_giving_page = online_giving_pages[page];

        if (online_giving_page.login_required && !user.isLoggedIn())
            return window.location.href = '/portal/login.aspx?ReturnUrl=' + '/portal/' + page;

        embedOnlineGiving(online_giving_page);
    }

}

function embedOnlineGiving(og_page) {
    let js = document.createElement('script');
    js.setAttribute('data-id', 'og-embed-script');
    js.setAttribute('data-church-code', 'faithpromise_org');
    js.setAttribute('data-default-page', og_page.path);
    js.setAttribute('data-token-type', 'mp-token');
    js.setAttribute('data-mp-token', window.fp.MPP_User_Data);
    js.setAttribute('data-bg-color', '#f9f9f9');
    js.src = 'https://www.onlinegiving.org/assets/embed.js';

    contentElement.get().appendChild(js);
}