<template>
  <div class="Playlist-item" @click="open_sermon(id)">
    <div class="Playlist-play">
      <svg role="img">
        <use xlink:href="/assets/icons.svg#play-o"></use>
      </svg>
    </div>
    <div class="Playlist-title" :title="title">{{ title }}</div>
    <div class="Playlist-date">{{ date }}</div>
    <a class="Playlist-more" :href="url">View</a>
    <div class="Playlist-arrow">
      <svg role="img">
        <use xlink:href="/assets/icons.svg#chevron-right"></use>
      </svg>
    </div>
  </div>
</template>

<script>

    export default {

        props: {
            id:       { required: true },
            title:    { required: true },
            date:     { required: true },
            url:      { required: true },
            videoUrl: { default: null },
        },

        data() {
            return {
                active_sermon: null,
            }
        },

        methods: {

            open_sermon(id) {
                window.location.href = this.url;
            },

            open_video(url) {
                alert('video: ' + url);
            },

        }

    }
</script>