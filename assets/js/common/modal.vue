<template>

  <portal to="modal">

    <div class="Modal" @click.self="close">

      <loading v-if="!show"></loading>

      <transition name="modal" @after-leave="afterLeave" @before-enter="beforeEnter">

        <div class="Modal-dialog" :class="klass" v-show="is_dialog_visible">

          <div class="Modal-close" @click="close" v-if="closeable">
            <svg role="img">
              <use xlink:href="/assets/icons.svg#modal-close"></use>
            </svg>
          </div>

          <div class="Modal-header">
            <div class="Modal-title">{{ title }}</div>
          </div>

          <div class="Modal-body">
            <slot></slot>
          </div>

          <div class="Modal-footer">
            <slot name="footer"></slot>
          </div>

        </div>

      </transition>

    </div>

  </portal>

</template>
<script>

    import loading from './loading.vue';

    export default {

        props: {
            show:      { required: true },
            closeable: { default: true },
            title:     { required: true },
            size:      { default: 'medium' },
        },

        components: {
            loading,
        },

        data() {
            return {
                is_visible: false,
            }
        },

        computed: {
            klass() {
                return 'Modal--' + this.size;
            },

            is_dialog_visible() {
                return this.show && this.is_visible && !this.loading;
            },

        },

        mounted: function () {
            this.is_visible = true;
        },

        created: function () {
            this.bindEscapeKey();
            this.disableScrolling();
            this.showLoading();
        },

        beforeDestroy: function () {
            this.unbindEscapeKey();
            this.enableScrolling();
            this.hideLoading();
        },

        methods: {

            close() {
                this.is_visible = !this.closeable;
            },

            escapeKeyHandler(e) {
                if (e.keyCode === 27)
                    this.close();
            },

            beforeEnter() {
                this.hideLoading();
            },

            afterLeave() {
                this.enableScrolling();
                this.$emit('close');
                // this.is_visible = true;
                this.hideLoading();
            },

            enableScrolling() {
                document.documentElement.classList.remove('modal-open');
            },

            disableScrolling() {
                document.documentElement.classList.add('modal-open');
            },

            bindEscapeKey() {
                if (this.closeable)
                    document.addEventListener('keyup', this.escapeKeyHandler);
            },

            unbindEscapeKey() {
                if (this.closeable)
                    document.removeEventListener('keyup', this.escapeKeyHandler);
            },

            showLoading() {
                document.documentElement.classList.add('modal-loading');
            },

            hideLoading() {
                document.documentElement.classList.remove('modal-loading');
            },

        }

    }
</script>