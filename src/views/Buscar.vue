<template>
    <div id="buscar">
        <v-row justify="center" no-gutters>
            <v-card width="600" max-with="700" class="my-auto mb-4">
                <v-col cols="9" class="mx-auto mt-4">
                    <l-map
                        :zoom="zoom"
                        :center="center"
                        style="height: 500px; width: 100%">
                        <l-tile-layer
                            :url="urlM"
                            :attribution="attribution" />
                        <l-marker v-for="(point, index) in points" :key="index"
                            :lat-lng="getLat(point.lat, point.lng)">
                            <l-popup :content="point.description" />
                        </l-marker>
                        <l-polyline :lat-lngs="travel" />
                    </l-map>
                </v-col>
                <v-card-title justify="center">
                    <h2>Mejor ruta</h2>
                </v-card-title>
                <v-card-text>
                    <v-form
                        ref="form"
                        v-model="valid"
                        lazy-validation>
                        <v-autocomplete label="Escoja lugar" v-model="location" :items="locations" append-icon="mdi mdi-map-search" item-text="name" item-value="_id" no-data-text="Sin lugares para buscar rutas" :rules="autoRules" placeholder="Escoja un lugar"></v-autocomplete>
                        <v-autocomplete label="Escoja punto" v-model="punto" :items="puntos" append-icon="mdi mdi-map-search" item-text="nombre" item-value="nombre" no-data-text="Sin puntos" placeholder="Punto de inicio"></v-autocomplete>
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
import { latLng } from 'leaflet'
import L from 'leaflet'
import { LMap, LTileLayer, LMarker, LPopup, LPolyline } from 'vue2-leaflet';
export default {
    name: "BuscarVue",
    components: {
        Plano,
        LMap,
        LTileLayer,
        LMarker,
        LPopup, LPolyline
    },
    data: () => ({
        valid: true,
        url: `${process.env.VUE_APP_API_URL}`,
        locations: [],
        location: null,
        currentUbication: [],
        punto: null, puntos: [], autoRules: [
            v => !!v || 'Escoja un lugar'
        ], zoom: 6,
        points: [
            { description: "Montería", lng: -75.88143, lat: 8.74798 }
        ],
        travel: [[-75.88143, 8.74798], [8.74798, -75.88043]],
        path: "@/assets/img/",
        center: [4.570868, -74.297333],
        urlM: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        marker: latLng(4.570868, -74.297333)
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
        async buscarRuta() {
            if (this.$refs.form.validate()) {
                if (this.punto) {
                    await this.axios.post(`${this.url}/dijkstra/${this.location}/${this.punto}`).then(response => {
                        console.log(response);
                    });
                } else {
                    await this.axios.post(`${this.url}/dijkstra/${this.location}`).then(response => {
                        console.log(response);
                    });
                }
            }
        },
        getLat(lat, lng) {
            console.log(latLng(lat, lng));
            return latLng(lat, lng);
        }
    },
    watch: {
        async location() {
            this.puntos = [];
            await this.axios.get(`${this.url}/path/location/${this.location}`).then(response => {
                if (Array.isArray(response.data.ubicaciones)) {
                    response.data.ubicaciones.forEach(ubicacion => {
                        this.puntos.push({ nombre: ubicacion.nombre });
                    });
                }
            });
        }
    },
    async created() {
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png')
        });
        this.checkSesion();
        await this.axios.get(`${this.url}/location`).then(response => this.locations = response.data);
    },
}
</script>