import helper from './common/chelper'
import pageBus from './common/bus'

import $ from './lib/jquery-3.2.1.min.js';
import Vue from './lib/vue.js';
import axios  from './lib/axios.min.js';


import headerview from './components/header.js';
import footerview from './components/footer.js';
import header_empty from './components/header_empty.js';
import footer_empty from './components/footer_empty.js';
import registerdefault from './components/registerdefault.js';
import registerprogress from './components/registerprogress.js';

var app = new Vue({
    el: '#pageHome',
    data: {
        view:{
          main:1,
          sub:1
        },
        currentView: 'registerdefault',
        headercurrentView: 'header_empty',
        footercurrentView: '',
        msg:0

    },
    components: {
        footerview:footerview,
        header_empty:header_empty,
        footer_empty:footer_empty,
        headerview:headerview,
        registerdefault:registerdefault,
        registerprogress:registerprogress,
    },
    created:function(){
        var self=this;
        this.view.main = helper.getQueryString("main");
        this.view.sub = helper.getQueryString("sub");
        console.log("this.view.main")

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
            this.pageView()
        },
        pageView(){
            var tarStr = helper.getQueryString('tab')
            var sub = helper.getQueryString('subTab')
            if(tarStr=="registerprogress"){
                this.headercurrentView = headerview
                this.footercurrentView = footerview
                this.currentView = registerprogress
                this.msg = sub;
            }
        },
        fixHeight(){
            let self = this, winHeight =$(window).height() ;
            let tarHeight = $('.head-wrap').outerHeight()+$('.footer').outerHeight();
            $('.content-wrap').css('minHeight',(winHeight-tarHeight)+'px');
        }
    }
});
