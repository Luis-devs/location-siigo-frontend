<template>
  <div id="buscar">
    <v-row justify="center" no-gutters>
      <v-card width="700" max-with="700" class="my-auto mb-4">
        <v-card-title justify="center">
          <h2>Crear puntos</h2>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-autocomplete
              label="Escoja lugar"
              v-model="location"
              :items="locations"
              append-icon="mdi mdi-map-search"
              item-text="name"
              item-value="_id"
              no-data-text="Sin lugares para buscar rutas"
              onchange="obtenerPaht()"
              :rules="autoRules"
              placeholder="Escoja un lugar"
            ></v-autocomplete>

            <div class="input-puntos">
              <div>
                <v-text-field
                  v-model="point.nombre"
                  :rules="nameRules"
                  :counter="20"
                  label="Nombre del punto"
                  required
                ></v-text-field>
              </div>

              <div>
                <v-text-field
                  v-model="point.posX"
                  :rules="nameRules"
                  :counter="10"
                  label="Posición en X"
                  required
                ></v-text-field>
              </div>

              <div>
                <v-text-field
                  v-model="point.posY"
                  :rules="nameRules"
                  :counter="10"
                  label="Posición en Y"
                  required
                ></v-text-field>
              </div>
            </div>
          </v-form>
        </v-card-text>
        <v-card-actions justify="center" class="flex-column">
          <v-btn color="success" class="mr-4" @click="crearPunto">
            Crear punto
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "BuscarVue",
  components: {},
  data: () => ({
    point: {
      nombre: "",
      posX: null,
      posY: null,
    },
    valid: true,
    url: `${process.env.VUE_APP_API_URL}`,
    locations: [],
    location: null,
    autoRules: [(v) => !!v || "Escoja un lugar"],
  }),
  methods: {
    async checkSesion() {
      if (localStorage.currentSession) {
        await this.axios
          .get(`${this.url}/user/checkSesion/${localStorage.currentSession}`)
          .then((response) => {
            if (!response.data) {
              this.$router.push("/");
            }
          });
      } else {
        this.$router.push("/");
      }
    },
    buscarRuta() {
      if (this.$refs.form.validate()) {
        console.log("ruta");
      }
    },
    async crearPunto() {
      this.point.posX = parseInt(this.point.posX);
      this.point.posY = parseInt(this.point.posY);
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3001/path/create-point/65145ff39c7a6d18775a7aa2",
        headers: {
          "Content-Type": "application/json",
        },
        data: this.point,
      };

      this.axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  async created() {
    this.checkSesion();

    await this.axios
      .get(`${this.url}/location`)
      .then((response) => (this.locations = response.data));
  },
};
</script>
<style scoped lang="scss">
.input-puntos {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
}
</style>
