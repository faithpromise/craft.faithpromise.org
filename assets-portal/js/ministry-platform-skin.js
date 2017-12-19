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

window.setupCustomerEvents = function () {

    let page = window.location.pathname.replace(/^\/portal\/?/i, '');

    nav.init();
    allPages.init();

    switch (page) {
        case 'giving':
        case 'giving/recurring':
        case 'giving/profile':
            givingPage.init();
            break;
        case 'login.aspx':
            loginPage.init();
            break;
    }

};
