<template>
  <div class="SermonHero">
    <div class="SermonHero-player" v-if="is_playing">
      <div class="SermonHero-video">
        <video-embed :url="videoUrl" :auto-play="true"></video-embed>
      </div>
    </div>

    <div v-if="!is_playing">
      <slot></slot>
    </div>

    <div class="SermonHero-button image-fg-vibrant-dark" v-if="is_button_visible" @click="play">
      <svg>
        <use xlink:href="/assets/icons.svg#play"></use>
      </svg>
    </div>

  </div>
</template>
<script>

    import videoEmbed from '../common/video-embed.vue';

    export default {

        components: {
            videoEmbed,
        },

        props: {
            videoUrl: { default: null }
        },

        data() {
            return {
                is_playing: false,
            }
        },

        computed: {
            is_button_visible() {
                return this.videoUrl && !this.is_playing;
            },
        },

        watch: {
            play(value) {
                if (value)
                    document.documentElement.classList.add('nav_black');
            },
        },

        methods: {
            play() {
                this.is_playing = true;
            },
        }

    }
</script>