<template>
    <div>
        <div class="bg" ref="minHeight">
            <div class="input-box">
                <input type="text" v-model="audioId" placeholder="输入ID">
                <button @click="listFun" :disabled="disList">展示列表</button>
                <button @click="downFun" :disabled="disDwon"> {{disDwon&&disList ?'下载中':'开始下载' }}</button>

            </div>

            <div class="list-box">
                <div v-for="(ii,index) in data"
                     @click="dd(ii.trackInfo.playPath,ii.trackInfo.title,ii.id)">
                    <div :style="{ color:ii.is ?'#7eb05b':'#000'}">
                        {{index+1}}-- {{ii.trackInfo.title}}
                    </div>

                    <audio :src="ii.trackInfo.playPath" controls></audio>

                </div>
            </div>
        </div>
    </div>
</template>

<script>


    export default {
        name: 'down-ximalaya',
        components: {},
        data() {


            return {
                disList: false,
                disDwon: true,
                data: [],
                page: 1,
                idarr: ['f'],
                index: 0,
                audioId: '8258341'
            };
        },
        computed: {},
        props: {},
        created() {

            // this.init();
        },
        methods: {
            downFun() {
                this.dd(this.index);
                this.disDwon = true;
            },
            listFun() {
                this.disList = true;
                this.disDwon = false;
                this.init();
            },
            dd(i) {

                let audio = this.data[i];


                this.index++;


                var x = new XMLHttpRequest();
                x.open('GET', audio.trackInfo.playPath, true);
                x.responseType = 'blob';
                x.onload = (e) => {


                    var filevalue = e.target.responseURL;
                    filevalue = filevalue.substring(filevalue.lastIndexOf('.'));


                    download(x.response, audio.trackInfo.title + filevalue, e.currentTarget.response.type);


                    if (this.index >= 10) {
                        this.dd(this.index);

                    }
                    audio.is = true;

                };
                x.send();

                if (this.index < 10) {
                    this.dd(this.index);
                }


            },
            init() {
                this.$axios('https://m.ximalaya.com/m-revision/common/album/queryAlbumTrackRecordsByPage', {
                    albumId: this.audioId,
                    pageSize: 20,
                    page: this.page
                }).then((res) => {

                    // console.log(res.data.data.trackDetailInfos);

                    let data = res.data.data.trackDetailInfos;

                    for (let i = 0; i < data.length; i++) {

                        data[i].is = false;
                        this.data.push(data[i]);


                    }


                    if (data.length != 0) {
                        this.page++;
                        this.init();

                    }


                }).catch((res) => {
                    console.log(res);
                });
            }
        },
        mounted() {


        },
        watch: {},
        destroyed() {
            //页面销毁时
        }

    };
</script>

<style lang="scss" scoped>

    .input-box {
        margin-bottom: 20px;

        input {
            width: 300px;
            height: 40px;
            font-size: 18px;
        }

        button {
            height: 40px;
            width: 100px;
            font-size: 20px;
        }
    }

    .list-box {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        font-size: 14px;

        > div {
            width: 33%;
            margin-bottom: 10px;
        }
    }

</style>
