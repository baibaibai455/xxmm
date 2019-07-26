<template>


    <el-container class="bg" ref="minHeight">

        <el-main>
            <el-row :gutter="10">
                <el-col :span="12" :xs="8">


                    <el-input :disabled="disDwon&&disList" placeholder="输入ID" v-model="audioId"></el-input>


                </el-col>
                <el-col :span="12" :xs="16">

                    <el-button type="primary" plain :disabled="disList" @click="listFun">展示列表</el-button>
                    <el-button type="success" plain :disabled="disDwon" @click="downFun">{{disDwon&&disList
                        ?'下载中':'开始下载' }}
                    </el-button>


                </el-col>
            </el-row>


            <el-row :gutter="10">
                <el-col class="list" @click="dd(index,'singleDown')" v-for="(ii,index) in data" :xs="24" :sm="24"
                        :md="12" :lg="8" :xl="8">
                    <div :style="{ color:ii.is ?'#7eb05b':'#000'}"  class="text"  :title="'点击下载'+ii.trackInfo.title">
                        <span> {{index+1}}-</span> {{ii.trackInfo.title}}
                    </div>
                </el-col>

            </el-row>


        </el-main>

    </el-container>


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
            dd(i, type) {

                console.log('下载第- ' + i + ' -个');

                let audio = this.data[i];

                this.index++;


                var x = new XMLHttpRequest();
                x.open('GET', audio.trackInfo.playPath, true);
                x.responseType = 'blob';
                x.onload = (e) => {


                    var filevalue = e.target.responseURL;
                    filevalue = filevalue.substring(filevalue.lastIndexOf('.'));


                    download(x.response, audio.trackInfo.title + filevalue, e.currentTarget.response.type);


                    if (this.index >= 10 && !type) {
                        this.dd(this.index);
                    }
                    audio.is = true;

                };
                x.send();

                if (this.index < 10 && !type) {
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

    .list {
        cursor: pointer;
        font-size: 14px;
        margin-top: 16px;


        .text{
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            span {
                width: 28px;
                display: inline-block;
            }
        }
    }

</style>
