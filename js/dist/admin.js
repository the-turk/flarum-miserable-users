module.exports=function(e){var t={};function r(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,s){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(r.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(s,n,function(t){return e[t]}.bind(null,n));return s},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=13)}({1:function(e,t){e.exports=flarum.core.compat["utils/withAttr"]},11:function(e,t){e.exports=flarum.core.compat["admin/app"]},13:function(e,t,r){"use strict";r.r(t);var s=r(11),n=r.n(s),a=r(1),i=r.n(a);n.a.initializers.add("the-turk-miserable-users",(function(e){var t=function(e,t,r){e(r),t(Math.max(r,t()))};e.extensionData.for("the-turk-miserable-users").registerSetting((function(){var r=this.setting("the-turk-miserable-users.loading_delay_min"),s=this.setting("the-turk-miserable-users.loading_delay_max");return m("div",{className:"Form-group"},m("label",null,e.translator.trans("the-turk-miserable-users.admin.settings.loading_delay_label")),m("div",{className:"helpText"},e.translator.trans("the-turk-miserable-users.admin.settings.loading_delay_text")),m("div",{className:"MiserableUsers-rangeInput"},m("input",{className:"FormControl",type:"number",min:"0",value:r(),oninput:i()("value",t.bind(this,r,s))}),e.translator.trans("the-turk-miserable-users.admin.settings.range_separator_text"),m("input",{className:"FormControl",type:"number",min:r(),bidi:s}),e.translator.trans("the-turk-miserable-users.admin.settings.range_seconds_text")))})).registerSetting({setting:"the-turk-miserable-users.broken_page_chance",type:"number",label:e.translator.trans("the-turk-miserable-users.admin.settings.broken_page_chance_label"),help:e.translator.trans("the-turk-miserable-users.admin.settings.broken_page_chance_text")}).registerSetting({setting:"the-turk-miserable-users.flood_time_multiplier",type:"number",label:e.translator.trans("the-turk-miserable-users.admin.settings.flood_time_multiplier_label"),help:e.translator.trans("the-turk-miserable-users.admin.settings.flood_time_multiplier_text")}).registerSetting({setting:"the-turk-miserable-users.redirection_chance",type:"number",label:e.translator.trans("the-turk-miserable-users.admin.settings.redirection_chance_label"),help:e.translator.trans("the-turk-miserable-users.admin.settings.redirection_chance_text")}).registerSetting({setting:"the-turk-miserable-users.redirection_page_url",label:e.translator.trans("the-turk-miserable-users.admin.settings.redirection_page_url_label"),help:e.translator.trans("the-turk-miserable-users.admin.settings.redirection_page_url_text")}).registerSetting({setting:"the-turk-miserable-users.log_out_chance",type:"number",label:e.translator.trans("the-turk-miserable-users.admin.settings.log_out_chance_label"),help:e.translator.trans("the-turk-miserable-users.admin.settings.log_out_chance_text")}).registerSetting({setting:"the-turk-miserable-users.shuffle_post_chance",type:"number",label:e.translator.trans("the-turk-miserable-users.admin.settings.shuffle_post_chance_label"),help:e.translator.trans("the-turk-miserable-users.admin.settings.shuffle_post_chance_text")}).registerPermission({icon:"fas fa-sad-cry",label:e.translator.trans("the-turk-miserable-users.admin.permissions.miserable_user_label"),permission:"user.miserable"},"moderate")}))}});
//# sourceMappingURL=admin.js.map