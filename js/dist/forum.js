module.exports=function(e){var t={};function r(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(a,n,function(t){return e[t]}.bind(null,n));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=12)}([function(e,t){e.exports=flarum.core.compat["forum/app"]},function(e,t){e.exports=flarum.core.compat["utils/withAttr"]},function(e,t){e.exports=flarum.core.compat["common/extend"]},function(e,t){e.exports=flarum.core.compat.Model},function(e,t){e.exports=flarum.core.compat["models/User"]},function(e,t){e.exports=flarum.core.compat["components/Button"]},function(e,t){e.exports=flarum.core.compat["common/components/Page"]},function(e,t){e.exports=flarum.core.compat["utils/Stream"]},function(e,t){e.exports=flarum.core.compat["components/Badge"]},function(e,t){e.exports=flarum.core.compat["utils/UserControls"]},function(e,t){e.exports=flarum.core.compat["components/Modal"]},,function(e,t,r){"use strict";r.r(t);var a=r(2),n=r(0),o=r.n(n),s=r(8),i=r.n(s),u=r(5),l=r.n(u),c=r(3),f=r.n(c),d=r(6),p=r.n(d),b=r(4),h=r.n(b),y=r(9),_=r.n(y);function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var g=r(10),x=r.n(g),M=r(7),k=r.n(M),w=r(1),O=r.n(w),U=function(e){var t,r;function a(){return e.apply(this,arguments)||this}r=e,(t=a).prototype=Object.create(r.prototype),t.prototype.constructor=t,v(t,r);var n=a.prototype;return n.oninit=function(t){e.prototype.oninit.call(this,t);var r=this.attrs.user.miserableUntil(),a=null;new Date>r&&(r=null),r&&(a=9999===r.getFullYear()?"indefinitely":"limited"),this.status=k()(a),this.daysRemaining=k()("limited"===a&&1-dayjs().diff(r,"days"))},n.className=function(){return"MiserableUserModal Modal--small"},n.title=function(){return app.translator.trans("the-turk-miserable-users.forum.miserable_user.title",{user:this.attrs.user})},n.content=function(){var e=this;return m("div",{className:"Modal-body"},m("div",{className:"Form"},m("div",{className:"Form-group"},m("label",null,app.translator.trans("the-turk-miserable-users.forum.miserable_user.status_heading")),m("div",null,m("label",{className:"checkbox"},m("input",{type:"radio",name:"status",checked:!this.status(),value:"",onclick:O()("value",this.status)}),app.translator.trans("the-turk-miserable-users.forum.miserable_user.not_miserable_label")),m("label",{className:"checkbox"},m("input",{type:"radio",name:"status",checked:"indefinitely"===this.status(),value:"indefinitely",onclick:O()("value",this.status)}),app.translator.trans("the-turk-miserable-users.forum.miserable_user.indefinitely_label")),m("label",{className:"checkbox MiserableUserModal-days"},m("input",{type:"radio",name:"status",checked:"limited"===this.status(),value:"limited",onclick:function(t){e.status(t.target.value),m.redraw.sync(),e.$(".MiserableUserModal-days-input input").select(),t.redraw=!1}}),app.translator.trans("the-turk-miserable-users.forum.miserable_user.limited_time_label"),"limited"===this.status()?m("div",{className:"MiserableUserModal-days-input"},m("input",{type:"number",min:"0",value:this.daysRemaining(),oninput:O()("value",this.daysRemaining),className:"FormControl"}),app.translator.trans("the-turk-miserable-users.forum.miserable_user.limited_time_days_text")):""))),m("div",{className:"Form-group"},m(l.a,{className:"Button Button--primary",loading:this.loading,type:"submit"},app.translator.trans("the-turk-miserable-users.forum.miserable_user.submit_button")))))},n.onsubmit=function(e){var t=this;e.preventDefault(),this.loading=!0;var r=null;switch(this.status()){case"indefinitely":r=new Date("2038-01-01");break;case"limited":r=dayjs().add(this.daysRemaining(),"days").toDate()}this.attrs.user.save({miserableUntil:r}).then((function(){return t.hide()}),this.loaded.bind(this))},a}(x.a);o.a.initializers.add("the-turk-miserable-users",(function(){if(localStorage.getItem("breakFlarum")){localStorage.removeItem("breakFlarum");try{undefinedFunction()}catch(e){throw window.onerror=function(){return!0},new Error}}h.a.prototype.canMiserable=f.a.attribute("canMiserable"),h.a.prototype.canMiserableOthers=f.a.attribute("canMiserableOthers"),h.a.prototype.miserableUntil=f.a.attribute("miserableUntil",f.a.transformDate);var e=function(){localStorage.setItem("breakFlarum",!0),window.location=window.location.href},t=function(){var e=o.a.forum.attribute("miserable_users.redirection_page_url");window.location=e||o.a.forum.attribute("baseUrl")},r=function(){return setTimeout(o.a.session.logout.bind(o.a.session),0)},n=function(e){var t=Math.random(),r=0;e.length>1&&function(e){for(var t=e.length-1;t>0;t--){var r=Math.floor(Math.random()*(t+1)),a=[e[r],e[t]];e[t]=a[0],e[r]=a[1]}}(e);var a=e.find((function(e){return(r+=e.chance/100)>=t}));a&&a.func()};Object(a.extend)(p.a.prototype,"oninit",(function(){var r=o.a.session.user,a=[{chance:o.a.forum.attribute("miserable_users.broken_page_chance"),func:e},{chance:o.a.forum.attribute("miserable_users.redirection_chance"),func:t}];r&&r.miserableUntil()&&new Date<r.miserableUntil()&&n(a)})),Object(a.extend)(p.a.prototype,"oncreate",(function(){var e=o.a.session.user,t=[{chance:o.a.forum.attribute("miserable_users.log_out_chance"),func:r}];e&&e.miserableUntil()&&new Date<e.miserableUntil()&&n(t)})),Object(a.extend)(p.a.prototype,"onbeforeupdate",(function(){var e,t,r=o.a.session.user;if(r&&new Date<r.miserableUntil()){var a=o.a.forum.attribute("miserable_users.loading_delay_min"),n=o.a.forum.attribute("miserable_users.loading_delay_max");!function(e){var t,r=Date.now();do{t=Date.now()}while(t-r<e)}(1e3*(e=a,t=n,Math.floor(Math.random()*(t-e+1)+e)))}})),Object(a.extend)(_.a,"moderationControls",(function(e,t){t&&t.canMiserable()&&e.add("miserable",l.a.component({icon:"fas fa-sad-cry",onclick:function(){return o.a.modal.show(U,{user:t})}},o.a.translator.trans("the-turk-miserable-users.forum.user_controls.miserable_user_button")))})),Object(a.extend)(h.a.prototype,"badges",(function(e){var t=o.a.session.user;t&&t.canMiserableOthers()&&new Date<this.miserableUntil()&&e.add("miserable-user",i.a.component({icon:"far fa-sad-cry",type:"miserable",label:o.a.translator.trans("the-turk-miserable-users.forum.user_badge.miserable_user_tooltip")}))}))}))}]);
//# sourceMappingURL=forum.js.map