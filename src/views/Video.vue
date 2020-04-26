<template>
    <div>
        <video ref="video" muted id="test_video"  controls autoplay >
            <!--<source :src="url">-->
        </video>
    </div>
</template>

<script>
    export default {
        name: "Video",
        data () {
            return{
                playerVideo:''
            }
        },
        props:['flag', 'url'],
        watch:{
            flag (n) {
                if(n){
                    this.player()
                } else{
                    if(this.playerVideo){
                        this.playerVideo.destroy()
                        this.playerVideo = null
                        this.$refs.video.src = ''
                    }
                }
            }
        },
        mounted() {
            // this.player()
            console.log('mounted')
        },
        methods: {
            player() {
                if (window.Streamedian) {
                    let errHandler = function (err) {
                        console.log(err)
                        // alert(err.message);
                    };

                    let infHandler = function (inf) {
                        // let sourcesNode = document.getElementById("sourcesNode");
                        let clients = inf.clients;
                        // sourcesNode.innerHTML = "";

                        for (let client in clients) {
                            clients[client].forEach((sources) => {
                                // let nodeButton = document.createElement("button");
                                // nodeButton.setAttribute('data', sources.url + ' ' + client);
                                // nodeButton.appendChild(document.createTextNode(sources.description));
                                // nodeButton.onclick = (event) => {
                                //     setPlayerSource(event.target.getAttribute('data'));
                                // };
                                // sourcesNode.appendChild(nodeButton);
                            });
                        }

                    };
                    console.log()
                    console.log(process.env.VUE_APP_WS)
                    var playerOptions = {
                        socket: process.env.VUE_APP_WS, redirectNativeMediaErrors: true,
                        bufferDuration: 30,
                        errorHandler: errHandler,
                        infoHandler: infHandler
                    };
                    this.$refs.video.src = this.url
                    this.playerVideo = Streamedian.player('test_video', playerOptions);
                    console.log(this.playerVideo)
                    console.log(111)
                }
            }
        }
    }
</script>

<style scoped>
    #test_video{
        width: 520px;
        /*height: 274px;*/
    }
</style>