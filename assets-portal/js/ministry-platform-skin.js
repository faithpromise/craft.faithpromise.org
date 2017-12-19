// head      = document.head;
// link      = document.createElement('link');
// link.type = 'text/css';
// link.rel  = 'stylesheet';
// link.href = 'https://faithpromise.org.app/build/ministry-platform-skin.css';
// head.appendChild(link);

import allPages from './pages/all-pages';
import loginPage from './pages/login';
import givingPage from './pages/giving';
import nav from './components/nav';

/**
 | On my_contribution_statement.aspx, Ministry Platform
 | scripts (loadPortalScripts) are loaded twice, so
 | setupCustomerEvents is called twice. This has the
 | negative consequence of loading our scripts and
 | binding our event handlers twice.
 * @type {boolean}
 */
let customer_events_called = false;

window.setupCustomerEvents = function () {

    if (customer_events_called) return;
    customer_events_called = true;

    let page = window.location.pathname.replace(/^\/portal\/?/i, '');

    nav.init();
    allPages.init();

    switch (page) {
        case 'giving':
        case 'giving/recurring':
        case 'giving/profile':
        case 'giving/guest':
            givingPage.init(page);
            break;
        case 'login.aspx':
            loginPage.init();
            break;
    }

};
