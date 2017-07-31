(function () {

    new Vue({

        el: '#app',

        data: function () {
            return {
                is_nav_open: false
            }
        },

        watch: {
            is_nav_open: function (value) {
                document.documentElement.classList[value ? 'add' : 'remove']('nav-open');
            }
        },

        methods: {

            nav_open: function () {
                this.is_nav_open = true;
            },

            nav_close: function () {
                this.is_nav_open = false;
            },

            nav_toggle: function () {
                this.is_nav_open = !this.is_nav_open;
            }

        }

    });

}());
