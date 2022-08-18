<template>
    <div>
        <video v-if="mobilePlayer" id="video" :poster="poster"></video>
        <video v-else :src="url" controls autoplay width="100%" height="auto">Your browser is too old which doesn't
            support HTML5 video.
        </video>
    </div>
</template>

<script>
import Player from 'nplayer'
import Hls from "hls.js"
import flvjs from 'flv.js'
import mdui from "mdui";

export default {
    name: "Nplayer",
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
    watch: {
        url: function () {
            this.playVideo();
        }
    },
    data() {
        return {
            player: null,
            mobilePlayer: false, // 直接手机播放
        }
    },
    mounted() {
        this.playVideo();
    },
    methods: {
        playVideo() {
            if (this.player != null) {
                this.player.dispose();
            }
            // 判断视频类型
            let type = this.url.split('.').pop();
            if (type == "m3u8") {
                this.DashHls(this.url, this.poster);
            } else if (this.url.includes("flv") || this.url.includes("rtmp")) { // flv 视频判断
                this.mobilePlayer = true;
                this.flvPlayer(this.url, this.poster);
            } else {
                mdui.snackbar("暂不支持该视频播放,切换其他视频试试")
            }
        },
        DashHls(url, poster) {
            const hls = new Hls()
            const player = new Player({
                poster: poster,
                posterEnable: true,
                isTouch: true, // 默认会自动检测
                controls: [
                    [
                        "play",
                        "volume",
                        "time",
                        "spacer",
                        "airplay",
                        "settings",
                        "web-fullscreen",
                        "fullscreen"
                    ],
                    ["progress"]
                ]
            })

            hls.attachMedia(player.video)
            hls.on(Hls.Events.MEDIA_ATTACHED, function () {
                hls.loadSource(url)
            })
            this.player = player;
            player.play();
            player.mount(document.getElementById("video"));
        },

        flvPlayer(url) {
            let player = flvjs.createPlayer({
                type: 'flv',
                url: url,
                isLive: true,
                cors: true,
            });
            player.attachMediaElement(document.getElementById('video'));
            player.load();
            player.play();
            this.player = player;
        }
    },
    destroyed() {
        if (this.player != null) {
            this.player.dispose();
        }
    }
}
</script>

