(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-a0362a96"],{"09fc":function(t,n,i){},"3b69":function(t,n,i){"use strict";var a=i("09fc");i.n(a).a},"80bb":function(t,n,i){"use strict";i.r(n);var a={name:"down-ximalaya",components:{},data:function(){return{data:[],page:1,idarr:["f"],index:0,audioId:""}},computed:{},props:{},created:function(){},methods:{downFun:function(){this.init()},dd:function(t){var n=this;this.index++;var i=this.data[t];this.idarr.push(i.trackInfo.title);var a=new XMLHttpRequest;a.open("GET",i.trackInfo.playPath,!0),a.responseType="blob",a.onload=function(t){download(a.response,i.trackInfo.title+".mp3","audio/mp3")},a.send(),setTimeout(function(){n.dd(n.index)},200)},init:function(){var t=this;this.$axios("https://m.ximalaya.com/m-revision/common/album/queryAlbumTrackRecordsByPage",{albumId:this.audioId,pageSize:20,page:this.page}).then(function(n){for(var i=n.data.data.trackDetailInfos,a=0;a<i.length;a++)i[a].is=!0,t.data.push(i[a]);0!=i.length?(t.page++,t.init()):t.dd(t.index)}).catch(function(t){})}},mounted:function(){},watch:{},destroyed:function(){}},e=(i("3b69"),i("17cc")),o=Object(e.a)(a,function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",[i("div",{ref:"minHeight",staticClass:"bg"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.audioId,expression:"audioId"}],attrs:{type:"text",placeholder:"输入ID"},domProps:{value:t.audioId},on:{input:function(n){n.target.composing||(t.audioId=n.target.value)}}}),i("button",{on:{click:t.downFun}},[t._v("开始")]),t._l(t.data,function(n){return i("div",{directives:[{name:"show",rawName:"v-show",value:!(t.idarr.join("-").indexOf(n.id)>0),expression:" !(idarr.join('-').indexOf(ii.id)>0)"}],staticClass:"aa",on:{click:function(i){return t.dd(n.trackInfo.playPath,n.trackInfo.title,n.id)}}},[i("div",{style:{fontSize:"15px",color:t.idarr.join("-").indexOf(n.trackInfo.title)>0?"#7eb05b":"#000"}},[t._v(t._s(n.trackInfo.title)+"\n            ")])])})],2)])},[],!1,null,"29f4f1b6",null);n.default=o.exports}}]);