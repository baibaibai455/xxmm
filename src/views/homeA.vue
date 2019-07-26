<template>
    <el-container class="bg" ref="minHeight">

        <el-main>
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
                        class="list" v-for="(ii,index) in data" :key="index">
                    <div :class="ii.is? 'succeed-text':''"
                         :title="'点击下载'+ii.trackInfo.title" class="text"
                         @click="downloadFun(index,'singleDown')">
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
                    text: '加载音频列表'

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


                    audio.is = true;

                    this.$notify({
                        title: '成功',
                        message: audio.trackInfo.title,
                        type: 'success'
                    });

                    if (this.index >= 16 && !type) {
                        this.downloadFun(this.index);
                    }

                };
                x.send();

                if (this.index < 16 && !type) {
                    this.downloadFun(this.index);
                }

            },
            initList() {
                this.$axios('https://m.ximalaya.com/m-revision/common/album/queryAlbumTrackRecordsByPage', {
                    albumId: this.audioId,
                    pageSize: 10,
                    page: this.page
                }).then((res) => {

                    let data = res.data.data.trackDetailInfos;
                    if (data.length != 0) {
                        for (let i = 0; i < data.length; i++) {

                            data[i].is = false;
                            this.data.push(data[i]);

                        }

                        this.page++;


                        this.initList();
                        window.scroll(0, document.querySelector('body').offsetHeight + 1000);


                    } else {
                        this.loading.close();
                        this.disDwon = false;
                        window.scroll(0, 0);

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
        color: #333333;
        font-size: 14px;
        margin-top: 16px;

        .text {
            cursor: pointer;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            transition: all 0.3s;

            &:hover {
                transition: all 0.3s;
                color: #a6c0fe;
            }

            span {
                width: 28px;
                display: inline-block;
            }
        }

        .succeed-text {
            color: #6ac98e !important;
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
