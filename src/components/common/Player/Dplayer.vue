<template>
    <div>
        <div id="dplayer"></div>
    </div>
</template>

<script>
import DPlayer from 'dplayer';

export default {
    name: "Dplayer",
    props: {
        url: {
            type: String,
            default: () => ""
        },
        poster: {
            type: String,
            default: () => ""
        }
    },
    data() {
        return {
            player: null
        }
    },
    methods: {
        playVideo() {
            const dPlayer = new DPlayer({
                container: document.getElementById('dplayer'),
                video: {
                    url: this.url,
                    pic: this.poster
                },
                autoplay: true,
                logo: "",

            });
            this.player = dPlayer;
            console.log(this.player)

            dPlayer.play();
        }
    },
    destroyed() {
        if (this.player != null) {
            this.player.destroy();
        }
    }
}
</script>

<style scoped>

</style>
