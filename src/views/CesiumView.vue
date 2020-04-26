<template>
    <div>
        <div class="title">
            <img  class="title-logo" src="./../assets/logo.png" />
            <div @click="getdata" class="title-text">鹤壁市淇滨区创业创新园三维可视化云平台</div>
        </div>
        <div class="tool-label-room">
            <span @click="roomIn">进入室内</span>
        </div>
        <div v-show="!isBoxFlag" id="switchBtn" @click="isBoxFlag = true">

        </div>
        <!--left 工具面板-->
        <div class="left-container" v-show="isBoxFlag">
<!--            <div class="tool-label-room">-->
<!--                <span @click="roomIn">进入室内</span>-->
<!--            </div>-->
            <span id="closeBoxBtn" @click="isBoxFlag = false"></span>
            <div class="top-tool-bar">
                <!--放大-->
                <div class="tool-bar-item">
                    <div  id="zoomIn" @click="zoomInClick"></div>
                    <div class="tool-label">放大</div>
                </div>
                <!--缩小-->
                <div class="tool-bar-item">
                    <div id="zoomOut" @click="zoomOutClick"></div>
                    <div class="tool-label">缩小</div>
                </div>
                <!--重置-->
                <div class="tool-bar-item">
                    <div id="resetView" @click="homeClick"></div>
                    <div class="tool-label">重置</div>
                </div>
                <!--&lt;!&ndash;漫游&ndash;&gt;-->
                <!--<div class="tool-bar-item">-->
                    <!--<div id="trackView" @click="trackView"></div>-->
                    <!--<div class="tool-label">漫游</div>-->
                <!--</div>-->
                <!--&lt;!&ndash;灯效&ndash;&gt;-->
                <!--<div class="tool-bar-item">-->
                    <!--<div id="lightView" @click="lightClick"></div>-->
                    <!--<div class="tool-label">灯效</div>-->
                <!--</div>-->
            </div>
            <!--<a-slider v-show="isLightToolBar" :defaultValue="100" @change="onChange"></a-slider>-->
            <!--tab-->
<!--            <a-tabs class="tool-tabs-container"  type="card">-->
<!--                <a-tab-pane tab="智能路灯" key="1">-->
<!--                    <div v-for="(item, index) in LightConfig" :key="index" class="tool-list-item" >-->
<!--                        <div class="list-item-light" @click="handleLightClick(item)">{{item.name}}</div>-->
<!--                        <div class="list-item-device" v-for="(fn, order) in item.children" :key="order"><span  @click="handleDeviceClick(fn)">{{fn.name}}</span></div>-->
<!--                    </div>-->
<!--                </a-tab-pane>-->
<!--                &lt;!&ndash;<a-tab-pane tab="智能监控" key="2">Content of Tab Pane 2</a-tab-pane>&ndash;&gt;-->
<!--                <a-tab-pane tab="智能道闸" key="2">-->
<!--                    <div v-for="(item, index) in ParkConfig" :key="index" class="tool-list-item" >-->
<!--                        <div class="list-item-light" @click="handleParkClick(item)">{{item.name}}</div>-->
<!--                    </div>-->
<!--                </a-tab-pane>-->
<!--            </a-tabs>-->

        </div>
        <div id="cesiumContainer"></div>
        <!--<div class="tool-container">-->
            <!--<a-button @click="trackView">漫游</a-button>-->
            <!--<a-button @click="lightClick">灯光</a-button>-->
            <!--<a-button @click="zoomInClick">放大</a-button>-->
            <!--<a-button @click="zoomOutClick">缩小</a-button>-->
        <!--</div>-->
        <!--<CameraVideo></CameraVideo>-->
        <!--弹框-->
        <div id="popup-wind-info" v-show="isPopupFlag">
            <span id="closeBtn" @click="hideAllInfo"></span>
            <!--路灯信息-->
            <div id="lightContainer" v-show="isLightFlag">
                <div class="info-title-text"><span>基本参数</span></div>
                <a-row class="info-item-text"><span>灯具ID：{{lightInfo.lid}}</span></a-row>
                <a-row class="info-item-text"><span>灯具名称：{{lightInfo.name}}</span></a-row>
                <a-row class="info-item-text"><span>灯具编号：{{lightInfo.sn}}</span></a-row>
                <a-row class="info-item-text"><span>灯具状态：{{lightInfo.status}}</span></a-row>
                <a-row class="info-item-text"><span>灯具亮度等级：{{lightInfo.brightnessLevel}}</span></a-row>
                <a-row class="info-item-text"><span>灯具色温等级：{{lightInfo.colorTempLevel}}</span></a-row>
                <a-row class="info-item-text"><span> 当前电流：{{lightInfo.cec}}</span></a-row>
                <a-row class="info-item-text"><span>当前功率：{{lightInfo.cep}}</span></a-row>
                <a-row class="info-item-text"><span>当前电压：{{lightInfo.cot}}</span></a-row>
                <a-row class="info-item-text"><span>累计总电量：{{lightInfo.tec}}</span></a-row>
                <a-row class="info-item-text"><span>最后上报时间：{{lightInfo.lastModifiedTime}}</span></a-row>
            </div>

            <!--传感器信息-->
            <div id="deviceContainer" v-show="isDeviceFlag">
                <div class="info-title-text"><span>基本参数</span></div>
                <a-row class="info-item-text"><span>温度：{{deviceInfo.temperature}}</span></a-row>
                <a-row class="info-item-text"><span>湿度：{{deviceInfo.humidity}}</span></a-row>
                <a-row class="info-item-text"><span>PM10：{{deviceInfo.pm10}}</span></a-row>
                <a-row class="info-item-text"><span>PM25：{{deviceInfo.pm25}}</span></a-row>
                <a-row class="info-item-text"><span>光照度：{{deviceInfo.lumination}}</span></a-row>
                <a-row class="info-item-text"><span>最后上报时间：{{deviceInfo.lastModifiedTime}}</span></a-row>
            </div>

            <!--传感器信息-->
            <div id="parkContainer" v-show="isCarFlag">
                <div class="info-title-text"><span>基本参数</span></div>
                <a-row class="info-item-text"><span>名称：{{carInfo.name}}</span></a-row>
                <a-row class="info-item-text"><span>总车辆：{{carInfo.space}}</span></a-row>
                <a-row class="info-item-text"><span>剩余车辆：{{carInfo.remaining}}</span></a-row>
                <a-row class="info-item-text"><span>地址：{{carInfo.address}}</span></a-row>
            </div>

            <!--传感器信息-->
            <!--<div id="videoContainer" v-show="isVideoFlag">-->
                <!--<div class="info-title-text"><span>实时监控</span></div>-->
                <!--&lt;!&ndash;<CameraVideo></CameraVideo>&ndash;&gt;-->
            <!--</div>-->
        </div>

    </div>
