(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[5],{CFFc:function(e,a,t){"use strict";t.r(a);var r=t("q1tI"),n=t.n(r),c=(t("IzEo"),t("bx4M")),s=(t("+L6B"),t("2/Rp")),l=(t("6UJt"),t("DFOY")),i=t("d6i3"),o=t.n(i),u=(t("miYZ"),t("tsqr")),d=t("1l/V"),m=t.n(d),p=(t("Pwec"),t("CtXQ")),g=t("qIgq"),f=t.n(g),v=(t("5NDa"),t("5rEg")),b=(t("y8nQ"),t("Vl3Y")),h=t("bes/"),E=t.n(h),y=t("bKel"),w=t.n(y),S=(t("2qtc"),t("kLXV")),O=(t("DZo9"),t("8z0m")),x=t("Nlzp"),k=e=>{var a=Object(r["useState"])([]),t=f()(a,2),c=t[0],s=t[1],l="http://localhost:5000/upload/",i=Object(r["useState"])(!1),d=f()(i,2),g=d[0],v=d[1],b=Object(r["useState"])(""),h=f()(b,2),E=h[0],y=h[1],w=e=>{y(e.url||e.thumbUrl),v(!0)},k=function(){var e=m()(o.a.mark(function e(a){var t,r,n,c,l,i,d;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(t=a.file,r=a.fileList,"done"!==t.status){e.next=6;break}n=t.response,0===n.status?(u["a"].success("\u4e0a\u4f20\u56fe\u7247\u6210\u529f"),c=n.data,l=c.name,i=c.url,t=r[r.length-1],t.name=l,t.url=i,y(t.url)):u["a"].error("\u4e0a\u4f20\u56fe\u7247\u5931\u8d25"),e.next=12;break;case 6:if("removed"!==t.status){e.next=12;break}return console.log(t.name),e.next=10,Object(x["g"])(t.name);case 10:d=e.sent,0===d.status?u["a"].success("\u5220\u9664\u56fe\u7247\u6210\u529f"):u["a"].error("\u5220\u9664\u56fe\u7247\u5931\u8d25");case 12:s([...r]),console.log(r);case 14:case"end":return e.stop()}},e)}));return function(a){return e.apply(this,arguments)}}(),I=()=>{v(!1)},N=n.a.createElement("div",null,n.a.createElement(p["a"],{type:"plus"}),n.a.createElement("div",null,"Upload"));return Object(r["useEffect"])(()=>{e.getImages(c)},[c]),Object(r["useEffect"])(()=>{if(e.imgs)if(Array.isArray(e.imgs)){var a=e.imgs.map((e,a)=>({uid:-a,name:e,status:"done",url:l+e}));s(a)}else s([])},[]),n.a.createElement(n.a.Fragment,null,n.a.createElement(O["a"],{action:"http://localhost:5000/manage/img/upload",listType:"picture-card",accept:"image/*",name:"image",fileList:c,onPreview:w,onChange:k},c.length>=3?null:N),n.a.createElement(S["a"],{visible:g,footer:null,onCancel:I},n.a.createElement("img",{alt:"example",style:{width:"100%"},src:E})))},I=t("v83y"),N=t("owPO"),T=t("bQ8i"),C=t.n(T),j=t("dt66"),P=t.n(j),L=(t("19BS"),e=>{var a=Object(r["useState"])(),t=f()(a,2),c=t[0],s=t[1],l=e=>{return new Promise((a,t)=>{var r=new XMLHttpRequest;r.open("POST","http://localhost:5000/manage/img/upload");var n=new FormData;n.append("image",e),r.send(n),r.addEventListener("load",()=>{var e=JSON.parse(r.responseText),t=e.data.url;a({data:{link:t}})}),r.addEventListener("error",()=>{var e=JSON.parse(r.responseText);t(e)})})};Object(r["useEffect"])(()=>{if("string"==typeof e.detail){var a=P()(e.detail);if(a){var t=I["ContentState"].createFromBlockArray(a.contentBlocks),r=I["EditorState"].createWithContent(t);s(r)}else s(I["EditorState"].createEmpty())}},[]);var i=e=>{s(e)},o=()=>{s(c),e.geteditor(C()(Object(I["convertToRaw"])(c.getCurrentContent())))};return n.a.createElement(N["Editor"],{editorState:c,onBlur:o,editorStyle:{border:"1px solid black",height:200,marginTop:20,paddingLeft:10},onEditorStateChange:i,toolbar:{image:{uploadCallback:l,alt:{present:!0,mandatory:!0}}}})}),q=t("55Ip"),z=b["a"].Item,_=v["a"].TextArea,F=e=>{var a=e.form,t=a.getFieldDecorator,i=a.validateFields,d=Object(r["useState"])([]),g=f()(d,2),h=g[0],y=g[1],w=Object(r["useState"])([]),S=f()(w,2),O=S[0],I=S[1],N=e.location.state.isUpdate,T=e.location.state.product||{},C=T.pCategoryId,j=T.categoryId,P=T.imgs,F=T.detail,D=Object(r["useState"])(""),V=f()(D,2),B=V[0],A=V[1],J=[];"update"===N&&("0"===C?J.push(j):(J.push(C),J.push(j)));var R={labelCol:{span:2},wrapperCol:{span:8}},U=n.a.createElement(n.a.Fragment,null,n.a.createElement("span",null,n.a.createElement(q["Link"],{to:"/commodity/manage"},n.a.createElement(p["a"],{style:{fontSize:20},type:"arrow-left"}))),n.a.createElement("span",{style:{fontSize:20}},"update"===N?" \u4fee\u6539\u5546\u54c1":" \u6dfb\u52a0\u5546\u54c1")),Y=()=>{i(function(){var a=m()(o.a.mark(function a(t,r){var n,c,s,l,i,d,m,p;return o.a.wrap(function(a){while(1)switch(a.prev=a.next){case 0:if(t){a.next=9;break}return n=r.name,c=r.desc,s=r.price,l=r.categoryIds,1===l.length?(i="0",d=l[0]):(i=l[0],d=l[1]),m={pCategoryId:i,categoryId:d,name:n,desc:c,price:s,imgs:O,detail:B},"update"===N&&(m._id=e.location.state.product._id),a.next=7,Object(x["b"])(m);case 7:p=a.sent,0===p.status?(u["a"].success("\u5546\u54c1".concat("update"===N?"\u66f4\u65b0":"\u6dfb\u52a0","\u6210\u529f")),e.history.goBack()):u["a"].error("\u5546\u54c1".concat("update"===N?"\u66f4\u65b0":"\u6dfb\u52a0","\u5931\u8d25"));case 9:case"end":return a.stop()}},a)}));return function(e,t){return a.apply(this,arguments)}}())},Z=(e,a,t)=>{1*a>0?t():t("\u4ef7\u683c\u5fc5\u987b\u5927\u4e8e0")},Q=function(){var e=m()(o.a.mark(function e(a){var t,r;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(x["f"])(a);case 2:if(t=e.sent,r=t.data,0!==t.status){e.next=10;break}if("0"!==a){e.next=9;break}X(r),e.next=10;break;case 9:return e.abrupt("return",r);case 10:case"end":return e.stop()}},e)}));return function(a){return e.apply(this,arguments)}}(),X=function(){var e=m()(o.a.mark(function e(a){var t,r,n,c;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(t=a.map(e=>({value:e._id,label:e.name,isLeaf:!1})),"update"!==N||"0"===C){e.next=8;break}return e.next=4,Q(C);case 4:r=e.sent,n=r.map(e=>({value:e._id,label:e.name,isLeaf:!0})),c=t.find(e=>{return e.value===C}),c.children=n;case 8:y([...t]);case 9:case"end":return e.stop()}},e)}));return function(a){return e.apply(this,arguments)}}(),G=function(){var e=m()(o.a.mark(function e(a){var t,r,n;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=a[0],t.loading=!0,e.next=4,Q(t.value);case 4:if(r=e.sent,t.loading=!1,!r||0===r.length){e.next=13;break}return e.next=9,r.map(e=>({value:e._id,label:e.name,isLeaf:!0}));case 9:n=e.sent,t.children=n,e.next=14;break;case 13:t.isLeaf=!0;case 14:y([...h]);case 15:case"end":return e.stop()}},e)}));return function(a){return e.apply(this,arguments)}}();return Object(r["useEffect"])(()=>{Q("0")},[]),n.a.createElement(c["a"],{title:U},n.a.createElement(b["a"],R,n.a.createElement(z,{className:E.a.item,label:"\u5546\u54c1\u540d\u79f0"},t("name",{initialValue:T.name,rules:[{required:!0,message:"\u5fc5\u987b\u8f93\u5165\u5546\u54c1\u540d\u79f0"}]})(n.a.createElement(v["a"],{placeholder:"\u8bf7\u8f93\u5165\u5546\u54c1\u540d\u79f0"}))),n.a.createElement(z,{className:E.a.item,label:"\u5546\u54c1\u63cf\u8ff0"},t("desc",{initialValue:T.desc,rules:[{required:!0,message:"\u5fc5\u987b\u8f93\u5165\u5546\u54c1\u63cf\u8ff0"}]})(n.a.createElement(_,{placeholder:"\u8bf7\u8f93\u5165\u5546\u54c1\u540d\u79f0",autoSize:{minRows:1,maxRows:5}}))),n.a.createElement(z,{className:E.a.item,label:"\u5546\u54c1\u4ef7\u683c"},t("price",{initialValue:T.price,rules:[{required:!0,message:"\u5fc5\u987b\u8f93\u5165\u5546\u54c1\u4ef7\u683c"},{validator:Z}]})(n.a.createElement(v["a"],{type:"number",placeholder:"\u8bf7\u8f93\u5165\u5546\u54c1\u540d\u79f0",addonAfter:"\u5143"}))),n.a.createElement(z,{className:E.a.item,label:"\u5546\u54c1\u5206\u7c7b"},t("categoryIds",{initialValue:J,rules:[{required:!0,message:"\u5fc5\u987b\u6307\u5b9a\u5546\u54c1\u5206\u7c7b"}]})(n.a.createElement(l["a"],{loadData:G,options:h,changeOnSelect:!0}))),n.a.createElement(z,{className:E.a.item,label:"\u5546\u54c1\u56fe\u7247"},console.log(O),t("imgList",{})(n.a.createElement(k,{imgs:P,getImages:e=>{var a=e.map(e=>e.name);I(a)}}))),n.a.createElement(z,{className:E.a.item,labelCol:{span:2},wrapperCol:{span:10},label:"\u5546\u54c1\u8be6\u60c5"},n.a.createElement(L,{geteditor:e=>A(e),detail:F})),n.a.createElement(z,{className:E.a.item},n.a.createElement(s["a"],{type:"primary",onClick:()=>{Y()}},"\u63d0\u4ea4"))))},D=b["a"].create()(w()(F));a["default"]=(()=>{return n.a.createElement("div",null,n.a.createElement(D,null))})},Nlzp:function(e,a,t){"use strict";t("miYZ");var r=t("tsqr"),n=t("vDqi"),c=t.n(n);function s(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET";return new Promise((n,s)=>{var l;l="GET"===t?c.a.get(e,{params:a}):c.a.post(e,a),l.then(e=>{n(e.data),console.log("\u8bf7\u6c42\u6210\u529f",e)}).catch(e=>{r["a"].error("\u8bf7\u6c42\u63a5\u53e3\u51fa\u9519\u4e86: "+e.message)})})}t.d(a,"i",function(){return i}),t.d(a,"f",function(){return o}),t.d(a,"a",function(){return u}),t.d(a,"m",function(){return d}),t.d(a,"e",function(){return m}),t.d(a,"j",function(){return p}),t.d(a,"o",function(){return g}),t.d(a,"l",function(){return f}),t.d(a,"g",function(){return v}),t.d(a,"b",function(){return b}),t.d(a,"k",function(){return h}),t.d(a,"d",function(){return E}),t.d(a,"n",function(){return y}),t.d(a,"p",function(){return w}),t.d(a,"h",function(){return S}),t.d(a,"c",function(){return O});var l="",i=(e,a)=>s(l+"/login",{username:e,password:a},"POST"),o=e=>s(l+"/manage/category/list",{parentId:e}),u=(e,a)=>s(l+"/manage/category/add",{categoryName:e,parentId:a},"POST"),d=e=>{var a=e.categoryId,t=e.categoryName;return s(l+"/manage/category/update",{categoryId:a,categoryName:t},"POST")},m=e=>s(l+"/manage/category/info",{categoryId:e}),p=(e,a)=>s(l+"/manage/product/list",{pageNum:e,pageSize:a}),g=(e,a)=>s(l+"/manage/product/updateStatus",{productId:e,status:a},"POST"),f=e=>{var a=e.pageNum,t=e.pageSize,r=e.searchName,n=e.searchType;return s(l+"/manage/product/search",{pageNum:a,pageSize:t,[n]:r})},v=e=>s(l+"/manage/img/delete",{name:e},"POST"),b=e=>s(l+"/manage/product/"+(e._id?"update":"add"),e,"POST"),h=()=>s(l+"/manage/role/list"),E=e=>s(l+"/manage/role/add",{roleName:e},"POST"),y=e=>s(l+"/manage/role/update",e,"POST"),w=()=>s(l+"/manage/user/list"),S=e=>s(l+"/manage/user/delete",{userId:e},"POST"),O=e=>s(l+"/manage/user/"+(e._id?"update":"add"),e,"POST")},"bes/":function(e,a,t){e.exports={item:"item___EZ3dS"}}}]);