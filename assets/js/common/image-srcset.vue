<template>
  <img
          src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
          :sizes="sizes"
          :srcset="srcset">
</template>
<script>

    import ImageUrlBuilder from './image-url-builder';

    export default {

        props: {
            image:      { required: true },
            sizes:      { default: null },
            dimensions: { default: '16x9' },
            auto:       { default: 'compress%2Cformat' },
            options:    { default: null },
        },

        computed: {},

        data() {

            let options = Object.assign({ auto: this.auto }, this.options || {});

            return {
                srcset: makeSets(this.image, parseDimensions(this.dimensions), options),
            }
        },

    }

    function parseDimensions(value) {
        if (value === '16x9')
            return [[1920, 1080], [1680, 945], [1280, 720], [800, 450], [640, 360], [480, 270], [320, 180]];
        if (value === 'square')
            return [[1920, 1920], [1680, 1680], [1280, 1280], [800, 800], [640, 640], [480, 480], [320, 320]];

        return value;
    }

    function makeSets(url, dimensions = [1920, 1680, 1280, 800, 620, 480, 320], options) {
        let srcset = [];
        for (let i = 0; i < dimensions.length; i++) {
            let img = new ImageUrlBuilder(url, options);
            if (dimensions[i].constructor === Array) {
                srcset.push(img.width(dimensions[i][0]).height(dimensions[i][1]).get_url() + ' ' + dimensions[i][0] + 'w');
            } else {
                srcset.push(img.width(dimensions[i]).get_url() + ' ' + dimensions[i] + 'w');
            }
        }
        return srcset.join(',');
    };

</script>