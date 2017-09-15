<template>
  <div class="Sermon-tools image-fg-muted image-fg-1 image-fg-vibrant-dark">

    <ul class="SermonTools">
      <li>
        <a :href="audioUrl" @click.prevent="play_audio" v-if="soundcloudId">
          <svg>
            <use xlink:href="/assets/icons.svg#audio"></use>
          </svg>
          Audio
        </a>
      </li>
      <li>
        <!--TODO: Group study link-->
        <a href="">
          <svg>
            <use xlink:href="/assets/icons.svg#group-study"></use>
          </svg>
          Group Study
        </a>
      </li>
      <li>
        <a :href="facebook_url" target="_blank">
          <svg>
            <use xlink:href="/assets/icons.svg#facebook"></use>
          </svg>
          Share
        </a>
        </a>
      </li>
      <li>
        <a :href="twitter_url" target="_blank">
          <svg>
            <use xlink:href="/assets/icons.svg#twitter"></use>
          </svg>
          Tweet
        </a>
      </li>
    </ul>

    <div class="Sermon-audio" v-if="show_soundcloud">
      <iframe width="100%" height="20" scrolling="no" frameborder="no" :src="soundcloud_url"></iframe>
    </div>

  </div>
</template>
<script>

    export default {

        props: {
            titleEncoded: { required: true },
            url:          { default: null },
            audioUrl:     { default: null },
            soundcloudId: { default: null },
        },

        data() {
            return {
                show_soundcloud: false,
            }
        },

        computed: {
            facebook_url() {
                return 'https://www.facebook.com/sharer/sharer.php?u=' + this.url;
            },
            twitter_url() {
                // TODO: Shorten URL
                return 'https://twitter.com/intent/tweet?text=Check%20out%20this%20%40faithpromise+sermon,%20%27' + this.titleEncoded + '%27&url=' + this.url;
            },
            soundcloud_url() {
                return 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + this.soundcloudId + '&amp;color=%23df4f92&amp;inverse=true&amp;auto_play=true&amp;show_user=true';
            },
        },

        methods: {
            play_audio() {
                this.show_soundcloud = true;
            },
        }

    }
</script>