</template>

<script>
import "cesium/Widgets/widgets.css";
import * as Cesium from "cesium/Cesium";
// import CameraVideo from './CameraVideo'
import {LightConfig, ParkConfig} from '../utils/Config'
export default {
    name: "CesiumView",
    // components:{CameraVideo},
    data() {
        return {
            LightConfig,
            ParkConfig,
            modelTileset:'',
            brightness:'',
            transformX: 200, // 距离运动点的距离（后方）
            transformZ: 40, // 距离运动点的高度（上方）
            myPosition: [
                [114.3133465431974,35.72104640847619,3],
                [114.31528304922993,35.72107361879133,3],
                [116.16557113137087,39.94583322718638,3],
                [114.31528643590373,35.721709527952726,3],
                [114.31567353297928,35.72210393369397,3]

            ],
            // isLightToolBar:false,
            isBoxFlag: false,
            isPopupFlag: false,
            isLightFlag: false,
            isDeviceFlag: false,
            isVideoFlag: false,
            isCarFlag: false,
            lightInfo: '',
            deviceInfo: '',
            carInfo: '',
            firstPopupWidowPosition:'', //弹窗框移动
            _cartesian:null,
            subSingleTiles:''
        };
    },
    mounted () {
        this.initCesium()
    },
    activated () {
        console.log('actived')
        document.getElementById('cesiumContainer').style.height = document.body.offsetHeight + 29 + 'px'
        if($CViewer){
            $CViewer.bottomContainer.style = "display:none";
            $CViewer._cesiumWidget._creditContainer.style.display = "none";// 隐藏版权
        }
    },
    created () {
        // window.setInterval(() => {
        //     this.getToken()
        // },1000 * 10)
        console.log('reload')
        // this.getToken()
        console.log(this.LightConfig)
        console.log(this.ParkConfig)
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
                navigationHelpButton: false,
                fullscreenButton: false,
                geocoder: false,
                scene3DOnly: true,
                homeButton: false,
                // imageryProvider: new Cesium.UrlTemplateImageryProvider({
                //     url: 'http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}',
                //     credit: '',
                //     tilingScheme: new Cesium.WebMercatorTilingScheme()
                // }),
                mapProjection: new Cesium.WebMercatorProjection()
            });
            // let tdt =  $CViewer.scene.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
            //     url: "http://t0.tianditu.com/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=f47269183506137375ed3a960cb675cd",
            //     layer: "tdtAnnoLayer",
            //     style: "default",
            //     format: "image/jpeg",
            //     tileMatrixSetID: "GoogleMapsCompatible"
            // }));
            $CViewer.imageryLayers.get(0).show = false;
            $CViewer.scene.globe.show = false;
            $CViewer.bottomContainer.style = "display:none";

            $CViewer._cesiumWidget._creditContainer.style.display = "none";// 隐藏版权
            console.log('init')



            this.modelTileset = new Cesium.Cesium3DTileset({
                url: "model/tileset-hb-cm/tileset.json", //数据路径
                immediatelyLoadDesiredLevelOfDetail: true,
                maximumScreenSpaceError: 8, //最大的屏幕空间误差
                maximumMemoryUsage: 2048,
                maximumNumberOfLoadedTiles: 10000 //最大加载瓦片个数
            });
            this.modelTileset.readyPromise.then( (tileset)=> {
                tileset.show = true
                $CViewer.scene.primitives.add(tileset)
                let heightOffset = -50.0;  //高度
                let boundingSphere = tileset.boundingSphere;
                let cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
                let surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
                let offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset);
                let translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
                tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
                $CViewer.camera.flyTo({
                    destination : Cesium.Cartesian3.fromDegrees(114.31462821516438, 35.71986012546509, 68.65817513232436),
                    orientation : {
                        heading: 6.1962912189509565,
                        pitch: -0.28280923274034064,
                        roll: 6.282897617856079
                    }
                })
                this.addPointPickture()

            }).otherwise(function (error) {
                console.log(error);
            });

            this.subSingleTiles = new Cesium.Cesium3DTileset({
                url: "model/tileset-hb-single/tileset.json", //数据路径
                immediatelyLoadDesiredLevelOfDetail: true,
                maximumScreenSpaceError: 8, //最大的屏幕空间误差
                maximumMemoryUsage: 2048,
                maximumNumberOfLoadedTiles: 10000 //最大加载瓦片个数
            });

            this.subSingleTiles.readyPromise.then( (tileset)=> {
                tileset.show = true
                $CViewer.scene.primitives.add(tileset)
                let heightOffset = -50;  //高度
                let boundingSphere = tileset.boundingSphere;
                let cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
                let surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
                let offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset);
                let translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
                tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
                console.log(tileset.modelMatrix)
                // let position = Cesium.Cartesian3.fromDegrees(114.31481562992431, 35.721365480795896, 16.799303075898646);
                // let m = Cesium.Transforms.eastNorthUpToFixedFrame(position);
                let scale = Cesium.Matrix4.fromUniformScale(1.018)
                Cesium.Matrix4.multiply(  tileset._root.transform, scale,   tileset._root.transform)

                //赋值给tileset

                // $CViewer.zoomTo(tileset)
                $CViewer.camera.flyTo({
                    destination : Cesium.Cartesian3.fromDegrees(114.31462821516438, 35.71986012546509, 68.65817513232436),
                    orientation : {
                        heading: 6.1962912189509565,
                        pitch: -0.28280923274034064,
                        roll: 6.282897617856079
                    }
                })

            }).otherwise(function (error) {
                console.log(error);
            });
            this.subSingleTiles.id = 'floor'


            /***
             * 弹出框随漫游移动
             */
            let  _pm_position_2;
            //每帧渲染结束监听
            $CViewer.scene.postRender.addEventListener( (e)=> {
                if(!this.firstPopupWidowPosition){
                    return
                }
                if (this.firstPopupWidowPosition != _pm_position_2) {
                    _pm_position_2 = Cesium.SceneTransforms.wgs84ToWindowCoordinates($CViewer.scene,  this._cartesian );
                    var trackPopUpContent_ = window.document.getElementById('popup-wind-info')
                    let popW = trackPopUpContent_.offsetWidth
                    let popH = trackPopUpContent_.offsetHeight
                    if (_pm_position_2) {
                        let leftPosition = _pm_position_2.x - popW/2
                        let topPosition = _pm_position_2.y - popH - 2
                        trackPopUpContent_.style.left = leftPosition + 'px'
                        trackPopUpContent_.style.top = topPosition + 'px'
                    }
                }
            });
            // $CViewer.flyTo(tileset)
            // $CViewer.homeButton.viewModel.command.beforeExecute.addEventListener( (e)=> {
            //     e.cancel = true;
            //     $CViewer.flyTo(this.modelTileset)
            // });

           //点击事件
           $CViewer.screenSpaceEventHandler.setInputAction(this.onLeftClickHandler, Cesium.ScreenSpaceEventType.LEFT_CLICK)
            // 鼠标移动事件
            $CViewer.screenSpaceEventHandler.setInputAction(this.mourseMoveHandler, Cesium.ScreenSpaceEventType.MOUSE_MOVE )
            // $CViewer.flyTo(a)
            //灯光
            let stages = $CViewer.scene.postProcessStages
            this.brightness = stages.add(Cesium.PostProcessStageLibrary.createBrightnessStage())
            this.brightness.enabled = true
            this.brightness.uniforms.brightness = 1
            console.log(this.brightness.uniforms.brightness)


        },
        roomIn () {
            this.$router.push({path:'sub'})
        },
        mourseMoveHandler(movement){
            console.log(223)
            const pickedFeature = $CViewer.scene.pick(movement.endPosition);

            if (Cesium.defined(pickedFeature)){
                console.log(pickedFeature instanceof Cesium.Cesium3DTileFeature)

                if(pickedFeature.primitive.id === 'floor'){
                    this.subSingleTiles.style = new Cesium.Cesium3DTileStyle({
                        "show" : "true",
                        "color" : "color('#ffff00')"
                    })
                    }else {
                    this.subSingleTiles.style = undefined
                    // const featureName = pickedFeature.getProperty('name');
                    // if(featureName === 'BOX_06' || featureName === 'BOX_09'){
                    //     this.showPopupInfo(movement.position,3)
                    // }
                    // console.log(featureName)
                    // this.showPopupInfo(movement.position, 3)
                }
            }
        },
        addPointPickture () {
            const _this = this
            // 路灯
            const lightLabel = $CViewer.entities.add({
                name : 'light',
                position : Cesium.Cartesian3.fromDegrees(114.31511115542637, 35.7216988074679,10.016836418924909),
                billboard : {
                    image : 'img/light.png',
                    pixelOffset : new Cesium.Cartesian2(0, -10), // default: (0, 0)
                    verticalOrigin : Cesium.VerticalOrigin.BOTTOM, // default: CENTER
                    height: 79,
                    width: 56,
                    properties:new Cesium.PropertyBag({
                        'id':'tDaeZMcs6wtMsYTELHtD5XbTbW8qNv'
                    })
                }
            });

            lightLabel.pid = 'tDaeZMcs6wtMsYTELHtD5XbTbW8qNv'

            // 设备
            const deviceLabel = $CViewer.entities.add({
                name : 'device',
                position : Cesium.Cartesian3.fromDegrees(114.31513316902443, 35.72170371490304,9.419875772474343),
                billboard : {
                    image : 'img/device.png',
                    pixelOffset : new Cesium.Cartesian2(0, -10), // default: (0, 0)
                    verticalOrigin : Cesium.VerticalOrigin.BOTTOM, // default: CENTER
                    height: 79,
                    width: 56,
                    properties:new Cesium.PropertyBag({
                        'thSn': '40017826',
                        'pmSn': '40017826'
                    })
                }
            });
            deviceLabel.thSn = '40017826'
            deviceLabel.pmSn = '40017826'

            // 道闸
            const parkLabel = $CViewer.entities.add({
                name : 'park',
                position : Cesium.Cartesian3.fromDegrees(114.31450347807697, 35.72249914219846,-0.2507399665729625),
                billboard : {
                    image : 'img/park.png',
                    pixelOffset : new Cesium.Cartesian2(0, -10), // default: (0, 0)
                    verticalOrigin : Cesium.VerticalOrigin.BOTTOM, // default: CENTER
                    height: 79,
                    width: 56
                }
            });
        },
        drawCanvas(img,text,ratio){
            // width height
            var canvas = document.createElement('canvas');      //创建canvas标签
            var ctx = canvas.getContext('2d');

            var width = ctx.measureText(text).width + 8,
                height = 20;

            canvas.style.opacity = 1
            ctx.fillStyle = '#99f'
            canvas.width = width * ratio;
            canvas.height = height * ratio;
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";

            //然后将画布缩放，将图像放大ratio倍画到画布上 目的 是图片文字更加清晰
            ctx.scale(ratio,ratio);
            // canvas.width = ctx.measureText(text).width + fontsize * 2;      //根据文字内容获取宽度
            // canvas.height = fontsize * 2; // fontsize * 1.5
            var image = new Image()
            image.onload = function () {
                ctx.drawImage(image, 0,0,width,height);
                // 名称文字
                ctx.fillStyle = '#00ffff';
                ctx.font = "8px 宋体";
                ctx.fillText(text, 8, height/2 + 2);
            }
            image.src = img

            return canvas;
        },
        // 轨迹动画
        trackView() {
            //Set bounds of our simulation time
            var start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
            var stop = Cesium.JulianDate.addSeconds(start, this.myPosition.length-1, new Cesium.JulianDate());

            //Make sure viewer is at the desired time.
            $CViewer.clock.startTime = start.clone();
            $CViewer.clock.stopTime = stop.clone();
            $CViewer.clock.currentTime = start.clone();
            $CViewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP ; //Loop at the end
            $CViewer.clock.multiplier = 0.2; // 速度

            //Set timeline to simulation bounds
            $CViewer.timeline.zoomTo(start, stop);

            let that = this
            //Generate a random circular pattern with varying heights.
            function computeCirclularFlight() {
                var property = new Cesium.SampledPositionProperty();
                for (var i = 0; i < that.myPosition.length; i++) {
                    var time = Cesium.JulianDate.addSeconds(start, i, new Cesium.JulianDate());
                    var position = Cesium.Cartesian3.fromDegrees(that.myPosition[i][0], that.myPosition[i][1], (that.myPosition[i][2]+50));
                    property.addSample(time, position);

                    //Also create a point for each sample we generate.
                    $CViewer.entities.add({
                        position: position,
                        point: {
                            pixelSize: 1,
                            color: Cesium.Color.TRANSPARENT,
                            outlineColor: Cesium.Color.TRANSPARENT,
                            outlineWidth: 1
                        }
                    });
                }
                return property;
            }

            var position = computeCirclularFlight();

            //Actually create the entity
            var entity = $CViewer.entities.add({
                //Set the entity availability to the same interval as the simulation time.
                availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
                    start: start,
                    stop: stop
                })]),
                //Use our computed positions
                position: position,
                //Automatically compute orientation based on position movement.
                orientation: new Cesium.VelocityOrientationProperty(position),
                point: {
                    pixelSize: 1,
                    color: Cesium.Color.TRANSPARENT,
                    outlineColor: Cesium.Color.TRANSPARENT,
                    outlineWidth: 1
                },
                //Show the path as a pink line sampled in 1 second increments.
                path: {
                    resolution: 1,
                    material: new Cesium.PolylineGlowMaterialProperty({
                        glowPower: 0.1,
                        color: Cesium.Color.TRANSPARENT
                    }),
                    width: 10
                }
            });
            $CViewer.trackedEntity = entity;
            this.setViewHeaderPitchRange()
        },
        getModelMatrix(entity, time, result) {
            let matrix3Scratch = new Cesium.Matrix3();
            let position = Cesium.Property.getValueOrUndefined(entity.position, time, new Cesium.Cartesian3());
            if (!Cesium.defined(position)) {
                return undefined;
            }
            var orientation = Cesium.Property.getValueOrUndefined(entity.orientation, time, new Cesium.Quaternion());
            if (!Cesium.defined(orientation)) {
                result = Cesium.Transforms.eastNorthUpToFixedFrame(position, undefined, result);
            } else {
                result = Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromQuaternion(orientation, matrix3Scratch),
                    position, result);
            }
            return result;
        },
        //
        preRenderListener () {

            if ( $CViewer.trackedEntity) {
                let scratch = new Cesium.Matrix4();
                this.getModelMatrix( $CViewer.trackedEntity, $CViewer.clock.currentTime, scratch);
                // var transformX =  this.transformX; //距离运动点的距离（后方）
                // var transformZ =  this.transformZ; //距离运动点的高度（上方）
                // $CViewer.scene.camera.lookAtTransform(scratch, new Cesium.HeadingPitchRange(heading, pitch, 0));

                $CViewer.scene.camera.lookAtTransform(scratch, new Cesium.Cartesian3(-this.transformX, 0, this.transformZ));
            }
        },
        // 跟踪视角
        setViewHeaderPitchRange () {
            $CViewer.scene.preRender.addEventListener(this.preRenderListener);
        },
        onLeftClickHandler (movement) {
            // this.showPopupInfo(movement.position, 3)
            // 屏幕坐标
            console.log(movement.position)
            // 笛卡尔坐标
            var sss = $CViewer.scene.pickPosition(movement.position); //单击位置
            //将笛卡尔坐标转化为经纬度坐标
            var car = Cesium.Cartographic.fromCartesian(sss);
            var lon = Cesium.Math.toDegrees(car.longitude);
            var lat = Cesium.Math.toDegrees(car.latitude);
            var height = car.height;
            console.log(lon)
            console.log(lat)
            console.log(height)

            const pickedFeature = $CViewer.scene.pick(movement.position);
            if (Cesium.defined(pickedFeature)){
                if(pickedFeature['id']){
                    const name = pickedFeature.id._name
                    if (name === 'light') {
                        this.getLightData(pickedFeature.id.pid)
                        this.showPopupInfo(movement.position,1)
                    } else if (name === 'device') {
                        this.getDeviceData(pickedFeature.id.thSn, pickedFeature.id.pmSn)
                        this.showPopupInfo(movement.position,2)
                    } else if (name === 'park') {
                        this.getParkData()
                        this.showPopupInfo(movement.position,4)
                    }
                }else{
                    if(pickedFeature.primitive.id === 'floor'){
                        this.roomIn()
                    }
                    // const featureName = pickedFeature.getProperty('name');
                    // if(featureName === 'BOX_06' || featureName === 'BOX_09'){
                    //     this.showPopupInfo(movement.position,3)
                    // }
                    // console.log(featureName)
                    // this.showPopupInfo(movement.position, 3)
                }
            }

        },
        lightClick () {
            this.isLightToolBar = !this.isLightToolBar
            // if(this.isLight){
            //     this.brightness.uniforms.brightness =0
            // }else{
            //     this.brightness.uniforms.brightness =1
            // }
            // this.isLight = !this.isLight
        },
        zoomInClick () {
            // 获取当前镜头位置的笛卡尔坐标
            let cameraPos = $CViewer.camera.position;
            // 获取当前坐标系标准
            let ellipsoid = $CViewer.scene.globe.ellipsoid;

            // 根据坐标系标准，将笛卡尔坐标转换为地理坐标
            let cartographic = ellipsoid.cartesianToCartographic(cameraPos);
            // 获取镜头的高度
            let height = cartographic.height;
            // 根据上面当前镜头的位置，获取该中心位置的经纬度坐标
            let centerLon = parseFloat(Cesium.Math.toDegrees(cartographic.longitude).toFixed(8));
            let centerLat = parseFloat(Cesium.Math.toDegrees(cartographic.latitude).toFixed(8));
            // 镜头拉近
            $CViewer.camera.zoomIn(height / 3);
        },
        zoomOutClick () {
            // 获取当前镜头位置的笛卡尔坐标
            let cameraPos = $CViewer.camera.position;


            // 获取当前坐标系标准
            let ellipsoid = $CViewer.scene.globe.ellipsoid;

            // 根据坐标系标准，将笛卡尔坐标转换为地理坐标
            let cartographic = ellipsoid.cartesianToCartographic(cameraPos);
            // 获取镜头的高度
            let height = cartographic.height;
            // 根据上面当前镜头的位置，获取该中心位置的经纬度坐标
            let centerLon = parseFloat(Cesium.Math.toDegrees(cartographic.longitude).toFixed(8));
            let centerLat = parseFloat(Cesium.Math.toDegrees(cartographic.latitude).toFixed(8));
            // 镜头远离
            $CViewer.camera.zoomOut(height * 1.2);
        },
        homeClick () {
            $CViewer.camera.flyTo({
                destination : Cesium.Cartesian3.fromDegrees(114.31462821516438, 35.71986012546509, 68.65817513232436),
                orientation : {
                    heading: 6.1962912189509565,
                    pitch: -0.28280923274034064,
                    roll: 6.282897617856079
                }
            })
        },
        //路灯点击
        handleLightClick (item) {
            // 关闭全部
            this.hideAllInfo()
            this.getLightData(item)
            $CViewer.camera.flyTo({
                destination : Cesium.Cartesian3.fromDegrees(item.cameraPosition.lng, item.cameraPosition.lat, item.cameraPosition.height),
                orientation : item.cameraPosition.orientation,
                complete:  (e)=> {
                    this.showPopupInfo(item.windowPosition, 1)
                }
            });
            // $CViewer.camera.lookAt(Cesium.Cartesian3.fromDegrees(114.31536013848576, 35.721569872273115, 23.411405947790854), new Cesium.HeadingPitchRange(5.77401419329987, -0.7135381797481735, 40));
            console.log(item)

        },
        // 传感器点击
        handleDeviceClick (item) {
            // 关闭全部
            this.hideAllInfo()
            this.getDeviceData(item)
            $CViewer.camera.flyTo({
                destination : Cesium.Cartesian3.fromDegrees(item.cameraPosition.lng, item.cameraPosition.lat, item.cameraPosition.height),
                orientation : item.cameraPosition.orientation,
                complete:  (e)=> {
                    this.showPopupInfo(item.windowPosition, 2)
                }
            });
            // $CViewer.camera.lookAt(Cesium.Cartesian3.fromDegrees(item.lng, item.lat, item.height), new Cesium.HeadingPitchRange(5.118403482469798, -0.38337802579261027, 50));
            // this.showPopupInfo(item.windowPosition, 2)

        },
        // 视频
        handleVideoClick () {
          this.showPopupInfo()
        },
        // 停车场
        handleParkClick (item) {
            this.hideAllInfo()
            this.getParkData()
            $CViewer.camera.flyTo({
                destination : Cesium.Cartesian3.fromDegrees(item.cameraPosition.lng, item.cameraPosition.lat, item.cameraPosition.height),
                orientation : item.cameraPosition.orientation,
                complete:  (e)=> {
                    this.showPopupInfo(item.windowPosition, 4)
                }
            });
        },
        /**
         * 显示起泡弹出框 屏幕坐标 和 显示的弹出框类型 1 灯光 2 传感器设备 3 视频 4 车辆电子栏
         */
        showPopupInfo (position, type) {
            // 关闭全部
            this.hideAllInfo()

            let popupWind = document.getElementById('popup-wind-info')
            popupWind.style.display = 'block' // 必须写不然 offsetWidth offsetHeight 为0 videoContainer parkContainer
            // 显示弹出框
            this.isPopupFlag = true
            let _this = this
            switch (type){
                case 1: _this.isLightFlag = true; document.getElementById('lightContainer').style.display = 'block'; break;
                case 2: _this.isDeviceFlag = true;document.getElementById('deviceContainer').style.display = 'block'; break;
                case 3: _this.isVideoFlag = true;break;
                case 4: _this.isCarFlag = true; document.getElementById('parkContainer').style.display = 'block';break;
            }
            let leftPosition = position.x -  popupWind.offsetWidth/2
            let topPosition = position.y - popupWind.offsetHeight - 2

            popupWind.style.left = leftPosition + 'px'
            popupWind.style.top = topPosition + 'px'
            this.firstPopupWidowPosition = position
            this._cartesian = $CViewer.scene.pickPosition(position)
        },
        // 获取灯光数据
        getLightData (id) {
            console.log(this.$axios.defaults.baseURL)
            this.$axios.get(process.env.VUE_APP_HB_SERVICE + process.env.VUE_APP_SERVICE_LIGHT_API, {
                params:{
                    lpid:id
                }
            }).then(res => {
                this.lightInfo = res.data.data[0]
                console.log(res)

            })
        },
        // 获取传感器的数据
        getDeviceData (thSn,pmSn) {
            // this.$axios.get('netCollector/sensorInfo?thSn=' + item.thSn +'&&pmSn='+ item.pmSn + '&lightSn=').then(res => {
            //
            // })
            this.$axios.get(process.env.VUE_APP_HB_SERVICE + process.env.VUE_APP_SERVICE_DEVICE_API,{
                params:{
                    thSn:thSn,
                    pmSn:pmSn,
                    lightSn:''
                }
            }).then(res => {
                console.log(res)
                this.deviceInfo = res.data.data

            })
        },
        // 获取停车场信息
        getParkData () {
            const url =  process.env.VUE_APP_HB_PAREK_SERVICE + process.env.VUE_APP_SERVICE_PARK_API
            this.$axios.get(url).then(res => {
              this.carInfo = res.data.data[0]
            }).catch(err => {
                console.log(err)
            })
        },
        hideAllInfo () {
          this.isPopupFlag = false
          this.isLightFlag = false
          this.isDeviceFlag = false
          this.isCarFlag = false
          this.isVideoFlag = false
        },
        // // 滑动灯光
        // onChange (value) {
        //     console.log(value)
        //     this.brightness.uniforms.brightness = value/100
        // },

        // debugger info
        getdata () {
            // this.modelTileset.show = !this.modelTileset.show
            console.log('...........heading pitch roll.......')
            console.log($CViewer.camera.heading)
            console.log($CViewer.camera.pitch)
            console.log($CViewer.camera.roll)
            console.log($CViewer.camera.position)
            var sss = $CViewer.camera.position
            var car = Cesium.Cartographic.fromCartesian(sss);
            var lon = Cesium.Math.toDegrees(car.longitude);
            var lat = Cesium.Math.toDegrees(car.latitude);
            console.log('...........lng lat height.......')
            console.log(lon)
            console.log(lat)
            console.log(car.height)

        },
        getToken () {
            this.$axios.post(process.env.VUE_APP_HB_SERVICE + process.env.VUE_APP_SERVICE_TOKEN_API, {
                username: 'tokentest',
                password: '123456'
            }).then( res => {
                console.log(res.data)
                window.localStorage.setItem('HB_SERVICE_API_TOKEN','Bearer '+ res.data.data.token)
                window.localStorage.setItem('HB_SERVICE_API_EXPIRETIME', res.data.data.expireAt)
            })
        }
    }
};
</script>

