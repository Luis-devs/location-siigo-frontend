<template>
    <v-container>
        <div class="iniciarSesion">
            <v-row justify="center" no-gutters>
                <v-card width="600" max-with="700" class="my-auto">
                    <v-card-title justify="center">
                        <h2>Iniciar sesión</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation>
                            <v-text-field
                                v-model="paquete.correo"
                                :rules="emailRules"
                                label="Correo" placeholder="correo@gmail.com"
                                required></v-text-field>
                            <v-text-field
                                v-model="paquete.contrasena"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showPassword ? 'text' : 'password'"
                                label="Contraseña"
                                @click:append="showPassword = !showPassword"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions justify="center" class="flex-column">
                        <v-btn
                            color="success"
                            class="mr-4"
                            @click="ingresar">
                            Ingresar
                        </v-btn>
                        <span class="mt-3">O</span>
                        <a @click="dialogRegistro">Regístrate</a>
                    </v-card-actions>
                </v-card>
            </v-row>
        </div>
        <!-- Registro -->
        <v-dialog
            transition="dialog-top-transition"
            max-width="600" v-model="dialog">
            <v-card>
                <v-toolbar
                    color="primary"
                    dark elevation="2">Regístrate</v-toolbar>
                <v-card-text>
                    <v-form
                        ref="formRegistro"
                        v-model="validRegistro"
                        lazy-validation class="mt-3">
                        <v-text-field
                            v-model="paqueteRegistro.correo"
                            :rules="emailRules"
                            label="Correo" placeholder="correo@gmail.com"
                            required></v-text-field>
                        <v-text-field
                            v-model="paqueteRegistro.contrasena"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassword ? 'text' : 'password'"
                            label="Contraseña"
                            @click:append="showPassword = !showPassword"></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions class="justify-end">
                    <v-btn
                        color="success"
                        @click="registro">Regístrarme</v-btn>
                    <v-btn
                        color="error"
                        @click="dialog = false">Cancelar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
export default {
    data: () => ({
        url: `${process.env.VUE_APP_API_URL}`,
        valid: true,
        validRegistro: true,
        dialog: false,
        showPassword: false,
        paquete: {
            correo: null, contrasena: null
        },
        paqueteRegistro: { correo: null, contrasena: null },
        nameRules: [
            v => !!v || 'Campo requerido'
        ],
        correo: '',
        emailRules: [
            v => !!v || 'Correo es requerido',
            v => /.+@.+\..+/.test(v) || 'Ingrese un correo válido',
        ],
    }),

    methods: {
        async ingresar() {
            if (this.$refs.form.validate()) {
                await this.axios.post(`${this.url}/user/iniciarSesion`, this.paquete).then(response => {
                    switch (response.status) {
                        case 201:
                            if (response.data.status) {
                                localStorage.currentSession = response.data.currentSesion;
                                this.$router.push('/home/subir')
                            }
                            else {
                                alert(response.data.msg);
                            }
                            break;

                        default:
                            break;
                    }
                })
            }
        },
        dialogRegistro() {
            this.showPassword = false;
            this.dialog = true;

        },
        async registro() {
            if (this.$refs.formRegistro.validate()) {
                await this.axios.post(`${this.url}/user/create`, this.paqueteRegistro).then(response => {
                    switch (response.status) {
                        case 201:
                            if (response.data.status) {
                                this.$refs.formRegistro.reset();
                            }
                            alert(response.data.msg);
                            break;

                        default:
                            console.log(response.data);
                            break;
                    }
                })
            }
        }
    },
    async created() {
        if (localStorage.currentSession) {
            await this.axios.get(`${this.url}/user/checkSesion/${localStorage.currentSession}`).then(response => {
                if (response.data) {
                    this.$router.push('/home/buscar');
                }
            });
        }
    }
}
</script>