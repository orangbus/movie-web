<template>
    <div>
        <template>
            <v-card class="overflow-hidden">
                <v-app-bar
                    absolute
                    clipped-left
                    color="primary"
                    elevate-on-scroll
                    scroll-target="#scrolling-techniques-7"
                >
                    <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

                    <v-toolbar-title>Title</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon @click="drawer = true">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </v-app-bar>

                <v-navigation-drawer
                    v-model="drawer"
                    absolute
                    temporary
                    right
                    width="1000"
                >
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>John Leider</v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-btn icon text @click="drawer = false">
                                <v-icon>mdi-window-close</v-icon>
                            </v-btn>
                        </v-list-item-action>
                    </v-list-item>

                    <v-divider></v-divider>

                    <v-list dense>
                        <v-list-item
                            v-for="(item,index) in 10"
                            :key="index"
                            link
                        >
                            <v-list-item-icon>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title>斗罗大陆</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-navigation-drawer>

                <v-main>
                    <v-sheet
                        id="scrolling-techniques-7"
                        class="overflow-y-auto"
                        max-height="100vh"
                    >
                        <v-container >
                            <v-list>
                                <v-list-item
                                    v-for="(item,index) in 20"
                                    :key="index"
                                >
                                    <v-list-item-title>斗罗大陆{{index}}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-container>
                    </v-sheet>
                </v-main>
            </v-card>
        </template>
    </div>
</template>
<script>

export default {
    data () {
        return {
            drawer: true,
        }
    },
    mounted() {
    },
    methods:{

    }
}
</script>