<style lang='less' scoped>
.title{
        position: absolute;
        top: 35px;
        left: 25px;
        z-index: 999;
        background: url("../assets/title.png");
        background-size: 709px 98px;
        width: 709px;
        height: 98px;
        display: flex;
        justify-content: left;
        align-items: center;
        .title-logo{
            margin-left: 37px;
            margin-top: 5px;
            margin-right: 19px;
            height: 50px;
            width: 43px;
        }
        .title-text{
            width:570px;
            font-size:30px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(74,255,255,1);
        }
    }

.ant-slider{
    margin: 0px 26px;
}
#switchBtn{
    position: absolute;
    top: 221px;
    left: 25px;
    z-index: 999;
    width: 53px;
    height: 48px;
    background: url("./../assets/switch.png");
    background-size: 53px 48px;
    cursor: pointer;
}
#switchBtn:hover{
    background: url("./../assets/switch.png");
    background-size: 53px 48px;
}

.tool-label-room{
    width:250px;
    height:48px;
    background:rgba(2,59,98,0.4);
    border:1px solid rgba(0,245,255,1);
    cursor: pointer;
    font-size:18px;
    font-family:PingFang SC;
    font-weight:400;
    color:rgba(74,255,255,1);
    position: absolute;
    top: 163px;
    left: 30px;
    z-index: 999;
    text-align: center;
    line-height: 45px;
}

    /*左侧面板*/
