<template>
    <Masivo />
</template>
<script>
import Masivo from '@/components/Masivo.vue';
export default {
    name: 'SubirVue',
    components: {
        Masivo
    },
    data: () => ({
        url: `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`,
    }), methods: {
        async checkSesion() {
            if (localStorage.currentSession) {
                await this.axios.get(`${this.url}/user/checkSesion/${localStorage.currentSession}`).then(response => {
                    if (!response.data) {
                        this.$router.push('/');
                    }
                });
            } else {
                this.$router.push('/');
            }
        }
    }, async created() {
        this.checkSesion();
    }
}
</script>