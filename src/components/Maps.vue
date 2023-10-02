<template>
    <div class="plano">
        <v-card>
            <v-card-text class="d-flex">
                <canvas id="pintar" ref="pintar" class="elevation-3 mx-auto" width="700" height="600"></canvas>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
export default {
    name: "PlanoVue",
    data: () => ({
        url: `${process.env.VUE_APP_API_URL}:${process.env.VUE_APP_API_PORT}`,

    }),
    methods: {
        pintarLienzo(points = []) {
            let lienzo = this.$refs.pintar.getContext('2d');
            lienzo.lineWidth = 0.8; //Defino el ancho de la linea en pixeles
            lienzo.strokeStyle = '#000000'; //Defino el color en hexagesimal
            const radius = 5;
            points.forEach(point => {
                point.ubicaciones.forEach((ubicacion, index) => {
                    let u1 = ubicacion.posX > 50 ? ubicacion.posX : ubicacion.posX * 30, u2 = ubicacion.posY > 50 ? ubicacion.posY : ubicacion.posY * 30;
                    lienzo.beginPath();
                    lienzo.fillStyle = '#0077aa';
                    lienzo.strokeStyle = '#0077aa47';
                    lienzo.arc(u1, u2, radius, 0, 2 * Math.PI, false);
                    lienzo.fill();
                    lienzo.fillStyle = '#000';
                    lienzo.fillText(`${ubicacion.nombre}(${index + 1})`, (u1 - 1), (u2 - 5), 65);
                    lienzo.font = "15px Verdana";
                    lienzo.stroke();
                    lienzo.closePath();
                    point.conexiones.forEach(conexion => {
                        if (conexion.ubicacion1 == ubicacion.nombre || conexion.ubicacion2 == ubicacion.nombre) {
                            this.pintarLinea(ubicacion.nombre, u1, u2, conexion.ubicacion2, point.ubicaciones);
                        }
                    });
                });
            });
        },
        pintarLinea(nombreInicio, xInit, yInit, pointEnd, ubicaciones) {
            let lienzo = this.$refs.pintar.getContext('2d');
            let color = ['#FF5733', '#E08524', '#38E024', '#24E09C', '#2A24E0', '#A124E0', '#8E228E'];
            lienzo.lineWidth = 1;
            ubicaciones.forEach((ubicacion, index) => {
                if (ubicacion.nombre == pointEnd) {
                    lienzo.beginPath(); // Pongo el lápiz
                    lienzo.strokeStyle = color[index];


                    //lienzo.moveTo(200, 100);// lo ubicó para iniciar el dibujo
                    //lienzo.lineTo(ubicacion.posY, xInit);// trazo la linea hasta este punto
                    lienzo.moveTo(xInit, yInit);// lo ubicó para iniciar el dibujo
                    lienzo.lineTo(ubicacion.posX > 50 ? ubicacion.posX : ubicacion.posX * 30, ubicacion.posY > 50 ? ubicacion.posY : ubicacion.posY * 30);
                    lienzo.stroke();// levanto el lápiz
                    lienzo.closePath();
                }
            });
        }
    },
    async mounted() {
        await this.axios.get(`${this.url}/path`).then(response => this.pintarLienzo(response.data));

        /* //EJEX
        lienzo.beginPath(); // Pongo el lápiz
        lienzo.moveTo(10, 0); // lo ubicó para iniciar el dibujo
        lienzo.lineTo(10, 500); // trazo la linea hasta este punto
        lienzo.stroke(); // levanto el lápiz
        lienzo.closePath(); // me alisto para realizar otra parte del dibujo
        //EJE Y
        lienzo.beginPath(); // Pongo el lápiz
        lienzo.moveTo(0, 490);// lo ubicó para iniciar el dibujo
        lienzo.lineTo(700, 490);// trazo la linea hasta este punto
        lienzo.stroke();// levanto el lápiz
        lienzo.closePath();
        const centerX = 100;
        const centerY = 100;
        const radius = 5;
        lienzo.beginPath();
        lienzo.fillStyle = '#0077aa';
        lienzo.strokeStyle = '#0077aa47';
        lienzo.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        lienzo.fill();
        lienzo.stroke();
        lienzo.closePath();

        lienzo.beginPath();
        lienzo.fillStyle = '#0077aa';
        lienzo.strokeStyle = '#0077aa47';
        lienzo.arc(200, 300, radius, 0, 2 * Math.PI, false);
        lienzo.fill();
        lienzo.stroke();
        lienzo.closePath();

        lienzo.beginPath(); // Pongo el lápiz
        lienzo.moveTo(100, 100);// lo ubicó para iniciar el dibujo
        lienzo.lineTo(200, 300);// trazo la linea hasta este punto
        lienzo.stroke();// levanto el lápiz
        lienzo.closePath(); */
    }
}

</script>