<template>
    <div>
        <v-footer
            dark
            padless
        >
            <v-card
                flat
                tile
                style="position: fixed;width: 100%;margin-bottom: 0px"
                class="indigo lighten-1 white--text text-center"
            >
                <v-card-text>
                    <v-btn
                        v-for="icon in icons"
                        :key="icon"
                        class="mx-4 white--text"
                        icon
                    >
                        <v-icon size="24px">
                            {{ icon }}
                        </v-icon>
                    </v-btn>
                </v-card-text>

                <v-card-text class="white--text pt-0">
                    {{ website.desc}}
                </v-card-text>

                <v-divider></v-divider>

                <v-card-text class="white--text">
                    {{ new Date().getFullYear() }} — <strong>{{website.name}}</strong>
                </v-card-text>
            </v-card>
        </v-footer>
    </div>


</template>
<script>
import {mapState} from "vuex";

export default {
    data: () => ({
        icons: [
            'mdi-facebook',
            'mdi-twitter',
            'mdi-linkedin',
            'mdi-instagram',
        ],
    }),
    computed:{
        ...mapState(["website"])
    }
}
</script>
