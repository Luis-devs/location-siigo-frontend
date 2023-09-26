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
                                v-model="paquete.email"
                                :rules="emailRules"
                                label="Correo" placeholder="correo@gmail.com"
                                required></v-text-field>
                            <v-text-field
                                type="password"
                                v-model="paquete.contrasena"
                                label="Contraseña"
                                required></v-text-field>
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
                        <a @click="registro">Regístrate</a>
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
                        ref="form"
                        v-model="valid"
                        lazy-validation class="mt-3">
                        <v-text-field
                            v-model="paquete.email"
                            :rules="emailRules"
                            label="Correo" placeholder="correo@gmail.com"
                            required></v-text-field>
                        <v-text-field
                            type="password"
                            v-model="paquete.contrasena"
                            label="Contraseña"
                            required></v-text-field>
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
        valid: true,
        dialog: false,
        paquete: {
            email: null, contrasena: null
        },
        nameRules: [
            v => !!v || 'Campo requerido'
        ],
        email: '',
        emailRules: [
            v => !!v || 'Correo es requerido',
            v => /.+@.+\..+/.test(v) || 'Ingrese un correo válido',
        ],
    }),

    methods: {
        ingresar() {
            if (this.$refs.form.validate()) {
                alert('válido');
            }
        },
        registro() {
            this.dialog = true;
        }
    },
}
</script>