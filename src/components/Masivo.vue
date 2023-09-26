<template>
    <v-container>
        <div class="subirMasivo">
            <v-row justify="center" no-gutters>
                <v-card width="600" max-with="700" class="my-auto">
                    <v-card-title justify="center">
                        <h2>Subir masivo(JSON)</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation enctype="multipart/form-data">
                            <v-autocomplete :items="locations" item-text="name" item-value="_id" no-data-text="Sin lugares para agregarle ubicaciones"></v-autocomplete>
                            <v-file-input
                                v-model="paquete.file"
                                accept="application/json"
                                placeholder="Subir JSON"
                                prepend-icon="mdi mdi-upload"
                                label="Archivo JSON" :rules="nameRules"></v-file-input>
                        </v-form>
                    </v-card-text>
                    <v-card-actions justify="center" class="flex-column">
                        <v-btn
                            color="success"
                            class="mr-4"
                            @click="subirArchivo">
                            Subir archivo
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-row>
        </div>
    </v-container>
</template>
<script>
export default {
    name: 'MasivoVue',
    data: () => ({
        url: `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`,
        valid: true,
        locations: [],
        nameRules: [
            v => !!v || 'Escoja un archivo'
        ],
        paquete: {
            file: null
        },
    }),

    methods: {
        async subirArchivo() {
            if (this.$refs.form.validate()) {
                await this.axios.get(`${this.url}/`).then(response => {
                    console.log(response.data);
                });
            }
        },
    },
}
</script>