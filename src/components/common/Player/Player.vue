<template>
    <div>
        <div v-if="url !== ''">
            <!--html直接播放-->
            <div v-if="player_type === 0">
                <div style="width: 100%;">
                    <iframe  width="100%"
                             :style="playerStyle"
                             :src="url" frameborder="0"
                             allowfullscreen></iframe>
                </div>
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
import {mapState} from "vuex";
import EnumData from "@/util/EnumData";

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
    computed:{
        ...mapState(["isMobile","setting"]),
        playerStyle(){
            let height = 730;
            if (this.isMobile){
                height = 300;
            }
            // 弹窗尺寸
            if (!this.isMobile && this.setting.playerWay ===EnumData.playerWayDialog){
                height = 650;
            }
            return `border-radius: 6px;max-height:${height}px;min-height: ${height}px;`;
        }
    }
}
</script>

<style scoped>

</style>
