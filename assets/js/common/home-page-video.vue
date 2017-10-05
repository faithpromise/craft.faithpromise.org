<template>
  <video id="home_page_video" autoplay loop muted preload>
    <source :src="url" type="video/mp4">
  </video>
</template>
<script>

    import debounce from '../utils/debounce';

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

        // TODO: Google Analytics
        if (window.ga)
            window.ga('send', 'event', 'Home Page Video', marker + '% played');

        console.log('%c' + marker + '% of video played', 'color: red');

        if (marker >= 300)
            untrack();

    }

    function track_restart() {

        let track_it = (new Date()) - restarted_at > 3000;

        if (track_it && Math.ceil(video.currentTime) === Math.floor(video.duration)) {
            restarts++;
            restarted_at = new Date();
        }
    }

    function is_video_in_view() {
        return window.scrollY < 140;
    }

    let window_scroll_handler = debounce(function () {
        console.log('window scroll');
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
            url:       { required: true },
            isNavOpen: { default: false },
        },

        watch: {
            isNavOpen(value) {
                if (value)
                    untrack();
            },
        },

        mounted() {

            video = document.getElementById('home_page_video');
            track();

            window.addEventListener('scroll', window_scroll_handler);
        },

    }
</script>