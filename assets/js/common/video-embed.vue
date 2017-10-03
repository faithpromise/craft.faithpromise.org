<template>
  <iframe :src="embed_url" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</template>
<script>

    // https://gist.github.com/yangshun/9892961

    let autoplay = {
        youtube: 'autoplay=1',
        vimeo:   'autoplay=true',
    };

    let vimeo_params   = '?title=0&byline=0&portrait=0&badge=0',
        youtube_params = '?rel=0&amp;showinfo=0';

    export default {

        props: {
            url:      { required: true },
            autoPlay: { default: true },
        },

        computed: {

            embed_url() {

                let video    = parseVideo(this.url),
                    base_url = video.type === 'youtube' ? '//www.youtube.com/embed/' : '//player.vimeo.com/video/',
                    params   = video.type === 'youtube' ? youtube_params : vimeo_params;

                if (this.autoPlay)
                    params += autoplay[video.type];

                return base_url + video.id + params;

            },

        },

    }

    function parseVideo(url) {
        // - Supported YouTube URL formats:
        //   - http://www.youtube.com/watch?v=My2FRPA3Gf8
        //   - http://youtu.be/My2FRPA3Gf8
        //   - https://youtube.googleapis.com/v/My2FRPA3Gf8
        // - Supported Vimeo URL formats:
        //   - http://vimeo.com/25451551
        //   - http://player.vimeo.com/video/25451551
        // - Also supports relative URLs:
        //   - //player.vimeo.com/video/25451551

        url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);

        let type = RegExp.$3.indexOf('youtu') > -1 ? 'youtube' : (RegExp.$3.indexOf('vimeo') > -1 ? 'vimeo' : null);

        return {
            type: type,
            id:   RegExp.$6
        };
    }

</script>