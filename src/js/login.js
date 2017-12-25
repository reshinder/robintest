import axiosInstance from './common/axios_default';
import helper from './common/chelper'
import pageBus from './common/bus';
import $ from './lib/jquery-3.2.1.min';
import Vue from './lib/vue.js';


import headerview from './components/header.js';
import footerview from './components/footer.js';
import footer_empty from './components/footer_empty.js';
import logindefault from './components/logindefault.js';
import logincheck from './components/logincheck.js';



var app = new Vue({
    el: '#pageHome',
    data: {
        currentView: 'logindefault', //0,logindefault, 1 logincheck
        footercurrentView: 'footer_empty',
        subInfo:2, // 1手机验证,2,GL2FA验证，
        resettag:0 //是否来自重置，默认不是
    },
    components: {
        footerview:footerview,
        footer_empty:footer_empty,
        headerview:headerview,
        logindefault:logindefault,
        logincheck:logincheck,

    },
    created:function(){
        if(helper.getQueryString("reset")){
            this.resettag = helper.getQueryString("reset");
        }
        if(helper.getQueryString("main")==1){
            this.headercurrentView = headerview;
            this.footercurrentView = footerview;
            this.currentView = 'logincheck';
            this.subInfo = helper.getQueryString("sub")
        }

    },
    mounted:function () {
       this.init();
    },
    methods: {
        init(){
            let self = this;
            self.fixHeight();
            $(window).resize(function() {
                self.fixHeight()
            });
            this.pageView();

        },
        gtest(){
            console.log(999)
        },
        viewHandler(arg){ //触发即打开验证页
           if(arg.main==1){
               this.footercurrentView = footer_empty;
               this.currentView = 'logincheck';
               this.subInfo = arg.sub //对应打开验证页
           }else{
               this.headercurrentView = headerview;
               this.footercurrentView = footerview;
               this.currentView = 'logindefault';
               this.subInfo = arg.sub //对应打开验证页
           }

        },
        pageView(){

        },
        fixHeight(){
            let self = this, winHeight =$(window).height() ;
            let tarHeight = $('.head-wrap').outerHeight()+$('.footer').outerHeight();
            $('.content-wrap').css('minHeight',(winHeight-tarHeight)+'px');
        }
    }
});
