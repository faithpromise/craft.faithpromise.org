<template>
  <portal to="modal">
    <transition name="transition" v-on:after-leave="after_leave" v-on:before-enter="before_enter">

      <div class="Modal" v-show="show && is_visible" v-bind:class="modalClass" v-on:keyup.esc="close">
        <div class="Modal-container">

          <div class="Modal-window">

            <div class="Modal-close" v-on:click="close">
              <svg role="img" class="Modal-closeIcon">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#close"></use>
              </svg>
            </div>

            <h2 class="Modal-title">{{ title }}</h2>

            <div class="Model-body">
              <slot></slot>
            </div>

          </div>
        </div>
      </div>

    </transition>
  </portal>
</template>

<script>
    export default {

        props: {
            show:       { required: true },
            modalClass: { default: null },
            title:      { default: null }
        },

        data() {
            return {
                is_visible: false
            }
        },

        created: function () {
            console.log('Modal Created');
            // Body because ListingPhotos needs to stopPropagation
            document.addEventListener('keyup', this.escClose);
        },

        beforeDestroy: function () {
            // Body because ListingPhotos needs to stopPropagation
            document.removeEventListener('keyup', this.escClose);

            // Make sure modal is closed so `modal-open` class is removed from body tag
            document.documentElement.classList.remove('modal-open');
        },

        mounted: function () {
            this.is_visible = true;
        },

        methods: {

            escClose: function (e) {
                if (e.keyCode == 27) {
                    // TODO: This is getting fired twice for some reason
                    console.log('Modal closed by esc key');
                    this.close();
                }
            },

            close: function () {
                this.is_visible = false;
            },

            before_enter: function () {
                console.log('before_enter');
                document.documentElement.classList.add('modal-open');
            },

            after_leave: function () {
                document.documentElement.classList.remove('modal-open');
                this.$emit('close');
                this.is_visible = true;
            },

        }
    }
</script>