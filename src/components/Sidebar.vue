<template>
    <v-navigation-drawer
        permanent app>
        <v-list>
            <v-list-item class="px-2">
                <v-list-item-avatar>
                    <v-icon x-large>mdi mdi-account</v-icon>
                </v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
                <v-list-item-content>
                    <v-list-item-title class="text-h6">
                        Usuario
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
            nav
            dense>
            <v-list-item v-for="(item, index) in menu" :key="index" @click="ir(item.path)">
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
    name: 'SidebarVue',
    data: () => ({
        menu: [{
            title: 'Buscar ruta',
            icon: 'mdi mdi-map-search',
            path: '/home/buscar',
        }, {
            title: 'Subir masivo',
            icon: 'mdi mdi-upload',
            path: '/home/subir',
        }]
    }),
    methods: {
        ir(path) {
            this.$router.push(path);
        }
    },
}
</script>