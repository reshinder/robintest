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

var app = new Vue({
    el: '#pageHome',
    data: {
        main: 1, //0:account; 1:security; 2:notification; 3:verification 4:addressbook;
        sub:0,
        st:0,//安全组件默认认证类型 0 无1，phone 2.TFA

    },
    components: {
        footerview:footerview,
        headerview:headerview,
        usermotal:usermotal,
        account: account,
        security: security,
        notification: notification,
        addressbook: addressbook,
        verification: verification
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
        },
        toggleTabs (index) {
            this.main = index;
        },
        resetcon(arg){
            this.main = arg.main;
            this.st = arg.st;
        },
    }
});
