(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[6],{Nlzp:function(e,a,t){"use strict";t("miYZ");var n=t("tsqr"),r=t("vDqi"),l=t.n(r);function c(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET";return new Promise((r,c)=>{var u;u="GET"===t?l.a.get(e,{params:a}):l.a.post(e,a),u.then(e=>{r(e.data),console.log("\u8bf7\u6c42\u6210\u529f",e)}).catch(e=>{n["a"].error("\u8bf7\u6c42\u63a5\u53e3\u51fa\u9519\u4e86: "+e.message)})})}t.d(a,"i",function(){return s}),t.d(a,"f",function(){return m}),t.d(a,"a",function(){return o}),t.d(a,"m",function(){return i}),t.d(a,"e",function(){return d}),t.d(a,"j",function(){return p}),t.d(a,"o",function(){return g}),t.d(a,"l",function(){return f}),t.d(a,"g",function(){return E}),t.d(a,"b",function(){return y}),t.d(a,"k",function(){return N}),t.d(a,"d",function(){return S}),t.d(a,"n",function(){return T}),t.d(a,"p",function(){return O}),t.d(a,"h",function(){return h}),t.d(a,"c",function(){return v});var u="",s=(e,a)=>c(u+"/login",{username:e,password:a},"POST"),m=e=>c(u+"/manage/category/list",{parentId:e}),o=(e,a)=>c(u+"/manage/category/add",{categoryName:e,parentId:a},"POST"),i=e=>{var a=e.categoryId,t=e.categoryName;return c(u+"/manage/category/update",{categoryId:a,categoryName:t},"POST")},d=e=>c(u+"/manage/category/info",{categoryId:e}),p=(e,a)=>c(u+"/manage/product/list",{pageNum:e,pageSize:a}),g=(e,a)=>c(u+"/manage/product/updateStatus",{productId:e,status:a},"POST"),f=e=>{var a=e.pageNum,t=e.pageSize,n=e.searchName,r=e.searchType;return c(u+"/manage/product/search",{pageNum:a,pageSize:t,[r]:n})},E=e=>c(u+"/manage/img/delete",{name:e},"POST"),y=e=>c(u+"/manage/product/"+(e._id?"update":"add"),e,"POST"),N=()=>c(u+"/manage/role/list"),S=e=>c(u+"/manage/role/add",{roleName:e},"POST"),T=e=>c(u+"/manage/role/update",e,"POST"),O=()=>c(u+"/manage/user/list"),h=e=>c(u+"/manage/user/delete",{userId:e},"POST"),v=e=>c(u+"/manage/user/"+(e._id?"update":"add"),e,"POST")},eTn5:function(e,a,t){"use strict";t.r(a);var n=t("q1tI"),r=t.n(n),l=(t("IzEo"),t("bx4M")),c=t("d6i3"),u=t.n(c),s=t("1l/V"),m=t.n(s),o=(t("Pwec"),t("CtXQ")),i=t("qIgq"),d=t.n(i),p=(t("Mwp2"),t("VXEj")),g=t("55Ip"),f=t("ftYT"),E=t.n(f),y=t("bKel"),N=t.n(y),S=t("Nlzp"),T=p["a"].Item,O=e=>{console.log(e);var a=e.location.state.product,t=a.name,c=a.desc,s=a.price,i=a.detail,f=a.imgs,y=a.pCategoryId,N=a.categoryId,O="http://localhost:5000/manage/img/",h=Object(n["useState"])(),v=d()(h,2),I=v[0],w=v[1],P=Object(n["useState"])(),b=d()(P,2),_=b[0],j=b[1],k=r.a.createElement("span",null,r.a.createElement(g["Link"],{to:"/commodity/manage"},r.a.createElement(o["a"],{type:"arrow-left"})),r.a.createElement("span",null," \u5546\u54c1\u8be6\u60c5")),x=function(){var e=m()(u.a.mark(function e(){var a,t;return u.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(0!==y){e.next=7;break}return e.next=3,Object(S["e"])(N);case 3:a=e.sent,w(a.data.name),e.next=12;break;case 7:return e.next=9,Promise.all([Object(S["e"])(y),Object(S["e"])(N)]);case 9:t=e.sent,w(t[0].data.name),j(t[1].data.name);case 12:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();return Object(n["useEffect"])(()=>{x()},[]),r.a.createElement(l["a"],{title:k,className:E.a.detail},r.a.createElement(p["a"],null,r.a.createElement(T,null,r.a.createElement("span",{className:E.a.title},"\u5546\u54c1\u540d\u79f0:"),r.a.createElement("span",null,t)),r.a.createElement(T,null,r.a.createElement("span",{className:E.a.title},"\u5546\u54c1\u63cf\u8ff0:"),r.a.createElement("span",null,c)),r.a.createElement(T,null,r.a.createElement("span",{className:E.a.title},"\u5546\u54c1\u4ef7\u683c:"),r.a.createElement("span",null,s,"\u5143")),r.a.createElement(T,null,r.a.createElement("span",{className:E.a.title},"\u6240\u5c5e\u5206\u7c7b:"),r.a.createElement("span",null,I,"  ",_?"---\x3e"+_:"")),r.a.createElement(T,null,r.a.createElement("span",{className:E.a.title},"\u5546\u54c1\u56fe\u7247:"),f.map(e=>r.a.createElement("img",{src:O+e,alt:e,key:e}))),r.a.createElement(T,null,r.a.createElement("span",{className:E.a.title},"\u5546\u54c1\u8be6\u60c5:"),r.a.createElement("span",{className:E.a.editor,dangerouslySetInnerHTML:{__html:i}}))))},h=N()(O);a["default"]=(()=>{return r.a.createElement("div",null,r.a.createElement(h,null))})},ftYT:function(e,a,t){e.exports={detail:"detail___3cHUg",editor:"editor___1E4RP",title:"title___2FsEa"}}}]);