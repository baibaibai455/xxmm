<template>
    <div>
        <div class="bg" ref="minHeight">


            <input type="text" v-model="audioId" placeholder="输入ID">

            <button @click="downFun">开始</button>
            <div class="list-box">
                <div v-for="ii in data" v-show=" !(idarr.join('-').indexOf(ii.id)>0)"
                     @click="dd(ii.trackInfo.playPath,ii.trackInfo.title,ii.id)">
                    <div :style="{
                fontSize:'15px',
                            color:idarr.join('-').indexOf(ii.trackInfo.title)>0?'#7eb05b':'#000'
                            }">{{ii.trackInfo.title}}
                    </div>

                    <!--            <audio :src="ii.trackInfo.playPath" controls></audio>-->

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
                this.init();
            },
            dd(i) {

                let ii = this.data[i];

                console.log(ii);
                this.index++;


                var x = new XMLHttpRequest();
                x.open('GET', ii.trackInfo.playPath, true);
                x.responseType = 'blob';
                x.onload = (e) => {

                    console.log(e);


                    var filevalue = e.target.responseURL;
                    filevalue = filevalue.substring(filevalue.lastIndexOf('.'));


                    console.log(filevalue);

                    // download(x.response, ii.trackInfo.title + filevalue, e.currentTarget.response.type);
                    console.log(ii.trackInfo.title);


                    this.idarr.push(ii.trackInfo.title);


                    if (this.index >= 10) {
                        this.dd(this.index);

                    }

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

                        data[i].is = true;
                        this.data.push(data[i]);


                    }


                    if (data.length != 0) {
                        this.page++;
                        this.init();

                    } else {
                        this.dd(this.index);
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

    .list-box {
        display: flex;
        flex-flow: row wrap;
        align-items: center;

        > div {
            width: 33%;

            margin-bottom: 20px;
        }
    }

</style>
