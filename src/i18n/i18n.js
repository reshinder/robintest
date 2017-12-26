/*
* des: 多语言
* install: npm install --save-dev vue-i18n
* use: 页面直接导入
* import i18n from '../i18n/i18n.js'; // 多语言
* var Page = new Vue({
* i18n: i18n,
*
* 用法 // TODO 用于切换
* // 更改 locale
* i18n.locale = 'ja'
* // 或
* app.$i18n.locale = 'ja'
* // 组件内可使用 this
* this.$i18n.locale = 'ja'
* 在全局修改语言
* window.i18n = i18n; // TODO 用于切换
* // TODO 切换语言用i18n.locale = "zh";
*
*
* */
// {{$t("aa").replace}}


import Vue from '../js/lib/vue.js';
import VueI18n from '../js/lib/vue-i8n';
import helper from '../js/common/chelper'
Vue.use(VueI18n);

import en from './en_usersystem.json'; // 英语
import cn from './cn_usersystem.json'; // 中文

//const param = helper.getQueryString('lang');
const messages = {
    en: {lang: en}, // 英语
    cn: {lang: cn}, // 中文
};

let lang = 'en';


const i18n = new VueI18n({
    locale: lang, // set locale
    messages, // set locale messages
});

export default i18n;