<template>
    <!-- App.vue -->

    <v-app>
        <Sidebar />

        <v-app-bar app>
            <!-- -->
        </v-app-bar>

        <!-- Sizes your content based upon application components -->
        <v-main>

            <!-- Provides the application the proper gutter -->
            <v-container fluid justify="center">
                <router-view></router-view>
            </v-container>
        </v-main>

        <v-footer app>
            <!-- -->
        </v-footer>
    </v-app>
</template>
<script>
import Sidebar from '@/components/Sidebar.vue';
export default {
    name: 'HomeVue',
    components: {
        Sidebar
    },
    data: () => ({

    }),
}
</script>