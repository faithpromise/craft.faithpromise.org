<template>
  <div class="Loading" v-bind:class="root_class">
    <span class="Loading-text" v-if="text">{{ text }}</span>
    <div class="Loading-dot"></div>
    <div class="Loading-dot"></div>
    <div class="Loading-dot"></div>
  </div>
</template>
<script>
    export default {
        props: {
            'text': { default: null },
            'size': { default: 'normal' },
            'klass': { default: null },
        },

        computed: {
            root_class() {
                return 'Loading--' + this.size + (this.class ? ' ' + this.class : '');
            }
        }
    }
</script>