<template>
    <div>
        <div class="title">
            <img  class="title-logo" src="./../assets/logo.png" />
            <div @click="getdata" class="title-text">鹤壁市淇滨区创业创新园三维可视化云平台</div>
        </div>

        <div class="tool-label-room">
            <div @click="roomOut">退出室内</div>
            <div class="nav-vertical"></div>
            <div @click="showRoof">房顶开关</div>
        </div>
        <!--left 工具面板-->
        <div v-show="!isBoxFlag" id="switchBtn" @click="isBoxFlag = true">

        </div>
        <div class="left-container" v-show="isBoxFlag">

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
                <!--漫游-->
                <div class="tool-bar-item">
                    <div id="trackView" @click="trackClick"></div>
                    <div class="tool-label">漫游</div>
                </div>
<!--                &lt;!&ndash;灯效&ndash;&gt;-->
<!--                <div class="tool-bar-item">-->
<!--                    <div id="lightView" @click="lightClick"></div>-->
<!--                    <div class="tool-label">灯效</div>-->
<!--                </div>-->
            </div>
<!--            <a-slider v-show="isLightToolBar" :defaultValue="100" @change="onChange"></a-slider>-->
            <!--tab-->
<!--            <a-tabs class="tool-tabs-container"  type="card">-->
<!--                &lt;!&ndash;<a-tab-pane tab="智能路灯" key="1">&ndash;&gt;-->
<!--                    &lt;!&ndash;<div v-for="(item, index) in LightConfig" :key="index" class="tool-list-item" >&ndash;&gt;-->
<!--                        &lt;!&ndash;<div class="list-item-light" @click="handleLightClick(item)">{{item.name}}</div>&ndash;&gt;-->
<!--                        &lt;!&ndash;<div class="list-item-device" v-for="(fn, order) in item.children" :key="order"><span  @click="handleDeviceClick(fn)">{{fn.name}}</span></div>&ndash;&gt;-->
<!--                    &lt;!&ndash;</div>&ndash;&gt;-->
<!--                &lt;!&ndash;</a-tab-pane>&ndash;&gt;-->
<!--                <a-tab-pane tab="智能监控" key="2">-->
<!--                    <div v-for="(item, index) in VideoConfig" :key="index" class="tool-list-item" >-->
<!--                        <div class="list-item-light" @click="handleVideoClick(item)">{{item.name}}</div>-->
<!--                    </div>-->
<!--                </a-tab-pane>-->
<!--                &lt;!&ndash;<a-tab-pane tab="智能道闸" key="3">Content of Tab Pane 3</a-tab-pane>&ndash;&gt;-->
<!--            </a-tabs>-->

        </div>
        <div id="subcesiumContainer"></div>
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
            <!--&lt;!&ndash;路灯信息&ndash;&gt;-->

            <!--传感器信息-->
            <div id="videoContainer" v-show="isVideoFlag">
                <div class="info-title-text"><span>实时监控</span></div>
                <!--<CameraVideo></CameraVideo>-->
                <Video :flag="isVideoFlag" :url="rtspUrl"></Video>
            </div>
        </div>

    </div>
</template>