.left-container{
    position: absolute;
    top: 221px;
    left: 30px;
    z-index: 999;
    width:198px;
    height:144px;
    /*max-height: 700px;*/
    /*overflow: auto;*/
    background:rgba(2,59,98,0.4);
    border:1px solid rgba(0,245,255,1);

    #closeBoxBtn{
        float: right;
        top: 12px;
        right: 13px;
        position: relative;
        width: 15px;
        height: 2px;
        cursor: pointer;
        background: url("./../assets/close.png");
        background-size: 15px 2px;
    }
    #closeBoxBtn:hover{
        background: url("./../assets/closeHover.png");
        background-size: 15px 2px;
    }


    .top-tool-bar{
        margin: 38px 26px;
        height: 67px;
        display: flex;
        justify-content: space-between;


        .tool-bar-item{
            display: flex;
            flex-direction: column;
            align-items: center;

            #zoomIn{
                width: 45px;
                height: 41px;
                background: url("./../assets/zoomIn.png");
                background-size: 45px 41px;
                cursor: pointer;

            }
            #zoomIn:hover{
                /*background: #10c8d4;*/
                /*opacity: 0.6;*/
                background: url("./../assets/zoomInHover.png");
                background-size: 45px 41px;
            }

            #zoomOut{
                width: 45px;
                height: 41px;
                background: url("./../assets/zoomOut.png");
                background-size: 45px 41px;
                cursor: pointer;

            }
            #zoomOut:hover{
                background: url("./../assets/zoomOutHover.png");
                background-size: 45px 41px;
            }

            #resetView{
                width: 45px;
                height: 41px;
                background: url("./../assets/reset.png");
                background-size: 45px 41px;
                cursor: pointer;
            }

            #resetView:hover{
                background: url("./../assets/resetHover.png");
                background-size: 45px 41px;
            }

            #lightView{
                width: 45px;
                height: 41px;
                background: url("./../assets/light.png");
                background-size: 45px 41px;
                cursor: pointer;

            }

            #lightView:hover{
                background: url("./../assets/lightHover.png");
                background-size: 45px 41px;
            }

            #trackView{
                width: 45px;
                height: 41px;
                background: url("./../assets/view.png");
                background-size: 45px 41px;
                cursor: pointer;

            }

            #trackView:hover{
                background: url("./../assets/viewHover.png");
                background-size: 45px 41px;
            }

            .tool-label{
                font-size:14px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:#4AFFFF;
                opacity:0.8;
            }
        }
    }

    .tool-tabs-container{
        margin: 34px 26px;

        .tool-list-item{
            margin-left: 14px;
            margin-top: 25px;
            font-size:16px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(74,255,255,1);
            cursor: pointer;
        }
        .list-item-device{
            font-size:14px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(240,240,240,1);
            margin-top: 15px;
            margin-left: 20px;
            cursor: pointer;

        }
    }

}

