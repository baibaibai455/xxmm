<template>
    <el-container class="bg" ref="minHeight">

        <el-main >
            <vue-particles color="#dedede"></vue-particles>

            <el-row :gutter="10">
                <el-col :span="12" :xs="8">

                    <el-input :disabled="disDwon&&disList" placeholder="输入ID" v-model="audioId"></el-input>

                </el-col>
                <el-col :span="12" :xs="16">

                    <el-button :disabled="disList" @click="listFun" plain type="primary">展示列表</el-button>
                    <el-button :disabled="disDwon" @click="downFun" plain type="success">
                        开始下载
                    </el-button>


                </el-col>
            </el-row>

            <el-row :gutter="10" v-if="data.length>0">
                <el-divider content-position="left">音频列表</el-divider>

                <el-col :lg="8" :md="12" :sm="24" :xl="8" :xs="24"
                        @click="downloadFun(index,'singleDown')" class="list" v-for="(ii,index) in data" :key="index">
                    <div :style="{ color:ii.is ?'#7eb05b':'#000'}" :title="'点击下载'+ii.trackInfo.title" class="text">
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
                loading: '',
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

        },
        methods: {
            downFun() {
                this.downloadFun(this.index);
                this.disDwon = true;
            },
            listFun() {


                this.loading = this.$loading({
                    lock: true,
                    text: '加载音频列表',

                });


                this.disList = true;
                this.initList();


            },
            downloadFun(i, type) {

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
                        this.downloadFun(this.index);
                    }

                    audio.is = true;


                    this.$notify({
                        title: '成功',
                        message: audio.trackInfo.title,
                        type: 'success'
                    });

                };
                x.send();

                if (this.index < 10 && !type) {
                    this.downloadFun(this.index);
                }

            },
            initList() {
                this.$axios('https://m.ximalaya.com/m-revision/common/album/queryAlbumTrackRecordsByPage', {
                    albumId: this.audioId,
                    pageSize: 20,
                    page: this.page
                }).then((res) => {

                    let data = res.data.data.trackDetailInfos;

                    for (let i = 0; i < data.length; i++) {

                        data[i].is = false;
                        this.data.push(data[i]);

                    }

                    if (data.length != 0) {
                        this.page++;

                        setTimeout(() => {
                            this.initList();
                        }, 300);


                    } else {
                        this.loading.close();
                        this.disDwon = false;
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

        .text {
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

    /deep/ .particles-js-canvas-el {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

</style>
