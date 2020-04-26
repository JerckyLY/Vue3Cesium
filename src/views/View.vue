<template>
    <div id="cesiumContainer"></div>
</template>

<script>
import "cesium/Widgets/widgets.css";
import * as Cesium from "cesium/Cesium";
export default {
    name: "View",
    mounted () {
        this.initCesium()
    },
    methods: {
        initCesium () {
            console.log(Cesium.VERSION)
            window.$CViewer =  new Cesium.Viewer('cesiumContainer', {
                //Hide the base layer picker
                baseLayerPicker: false,
                // timeline: false,
                animation: false,
                shouldAnimate: true,
                navigationHelpButton: true,
                fullscreenButton: false,
                geocoder: false,
                scene3DOnly: true,
                homeButton: true,
                imageryProvider: new Cesium.UrlTemplateImageryProvider({
                    url: 'http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}',
                    credit: '',
                    tilingScheme: new Cesium.WebMercatorTilingScheme()
                }),
                mapProjection: new Cesium.WebMercatorProjection()
            });
            let tdt =  $CViewer.scene.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
                url: "http://t0.tianditu.com/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=f47269183506137375ed3a960cb675cd",
                layer: "tdtAnnoLayer",
                style: "default",
                format: "image/jpeg",
                tileMatrixSetID: "GoogleMapsCompatible"
            }));

            const tileset = new Cesium.Cesium3DTileset({
                url: 'Cesium3DTiles/Tilesets/Tileset/tileset.json'
            });

            tileset.readyPromise.then(function(tileset) {
                $CViewer.scene.primitives.add(tileset);
                $CViewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0.0, -0.5, tileset.boundingSphere.radius * 2.0));
            }).otherwise(function(error) {
                console.log(error);
            });
        }
    }
}
</script>

<style scoped>
    #cesiumContainer{
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
        overflow: hidden;
    }
</style>