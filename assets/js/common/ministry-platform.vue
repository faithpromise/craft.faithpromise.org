<template>
  <div class="UserTools" v-if="show_user_tools">

    <transition name="transition">
      <div class="UserNav" v-show="is_nav_visible" v-cloak>
        <ul class="UserNav-list">
          <li class="UserNav-item">
            <a id="userLink" href="https://my.faithpromise.org/portal/my_user_account.aspx">Edit My Profile</a></li>
          <li class="UserNav-item">
            <a id="userLink" href="https://my.faithpromise.org/portal/my_groups.aspx">View My Group</a></li>
          <li class="UserNav-item">
            <a id="logoutLink" href="https://my.faithpromise.org/portal/login.aspx?logout=true">Logout</a></li>
        </ul>
      </div>
    </transition>

    <div class="UserActions">
      <div class="UserActions-name" @click="toggle_nav">
        <svg role="img">
          <use :xlink:href="toggle_icon"></use>
        </svg>
        {{ user_name }}
      </div>
      <div class="UserActions-div" v-show="items_in_cart"></div>
      <a class="UserActions-cart" href="https://my.faithpromise.org/portal/transaction_summary.aspx" v-show="items_in_cart">
        <svg role="img">
          <use xlink:href="https://faithpromise.org/assets/icons.svg#cart"></use>
        </svg>
        <span>{{ items_in_cart }}</span>
      </a>
    </div>

  </div>
</template>
<script>

    let cookie_domain = '.' + window.location.hostname.replace(/^my\./i, '');

    export default {

        data() {
            return {
                is_logged_in:   false,
                user_name:      '',
                is_nav_visible: false,
                items_in_cart:  0,
            }
        },

        computed: {
            toggle_icon() {
                return 'https://faithpromise.org/assets/icons.svg#chevron-' + (this.is_nav_visible ? 'up' : 'down');
            },

            show_user_tools() {
                return this.is_logged_in && this.user_name;
            },
        },

        created() {

            ready(function () {

                let cart_text    = document.getElementById('cartLink'),
                    user_link    = document.getElementById('userLink'),
                    is_logged_in = user_link && !user_link.match(/login/i);

                // If we have items in the cart...
                if (cart_text) {
                    let qty = parseInt(cart_text.replace(/\D/g, ''));
                    Cookies.set('fp_items_in_cart', qty, { domain: cookie_domain });
                }

                // Set logged in cookie...
                Cookies.set('is_logged_in', is_logged_in, { domain: cookie_domain });

                // If logged in, set user's name in cookie...
                if (is_logged_in)
                    Cookies.set('fp_user_name', user_link.innerText, { domain: cookie_domain });

            });

        },

        methods: {

            toggle_nav() {
                this.is_nav_visible = !this.is_nav_visible;
            },

            refresh() {
                this.is_logged_in  = Cookies.get('is_logged_in');
                this.user_name     = Cookies.get('fp_user_name');
                this.items_in_cart = Cookies.get('fp_items_in_cart');
            },
        }

    }

    function ready(fn) {
        if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

</script>