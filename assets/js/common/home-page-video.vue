<template>
  <div class="HeaderVideo">
    <img
            class="Hero-image"
            src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
            sizes="100vw"
            :srcset="imageSrcset"
            v-if="!can_play_video">
    <video data-object-fit="cover" id="home_page_video" v-if="can_play_video" autoplay loop muted preload>
      <source :src="videoUrl" type="video/mp4">
    </video>
    <div class="HeaderVideo-overlay"></div>
    <div class="HeaderVideo-container">
      <h1 class="HeaderVideo-title">Welcome to<br>Faith Promise</h1>
      <div class="HeaderVideo-actions">
        <a class="Button" href="/locations">Find a Location</a>
        <a class="Button" href="http://online.faithpromise.org">Watch Online</a>
      </div>
    </div>
    <div class="HeaderVideo-cut"></div>
  </div>
</template>
<script>

    import debounce from '../utils/debounce';
    import Modernizr from '../modernizr';

    let video,
        restarts             = 0,
        restarted_at         = 0,
        previous_marker      = 0,
        goal_interval        = 25,
        percentage_completed = 0;

    function time_update_handler() {

        percentage_completed = Math.ceil((video.currentTime + (restarts * video.duration)) / video.duration * 100);

        let marker = Math.floor(percentage_completed / goal_interval) * goal_interval;

        // Only fire once for each marker
        if (marker === previous_marker)
            return;

        previous_marker = marker;

        // If reached the end of video
        track_restart();

        if (window.ga)
            window.ga('send', 'event', 'Home Page Video', marker + '% played');

        if (marker >= 300)
            untrack();

    }

    function track_restart() {

        let track_it = (new Date()) - restarted_at > 3000;

        if (track_it && Math.ceil(video.currentTime) >= Math.floor(video.duration)) {
            restarts++;
            restarted_at = new Date();
        }
    }

    function is_video_in_view() {
        return window.scrollY < 140;
    }

    let window_scroll_handler = debounce(function () {
        if (!is_video_in_view()) {
            untrack();
            window.removeEventListener('scroll', window_scroll_handler);
        }
    }, 100);

    function track() {
        video.ontimeupdate = time_update_handler;
    }

    function untrack() {
        video.ontimeupdate = null;
    }

    export default {

        props: {
            videoUrl:    { required: true },
            imageSrcset: { required: true },
            isNavOpen:   { default: false },
        },

        watch: {
            isNavOpen(value) {
                if (value)
                    untrack();
            },
        },

        data() {
            return {
                can_play_video: Modernizr.videoautoplay,
            }
        },

        mounted() {

            if (video = document.getElementById('home_page_video')) {
                track();
                window.addEventListener('scroll', window_scroll_handler);
            }
        },

    }

</script>