(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-c9e36de2"],{"0ab2":function(t,i,n){"use strict";var a=n("297c");n.n(a).a},"297c":function(t,i,n){},"80bb":function(t,i,n){"use strict";n.r(i);var a={name:"down-ximalaya",components:{},data:function(){return{disList:!1,disDwon:!0,data:[],page:1,idarr:["f"],index:0,audioId:"8258341"}},computed:{},props:{},created:function(){},methods:{downFun:function(){this.dd(this.index),this.disDwon=!0},listFun:function(){this.disList=!0,this.disDwon=!1,this.init()},dd:function(t){var i=this,n=this.data[t];this.index++;var a=new XMLHttpRequest;a.open("GET",n.trackInfo.playPath,!0),a.responseType="blob",a.onload=function(t){var s=t.target.responseURL;s=s.substring(s.lastIndexOf(".")),download(a.response,n.trackInfo.title+s,t.currentTarget.response.type),i.index>=10&&i.dd(i.index),n.is=!0},a.send(),this.index<10&&this.dd(this.index)},init:function(){var t=this;this.$axios("https://m.ximalaya.com/m-revision/common/album/queryAlbumTrackRecordsByPage",{albumId:this.audioId,pageSize:20,page:this.page}).then(function(i){for(var n=i.data.data.trackDetailInfos,a=0;a<n.length;a++)n[a].is=!1,t.data.push(n[a]);0!=n.length&&(t.page++,t.init())}).catch(function(t){})}},mounted:function(){},watch:{},destroyed:function(){}},s=(n("0ab2"),n("17cc")),e=Object(s.a)(a,function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",[n("div",{ref:"minHeight",staticClass:"bg"},[n("div",{staticClass:"input-box"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.audioId,expression:"audioId"}],attrs:{disabled:t.disDwon&&t.disList,placeholder:"输入ID",type:"text"},domProps:{value:t.audioId},on:{input:function(i){i.target.composing||(t.audioId=i.target.value)}}}),n("button",{attrs:{disabled:t.disList},on:{click:t.listFun}},[t._v("展示列表")]),n("button",{attrs:{disabled:t.disDwon},on:{click:t.downFun}},[t._v(" "+t._s(t.disDwon&&t.disList?"下载中":"开始下载"))])]),n("div",{staticClass:"list-box"},t._l(t.data,function(i,a){return n("div",{on:{click:function(n){return t.dd(i.trackInfo.playPath,i.trackInfo.title,i.id)}}},[n("div",{style:{color:i.is?"#7eb05b":"#000"}},[t._v("\n                    "+t._s(a+1)+"-- "+t._s(i.trackInfo.title)+"\n                ")]),n("audio",{attrs:{src:i.trackInfo.playPath,controls:""}})])}),0)])])},[],!1,null,"6f6553e4",null);i.default=e.exports}}]);