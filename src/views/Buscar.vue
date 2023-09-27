<template>
    <div>
        <p>Buscar</p>
    </div>
</template>
<script>
export default {
    name: "BuscarVue",
    data: () => ({
        url: `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`,
    }), methods: {
        async checkSesion() {
            if (sessionStorage.currentSession) {
                await this.axios.get(`${this.url}/user/checkSesion/${sessionStorage.currentSession}`).then(response => {
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