<script>
    import "cesium/Widgets/widgets.css";
    import * as Cesium from "cesium/Cesium";
    import CameraVideo from './CameraVideo'
    import Video from './Video'
    import {VideoConfig} from '../utils/Config'
    export default {
        name: "SubCesiumView",
        components:{CameraVideo, Video},
        data() {
            return {
                isBoxFlag: false,
                VideoConfig,
                modelTileset:'',
                rtspUrl: 'rtsp://admin:tdnlediti123456@192.168.34.97:554',
                brightness:'',
                transformX: 2, // 距离运动点的距离（后方）
                transformZ: 0, // 距离运动点的高度（上方）
                transformY: 50, // 正为左侧 向右观看
                passagePosition: [
                    [116.39063536804765,39.90691247632833,0.45],
                    [116.39073241923477,39.90691197962624,0.45],
                    [116.39087506786784,39.90691193656327,0.45],
                    [116.39099554902204,39.90691306896889,0.45],
                    [116.39109850308735,39.906911409443985,0.45],
                    [116.3912383109313,39.906911599477404,0.45],
                    [116.39143362719396,39.90691084343947,0.45],
                    [116.39155309825588,39.90691080726476,0.45],
                    [116.39173107310252,39.906910753535676,0.45],
                    [116.39181989753475,39.90691142349039,0.45],
                    [116.39170931487507,39.90691076003827,0.45],
                    [116.39158987936212,39.90691126056339,0.45],
                    [116.39144039825851,39.90691084139623,0.45],
                    [116.39128567678031,39.906911584965584,0.45],
                    [116.39118284112293,39.90691045498578,0.45],
                    [116.39104518778817,39.90691072895196,0.45],
                    [116.39093636749966,39.9069102976966,0.45],
                    [116.390778257351,39.90691011895772,0.45],
                    [116.39067343778363,39.90691131003374,0.45]

                ],// 走廊漫游路线
                officePosition: [
                    [116.39077299726051, 39.90694839342579,0.46085794195155716],
                    [116.39072055295274,39.906947595337314,0.4600390304241433],
                    [116.39071597812155, 39.90698222354168,0.4603849584855478],
                    [116.39065886737654, 39.90698254391094,0.4720731377115316],
                    [116.39062456008014, 39.90698267150007,0.4746209042437371],

                ], // 办公室漫游路线
                isOfficeTrack:false, // 是否为办公室漫游
                isLightToolBar:true,
                isPopupFlag: false,
                isLightFlag: false,
                isVideoFlag: false,
                firstPopupWidowPosition:'', //弹窗框移动
                _cartesian:null,
                roomRoofTileset: '',
                roomTileset:''
            };
        },
        mounted () {
            this.initCesium()
        },
        activated () {
            document.getElementById('subcesiumContainer').style.height = document.body.offsetHeight + 29 + 'px'
            if($SCViewer){
                $SCViewer.bottomContainer.style = "display:none";
                $SCViewer._cesiumWidget._creditContainer.style.display = "none";// 隐藏版权

            }
        },
        created () {
        },
        methods: {
            initCesium () {
                console.log(Cesium.VERSION)
                window.$SCViewer =  new Cesium.Viewer('subcesiumContainer', {
                    //Hide the base layer picker
                    baseLayerPicker: false,
                    // timeline: false,
                    shadow: true,
                    animation: false,
                    shouldAnimate: true,
                    navigationHelpButton: false,
                    fullscreenButton: false,
                    geocoder: false,
                    // globe: false,
                    scene3DOnly: true,
                    homeButton: false,
                    // imageryProvider: new Cesium.UrlTemplateImageryProvider({
                    //     url: 'http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}',
                    //     credit: '',
                    //     tilingScheme: new Cesium.WebMercatorTilingScheme()
                    // }),
                    // mapProjection: new Cesium.WebMercatorProjection()
                });
                // $SCViewer.scene.globe.enableLighting = true
                $SCViewer.scene.globe.show = false;
                $SCViewer.bottomContainer.style = "display:none";

                $SCViewer._cesiumWidget._creditContainer.style.display = "none";// 隐藏版权
                //获取webgl 对象
                console.log($SCViewer.scene.context._gl)
                // this.initLightMain($SCViewer.scene.context._gl)

                // 房顶
                this.roomRoofTileset = new Cesium.Cesium3DTileset({
                    url: "model/room-01/tileset.json", //数据路径
                    immediatelyLoadDesiredLevelOfDetail: true,
                    maximumScreenSpaceError: 8, //最大的屏幕空间误差
                    maximumMemoryUsage: 2048,
                    maximumNumberOfLoadedTiles: 10000 //最大加载瓦片个数
                });
                this.roomRoofTileset.readyPromise.then( (tileset)=> {
                    tileset.show = false
                    $SCViewer.scene.primitives.add(tileset)

                    // $SCViewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0.0, -0.3, tileset.boundingSphere.radius * 2.0));
                }).otherwise(function (error) {
                    console.log(error);
                });

                // 其他
                this.roomTileset = new Cesium.Cesium3DTileset({
                    url: "model/room-02/tileset.json", //数据路径
                    immediatelyLoadDesiredLevelOfDetail: true,
                    maximumScreenSpaceError: 8, //最大的屏幕空间误差
                    maximumMemoryUsage: 2048,
                    maximumNumberOfLoadedTiles: 10000 //最大加载瓦片个数
                });
                this.roomTileset.readyPromise.then( (tileset)=> {
                    tileset.show = true
                    $SCViewer.scene.primitives.add(tileset)

                    $SCViewer.camera.flyTo({
                        destination : Cesium.Cartesian3.fromDegrees(116.39066976333797, 39.906900369515114, 3.20287758492561),
                        orientation : {
                            heading: 1.3070285140484206,
                            pitch: -0.1858857191370613,
                            roll: 0.0032456993147480517
                        }
                    });
                    // $SCViewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0.0, -0.3, tileset.boundingSphere.radius * 2.0));
                }).otherwise(function (error) {
                    console.log(error);
                });

                /***
                 * 弹出框随漫游移动
                 */
                let  _pm_position_2;
                //每帧渲染结束监听
                $SCViewer.scene.postRender.addEventListener( (e)=> {
                    if(!this.firstPopupWidowPosition){
                        return
                    }
                    if (this.firstPopupWidowPosition != _pm_position_2) {
                        _pm_position_2 = Cesium.SceneTransforms.wgs84ToWindowCoordinates($SCViewer.scene,  this._cartesian );
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
                this.initLightPoint()

                //点击事件
                $SCViewer.screenSpaceEventHandler.setInputAction(this.onLeftClickHandler, Cesium.ScreenSpaceEventType.LEFT_CLICK)
                // $SCViewer.flyTo(a)
                //灯光
                let stages = $SCViewer.scene.postProcessStages
                this.brightness = stages.add(Cesium.PostProcessStageLibrary.createBrightnessStage())
                this.brightness.enabled = true
                this.brightness.uniforms.brightness = 1
                console.log(this.brightness.uniforms.brightness)

                // this.addPointPickture()
                // this.Lockpitch()
            },
            initLightPoint () {
                var scene = $SCViewer.scene;
                // scene.debugShowFramesPerSecond = true;
                $SCViewer.terrainShadows = false;

                var lightCenter = Cesium.Cartesian3.fromDegrees(116.3906602787858, 39.907020710416376, 3.5862625975177624);
                var camera = new Cesium.Camera($SCViewer.scene);
                camera.position= lightCenter;
                camera.setView({
                    destination : Cesium.Cartesian3.fromDegrees(116.39068460949534,39.90700287611289,1),
                    orientation: {
                        heading : 0, // east, default value is 0.0 (north)
                        pitch :  Cesium.Math.toRadians(-90.0),    // default value (looking down)
                        roll : 0                             // default value
                    }})
                console.log(camera.heading)
                console.log(camera.pitch)
                console.log(camera.roll)
                var shadowMapTemp = new Cesium.ShadowMap({
                    context: scene.context,
                    lightCamera: camera,
                    maxmimumDistance: 30,
                    pointLightRadius: 5.0,
                    darkness: 0.4,
                    numberOfCascades: 1,
                    cascadesEnabled: false,
                    isPointLight: true,
                    softShadows: false
                });
                shadowMapTemp.enabled = true;
                shadowMapTemp.debugShow = false;
                scene.shadowMap = shadowMapTemp;
                $SCViewer.shadows = false

            },

            roomOut () {
                if(this.isOfficeTrack){
                    //走廊
                    $SCViewer.camera.flyTo({
                        destination : Cesium.Cartesian3.fromDegrees(116.39066976333797, 39.906900369515114, 3.20287758492561),
                        orientation : {
                            heading: 1.3070285140484206,
                            pitch: -0.1858857191370613,
                            roll: 0.0032456993147480517
                        }
                    });
                    // 关闭办公室漫游状态
                    this.isOfficeTrack = false
                    // 关闭漫游
                    $SCViewer.trackedEntity = undefined
                }else{
                    this.$router.push({path:'/'})
                }
            },
            addPointPickture () {
                const _this = this
              // 灯光按钮
                const lightSwitch = $SCViewer.entities.add({
                    name : 'lightSwitch',
                    position : Cesium.Cartesian3.fromDegrees(116.34102700912692, 39.91165747386675,79.39635650724263),
                    billboard : {
                        image : 'img/lightSwitch.png',
                        pixelOffset : new Cesium.Cartesian2(20, 20), // default: (0, 0)
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

            /**
             * 漫游 漫游路线数组 pathArray  路线高度偏移offsetHeight
             */
            trackView (pathArray, offsetHeight) {

                if($SCViewer.trackedEntity){
                    $SCViewer.trackedEntity = undefined
                    return
                }
                //Set bounds of our simulation time
                var start = Cesium.JulianDate.fromDate(new Date());
                var stop = Cesium.JulianDate.addSeconds(start, pathArray.length-1, new Cesium.JulianDate());

                //Make sure viewer is at the desired time.
                $SCViewer.clock.startTime = start.clone();
                $SCViewer.clock.stopTime = stop.clone();
                $SCViewer.clock.currentTime = start.clone();
                $SCViewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP ; //Loop at the end
                $SCViewer.clock.multiplier = 0.3; // 速度

                //Set timeline to simulation bounds
                $SCViewer.timeline.zoomTo(start, stop);

                let that = this
                //Generate a random circular pattern with varying heights.
                function computeCirclularFlight() {
                    var property = new Cesium.SampledPositionProperty();
                    for (let i = 0; i < pathArray.length; i++) {
                        let time = Cesium.JulianDate.addSeconds(start, i, new Cesium.JulianDate());
                        let position = Cesium.Cartesian3.fromDegrees(pathArray[i][0], pathArray[i][1], (pathArray[i][2] + offsetHeight));
                        property.addSample(time, position);

                        //Also create a point for each sample we generate.
                        $SCViewer.entities.add({
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

                let position = computeCirclularFlight();

                //Actually create the entity
                let entity = $SCViewer.entities.add({
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
                $SCViewer.trackedEntity = entity;
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
                if ( $SCViewer.trackedEntity) {
                    let scratch = new Cesium.Matrix4();
                    this.getModelMatrix( $SCViewer.trackedEntity, $SCViewer.clock.currentTime, scratch);
                    // var transformX =  this.transformX; //距离运动点的距离（后方）
                    // var transformZ =  this.transformZ; //距离运动点的高度（上方）
                    // $SCViewer.scene.camera.lookAtTransform(scratch, new Cesium.HeadingPitchRange(heading, pitch, 0));

                    $SCViewer.scene.camera.lookAtTransform(scratch, new Cesium.Cartesian3(-this.transformX, this.transformY, this.transformZ));
                }
            },
            // 跟踪视角
            setViewHeaderPitchRange () {
                $SCViewer.scene.preRender.addEventListener(this.preRenderListener);
            },
            onLeftClickHandler (movement) {
                const pickedFeature = $SCViewer.scene.pick(movement.position);
                if (Cesium.defined(pickedFeature)){
                    if(pickedFeature['id']){
                        console.log(111)
                    }else{
                        const featureName = pickedFeature.getProperty('name');
                        // 开关灯
                        if(featureName === 'BOX_1132') {
                            $SCViewer.shadows = this.isLightToolBar
                            this.isLightToolBar = !this.isLightToolBar
                            this.roomRoofTileset.show = true
                        }
                        // if(featureName === 'BOX_06' || featureName === 'BOX_09'){
                            // }
                        // // 隐藏办公室房顶

                        //办公室门牌图标
                        if (featureName === 'room01001') {
                            $SCViewer.camera.flyTo({
                                destination : Cesium.Cartesian3.fromDegrees(116.39077653705478, 39.9069318063358, 2.8356041586149856),
                                orientation : {
                                    heading: 5.554545066419967,
                                    pitch: -0.1063135374778228,
                                    roll: 6.280972561099766
                                }
                            });
                            this.isOfficeTrack = true
                        }

                        //摄像头
                        if (featureName === 'Camera01') {
                            this.showPopupInfo(movement.position, 3)
                        }

                        console.log(featureName)
                    // this.showPopupInfo(movement.position, 3)
                    // 屏幕坐标
                    console.log(movement.position)
                    // 笛卡尔坐标
                    var sss = $SCViewer.scene.pickPosition(movement.position); //单击位置
                    //将笛卡尔坐标转化为经纬度坐标
                    var car = Cesium.Cartographic.fromCartesian(sss);
                    var lon = Cesium.Math.toDegrees(car.longitude);
                    var lat = Cesium.Math.toDegrees(car.latitude);
                    var height = car.height;
                    console.log(lon)
                    console.log(lat)
                    console.log(height)
                    }
                }

            },
            // 漫游
            trackClick () {
                this.roomRoofTileset.show = true
                if (this.isOfficeTrack) {
                    this.transformY = 1.2
                    this.trackView(this.officePosition,2)
                }else{
                    this.transformY = 0
                    this.trackView(this.passagePosition, 2)
                }
            },
            lightClick () {
                this.isLightToolBar = !this.isLightToolBar
            },
            zoomInClick () {
                // 获取当前镜头位置的笛卡尔坐标
                let cameraPos = $SCViewer.camera.position;
                // 获取当前坐标系标准
                let ellipsoid = $SCViewer.scene.globe.ellipsoid;

                // 根据坐标系标准，将笛卡尔坐标转换为地理坐标
                let cartographic = ellipsoid.cartesianToCartographic(cameraPos);
                // 获取镜头的高度
                let height = cartographic.height;
                // 根据上面当前镜头的位置，获取该中心位置的经纬度坐标
                let centerLon = parseFloat(Cesium.Math.toDegrees(cartographic.longitude).toFixed(8));
                let centerLat = parseFloat(Cesium.Math.toDegrees(cartographic.latitude).toFixed(8));
                // 镜头拉近
                $SCViewer.camera.zoomIn(height / 3);
            },
            zoomOutClick () {
                // 获取当前镜头位置的笛卡尔坐标
                let cameraPos = $SCViewer.camera.position;

                // 获取当前坐标系标准
                let ellipsoid = $SCViewer.scene.globe.ellipsoid;

                // 根据坐标系标准，将笛卡尔坐标转换为地理坐标
                let cartographic = ellipsoid.cartesianToCartographic(cameraPos);
                // 获取镜头的高度
                let height = cartographic.height;
                // 根据上面当前镜头的位置，获取该中心位置的经纬度坐标
                let centerLon = parseFloat(Cesium.Math.toDegrees(cartographic.longitude).toFixed(8));
                let centerLat = parseFloat(Cesium.Math.toDegrees(cartographic.latitude).toFixed(8));
                // 镜头远离
                $SCViewer.camera.zoomOut(height * 1.2);
            },
            homeClick () {
                //走廊
                $SCViewer.camera.flyTo({
                    destination : Cesium.Cartesian3.fromDegrees(116.39066976333797, 39.906900369515114, 3.20287758492561),
                    orientation : {
                        heading: 1.3070285140484206,
                        pitch: -0.1858857191370613,
                        roll: 0.0032456993147480517
                    }
                });
                // 关闭办公室漫游状态
                this.isOfficeTrack = false
                // 关闭漫游
                $SCViewer.trackedEntity = undefined
                // 隐藏房顶
                this.roomRoofTileset.show = false
                // $SCViewer.zoomTo(this.modelTileset, new Cesium.HeadingPitchRange(0.0, -0.3, this.modelTileset.boundingSphere.radius * 2.0));
            },
            // 摄像头点击
            handleVideoClick (item) {
                // 关闭全部
                this.hideAllInfo()
                // this.getLightData(item)
                $SCViewer.camera.flyTo({
                    destination : Cesium.Cartesian3.fromDegrees(item.cameraPosition.lng, item.cameraPosition.lat, item.cameraPosition.height),
                    orientation : item.cameraPosition.orientation,
                    complete:  (e)=> {
                        this.showPopupInfo(item.windowPosition, 3)
                    }
                });
                // $SCViewer.camera.lookAt(Cesium.Cartesian3.fromDegrees(114.31536013848576, 35.721569872273115, 23.411405947790854), new Cesium.HeadingPitchRange(5.77401419329987, -0.7135381797481735, 40));
                console.log(item)

            },
            /**
             * 显示起泡弹出框 屏幕坐标 和 显示的弹出框类型 1 灯光 2 传感器设备 3 视频 4 车辆电子栏
             */
            showPopupInfo (position, type) {
                // 关闭全部
                this.hideAllInfo()

                let popupWind = document.getElementById('popup-wind-info')
                popupWind.style.display = 'block' // 必须写不然 offsetWidth offsetHeight 为0 videoContainer
                // 显示弹出框
                this.isPopupFlag = true
                let _this = this
                switch (type){
                    case 1: _this.isLightFlag = true; break;
                    case 2: _this.isDeviceFlag = true; break;
                    case 3: _this.isVideoFlag = true; document.getElementById('videoContainer').style.display = 'block';break;
                    case 4: _this.isCarFlag = true; break;
                }
                let leftPosition = position.x -  popupWind.offsetWidth/2
                let topPosition = position.y - popupWind.offsetHeight - 2

                popupWind.style.left = leftPosition + 'px'
                popupWind.style.top = topPosition + 'px'
                this.firstPopupWidowPosition = position
                this._cartesian = $SCViewer.scene.pickPosition(position)
            },
            hideAllInfo () {
                this.isPopupFlag = false
                this.isLightFlag = false
                this.isVideoFlag = false
            },
            showRoof () {
                this.roomRoofTileset.show = !this.roomRoofTileset.show
            },
            // 滑动灯光
            onChange (value) {
                this.brightness.uniforms.brightness = (value/100)
            },
            // debugger info
            getdata () {
                console.log('...........heading pitch roll.......')
                console.log($SCViewer.camera.heading)
                console.log($SCViewer.camera.pitch)
                console.log($SCViewer.camera.roll)
                console.log($SCViewer.camera.position)
                var sss = $SCViewer.camera.position
                var car = Cesium.Cartographic.fromCartesian(sss);
                var lon = Cesium.Math.toDegrees(car.longitude);
                var lat = Cesium.Math.toDegrees(car.latitude);
                console.log('...........lng lat height.......')
                console.log(lon)
                console.log(lat)
                console.log(car.height)

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
        display: flex;
        justify-content: space-between;
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

        .nav-vertical{
            width: 1px ;
            height: 100%;
            background: rgba(74,255,255,1);
        }
    }

    .tool-label-room::after,
    .tool-label-room::before{
        content: '';
        display: block;
    }

    /*左侧面板*/
    .left-container{
        position: absolute;
        top: 221px;
        left: 30px;
        z-index: 999;
        width:250px;
        height:144px;
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
        border-radius:unset;
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
    #subcesiumContainer{
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