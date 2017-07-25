new Vue({

    el: '#Special',

    data: function () {
        return {
            is_expanded: false
        }
    },

    methods: {

        toggle_text: function () {
            this.is_expanded = !this.is_expanded;
        }

    }

});
