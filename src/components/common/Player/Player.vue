<template>
    <div>
        <div v-if="url !== ''">
            <!--html直接播放-->
            <div v-if="player_type === 0" class="mdui-video-container">
                <iframe height="498" width="100%" :src="url" frameborder="0"
                        allowfullscreen></iframe>
            </div>
            <Nplayer
                v-if="player_type === 1"
                :url="url"
                :poster="poster"
            ></Nplayer>
        </div>
    </div>
</template>

<script>
import Nplayer from "./Nplayer";

export default {
    components: {
        Nplayer
    },
    props: {
        player_type: {
            type: Number,
            default: () => 1
        },
        url: {
            type: String,
            default: () => ""
        },
        poster: {
            type: String,
            default: () => "/images/poster.jpg"
        }
    },
    data() {
        return {
            playerList: []
        }
    },
}
</script>

<style scoped>

</style>
