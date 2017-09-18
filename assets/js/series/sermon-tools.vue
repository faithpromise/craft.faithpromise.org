<template>
  <div class="Sermon-tools image-fg-muted image-fg-1 image-fg-vibrant-dark">

    <ul class="SermonTools">
      <li>
        <a :href="audioUrl" @click.prevent="play_audio" v-if="soundcloudId">
          <svg>
            <use xlink:href="/assets/icons.svg#audio"></use>
          </svg>
          <span class="SermonTools-label">Audio</span>
        </a>
      </li>
      <li>
        <!--TODO: Group study link-->
        <a href="">
          <svg>
            <use xlink:href="/assets/icons.svg#group-study"></use>
          </svg>
          <span class="SermonTools-label"><span class="sm-hidden">Group </span>Study</span>
        </a>
      </li>
      <li>
        <a :href="facebook_url" target="_blank">
          <svg>
            <use xlink:href="/assets/icons.svg#facebook"></use>
          </svg>
          <span class="SermonTools-label">Share</span>
        </a>
        </a>
      </li>
      <li>
        <a :href="twitter_url" target="_blank">
          <svg>
            <use xlink:href="/assets/icons.svg#twitter"></use>
          </svg>
          <span class="SermonTools-label">Tweet</span>
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
            // TODO: We need to change the color of the play button to match the series
            soundcloud_url() {
                return 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + this.soundcloudId + '&amp;color=c5c5c5&amp;inverse=true&amp;auto_play=true&amp;show_user=true';
            },
        },

        methods: {
            play_audio() {
                this.show_soundcloud = true;
            },
        }

    }
</script>