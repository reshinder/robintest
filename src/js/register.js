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
        msg:0,
        email:"",

    },
    components: {
        footerview:footerview,
        header_empty:header_empty,
        footer_empty:footer_empty,
        headerview:headerview,
        registerdefault:registerdefault,  //1
        registerprogress:registerprogress, //2
    },
    created:function(){
        var self=this;

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
        pageView(arg){
            var main, sub ,email;
            if(!arg){
                 main = helper.getQueryString('main')
                 sub = helper.getQueryString('sub')
                 email = helper.getQueryString('email')
            }else{
                main = arg.main;
                sub = arg.sub;
                email = arg.email
            }

            console.log(main)
            console.log(sub)
            console.log(email)
            if(main==2){
                this.headercurrentView = headerview
                this.footercurrentView = footerview
                this.currentView = registerprogress
                this.msg = sub;
                this.email = email;
            }
        },
        fixHeight(){
            let self = this, winHeight =$(window).height() ;
            let tarHeight = $('.head-wrap').outerHeight()+$('.footer').outerHeight();
            $('.content-wrap').css('minHeight',(winHeight-tarHeight)+'px');
        }
    }
});
