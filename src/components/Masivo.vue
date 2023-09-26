<template>
    <v-container>
        <div class="subirMasivo">
            <v-row justify="center" no-gutters>
                <v-card width="600" max-with="700" class="my-4">
                    <v-card-title justify="center">
                        <h2>Crear lugar</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form
                            ref="formLugar"
                            v-model="validLugar"
                            lazy-validation>
                            <v-text-field
                                v-model="paqueteLugar.name"
                                :rules="nameRules"
                                label="Nombre del lugar" placeholder="Pereira"
                                required></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions justify="center" class="flex-column">
                        <v-btn
                            color="success"
                            class="mr-4"
                            @click="crearLugar">
                            Crear lugar
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <v-card width="600" max-with="700" class="my-auto">
                    <v-card-title justify="center">
                        <h2>Subir masivo</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation enctype="multipart/form-data">
                            <v-autocomplete v-model="location" :items="locations" prepend-icon="mdi mdi-map-search" item-text="name" item-value="_id" no-data-text="Sin lugares para agregarle ubicaciones" :rules="autoRules" placeholder="Escoja un lugar"></v-autocomplete>
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
        validLugar: true,
        locations: [],
        nameRules: [
            v => !!v || 'Escoja un archivo'
        ], autoRules: [
            v => !!v || 'Escoja un lugar'
        ],
        paqueteLugar: { name: null },
        location: null,
        paquete: {
            file: null,
        },
    }),

    methods: {
        async subirArchivo() {
            if (this.$refs.form.validate()) {
                const file = new FormData();
                let config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: 'http://localhost:3001/path/file/65134b6d0f6c954121b0eed2',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: this.paquete.file
                }
                // Agregar el archivo al FormData
                file.append('file', this.paquete.file);
                await this.axios.post(`${this.url}/path/file/${this.location}`, file, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Max'
                    }
                }).then(response => {
                    console.log(response.data);
                });
            }
        },
        async crearLugar() {
            if (this.$refs.formLugar.validate()) {
                await this.axios.post(`${this.url}/location/create`, this.paqueteLugar).then(response => {
                    switch (response.status) {
                        case 201:
                            this.$refs.formLugar.reset();
                            break;
                        default:
                            console.log(response.data);
                            break;
                    }
                });
            }
        }
    },
    async created() {
        await this.axios.get(`${this.url}/location`).then(response => this.locations = response.data);
    }
}
</script>