.ant-tabs-nav-container-scrolling{
    padding-right: unset;
    padding-left: unset;
}
.ant-tabs-tab-prev.ant-tabs-tab-arrow-show, .ant-tabs-tab-next.ant-tabs-tab-arrow-show{
    display: none;
}

.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab{

    background:rgba(2,59,98,1) ;
    opacity: 0.8 ;
    color: white;
    line-height: 39px;
    border: unset;
    padding: 0 12px;
    margin-right: unset;
    background: #0d4d7d;
    /* opacity: 1; */
    color: #fff;
    line-height: 39px;
    border: unset;
    /* padding: 0 12px; */
    /* margin-right: unset; */
    border-radius: 6px 0 0 6px;
}
.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active{
    background: rgb(2, 101, 162);
    color: white;
    border-radius:unset;
    opacity: 0.8;

}
.ant-tabs-bar{
    border-bottom: unset;
}

#popup-wind-info{
    background:rgba(2,59,98,0.4);
    border:1px solid rgba(0,245,255,1);
    position: absolute;
    z-index: 666;
    padding: 37px 22px 37px 39px;
    min-width: 450px;

    #closeBtn{
        float: right;
        top: -28px;
        position: relative;
        width: 15px;
        height: 16px;
        cursor: pointer;
        background: url("./../assets/default.png");
        background-size: 15px 16px;
    }
    #closeBtn:hover{
        background: url("./../assets/hover.png");
        background-size: 15px 16px;
    }

    .info-title-text{
        background: url("./../assets/infobg.png");
        background-size: 215px 36px;
        width: 215px;
        height: 36px;
        padding: 5px 13px 0;
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(0,245,255,1);
    }
    .info-item-text{
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(239,239,239,1);
        margin: 5px 12px;
    }

}
#cesiumContainer{
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    overflow: hidden;
}
.tool-container {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 999;
    padding: 5px 10px;
    background: white;
    border: 1px solid #ccc;
}
</style>