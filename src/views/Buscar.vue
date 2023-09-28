<template>
    <div id="buscar">
        <v-row justify="center" no-gutters>
            <v-card width="600" max-with="700" class="my-auto mb-4">
                <v-card-title justify="center">
                    <h2>Mejor ruta</h2>
                </v-card-title>
                <v-card-text>
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation>
                        <v-autocomplete label="Escoja lugar" v-model="location" :items="locations" append-icon="mdi mdi-map-search" item-text="name" item-value="_id" no-data-text="Sin lugares para buscar rutas" :rules="autoRules" placeholder="Escoja un lugar"></v-autocomplete>
                    </v-form>
                </v-card-text>
                <v-card-actions justify="center" class="flex-column">
                    <v-btn
                        color="success"
                        class="mr-4"
                        @click="buscarRuta">
                        Buscar mejor ruta
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-row>
        <Plano />
    </div>
</template>
<script>
import Plano from "@/components/Maps"
export default {
    name: "BuscarVue",
    components: {
        Plano
    },
    data: () => ({
        valid: true,
        url: `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`,
        locations: [],
        location: null, autoRules: [
            v => !!v || 'Escoja un lugar'
        ]
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
        },
        buscarRuta() {
            if (this.$refs.form.validate()) {
                console.log('ruta');
            }
        }
    }, async created() {
        this.checkSesion();
        await this.axios.get(`${this.url}/location`).then(response => this.locations = response.data);
    }
}
</script>