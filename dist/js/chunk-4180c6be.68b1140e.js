(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-4180c6be"],{"49ac":function(t,n,e){"use strict";var i=e("568a2");e.n(i).a},"568a2":function(t,n,e){},"80bb":function(t,n,e){"use strict";e.r(n);var i={name:"down-ximalaya",components:{},data:function(){return{loading:"",disList:!1,disDwon:!0,data:[],page:1,idarr:["f"],audioId:"8258341",constIndex:10,index:0,continueIndex:0}},computed:{},props:{},created:function(){this.continueIndex=this.constIndex},methods:{downFun:function(){this.downloadFun(this.index),this.disDwon=!0},listFun:function(){this.loading=this.$loading({lock:!0,text:"加载音频列表"}),this.disList=!0,this.initList()},downloadFun:function(t,n){var e=this,i=this.data[t];this.index++;var s=new XMLHttpRequest;s.open("GET",i.trackInfo.playPath,!0),s.responseType="blob",s.onload=function(t){var n=t.target.responseURL;n=n.substring(n.lastIndexOf(".")),download(s.response,i.trackInfo.title+n,t.currentTarget.response.type),i.is=!0,e.$notify({title:"成功",message:i.trackInfo.title,type:"success"}),e.downloadFun(e.continueIndex),e.continueIndex++},s.send(),this.index<this.constIndex&&!n&&this.downloadFun(this.index)},initList:function(){var t=this;this.$axios("https://m.ximalaya.com/m-revision/common/album/queryAlbumTrackRecordsByPage",{albumId:this.audioId,pageSize:10,page:this.page}).then(function(n){var e=n.data.data.trackDetailInfos;if(0!=e.length){for(var i=0;i<e.length;i++)e[i].is=!1,t.data.push(e[i]);t.page++,t.initList(),window.scroll(0,document.querySelector("body").offsetHeight+1e3)}else t.loading.close(),t.disDwon=!1,window.scroll(0,0)}).catch(function(t){})}},mounted:function(){var t=document.documentElement.clientHeight;this.$refs.minHeight.style.minHeight=t+"px"},watch:{},destroyed:function(){}},s=(e("49ac"),e("6691")),a=Object(s.a)(i,function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{ref:"minHeight",staticClass:"bg"},[e("el-container",[e("el-main",[e("vue-particles",{attrs:{color:"#dedede"}}),e("el-row",{attrs:{gutter:10}},[e("el-col",{attrs:{span:12,xs:8}},[e("el-input",{attrs:{disabled:t.disDwon&&t.disList,placeholder:"输入ID"},model:{value:t.audioId,callback:function(n){t.audioId=n},expression:"audioId"}})],1),e("el-col",{attrs:{span:12,xs:16}},[e("el-button",{attrs:{disabled:t.disList,plain:"",type:"primary"},on:{click:t.listFun}},[t._v("展示列表")]),e("el-button",{attrs:{disabled:t.disDwon,plain:"",type:"success"},on:{click:t.downFun}},[t._v("\n                        开始下载\n                    ")])],1)],1),t.data.length>0?e("el-row",{attrs:{gutter:10}},[e("el-divider",{attrs:{"content-position":"left"}},[t._v("音频列表")]),t._l(t.data,function(n,i){return e("el-col",{key:i,staticClass:"list",attrs:{lg:8,md:12,sm:24,xl:8,xs:24}},[e("div",{staticClass:"text",class:n.is?"succeed-text":"",attrs:{title:"点击下载"+n.trackInfo.title},on:{click:function(n){return t.downloadFun(i,"singleDown")}}},[e("span",[t._v(" "+t._s(i+1)+"-")]),t._v(" "+t._s(n.trackInfo.title)+"\n                    ")])])})],2):t._e()],1)],1)],1)},[],!1,null,"4f49b20e",null);n.default=a.exports}}]);