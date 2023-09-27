<template>
    <div class="plano">
        <v-card>
            <v-card-text class="d-flex">
                <canvas id="pintar" ref="pintar" class="elevation-3 mx-auto" width="700" height="500"></canvas>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
export default {
    name: "PlanoVue",
    data: () => ({

    }),
    mounted() {
        const lienzo = this.$refs.pintar.getContext('2d');
        lienzo.lineWidth = 0.8; //Defino el ancho de la linea en pixeles
        lienzo.strokeStyle = '#000000'; //Defino el color en hexagesimal

        //EJEX
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
        lienzo.closePath();
    }
}

</script>