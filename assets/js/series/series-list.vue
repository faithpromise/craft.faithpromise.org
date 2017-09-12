<template>

  <div>

    <slot></slot>

    <div v-for="content in more" v-html="content"></div>

    <div class="LoadMore">
      <button class="Button" @click="load_more" :disabled="is_loading">{{ is_loading ? 'Loading...' : 'Load More' }}</button>
    </div>

  </div>

</template>
<script>

    import seriesService from './series';

    let page = 2;

    export default {

        data() {
            return {
                more:       [],
                is_loading: false,
            }
        },

        methods: {

            load_more() {

                this.is_loading = true;

                seriesService.paginate({ page })
                    .then(result => {
                        this.more.push(result.data);
                        page++;
                        this.is_loading = false;
                    })
                    .catch(error => {
                        // TODO: Handle error
                        console.log(error);
                        this.is_loading = false;
                    });
            },

        },

    }
</script>