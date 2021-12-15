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
                imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
                    url: "http://{s}.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0" +
                        "&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}" +
                        "&style=default&format=tiles&tk=f47269183506137375ed3a960cb675cd",
                    layer: "vec_w",
                    style: "default",
                    format: "tiles",
                    tileMatrixSetID: "GoogleMapsCompatible",
                    subdomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"], //天地图8个服务器
                    minimumLevel: 0,
                    maximumLevel: 18,
                }),
            });
            // let tdt =  $CViewer.scene.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
            //     url: "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=f47269183506137375ed3a960cb675cd",
            //     layer: "tdtAnnoLayer",
            //     style: "default",
            //     format: "image/jpeg",
            //     tileMatrixSetID: "GoogleMapsCompatible"
            // }));

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
