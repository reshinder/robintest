import Vue from './lib/vue.js';
import axiosInstance from './common/axios_default';
import helper from './common/chelper'
import pageBus from './common/bus';
import $ from './lib/jquery-3.2.1.min.js';

import headerview from './components/header.js';
import footerview from './components/footer.js';
import usermotal from './components/usermotal'; //弹窗

import account from './components/account.js';
import security from './components/security.js';
import notification from './components/notification.js';
import verification from './components/verification.js';
import addressbook from './components/addressbook.js';
import report from './components/report.js';

import i18n from '../i18n/i18n.js'; // 多语言
var app = new Vue({
    i18n,
    el: '#pageHome',
    data: {
        main: 5, //0:account; 1:security; 2:notification; 3:verification 4:addressbook,5:report;
        sub:0,
        st:0,//安全组件默认认证类型 0 无1，phone 2.TFA
        reportsTransform :false,
        subReport:0,

    },
    components: {
        footerview:footerview,
        headerview:headerview,
        usermotal:usermotal,
        account: account,
        security: security,
        notification: notification,
        addressbook: addressbook,
        verification: verification,
        report: report
    },
    created:function(){

    },
    mounted:function () {
        this.init();
    },
    methods: {
        componentsHandler(){

        },
        init(){
            let self = this;
            if(helper.getQueryString('main')!=""){
                this.main = helper.getQueryString('main');
            }

        },
        toggleTabs (index) {
            this.main = index;
        },
        subtoggleTabs(arg){
            console.log(arg)
            this.subReport = arg;
        },
        resetcon(arg){
            this.main = arg.main;
            this.st = arg.st;
        },
    }
});
