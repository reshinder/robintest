import $ from './lib/jquery-3.2.1.min.js';
import Vue from './lib/vue.js';
import axios  from './lib/axios.min.js';

import headerview from './components/header.js';
import footerview from './components/footer.js';
import footer_empty from './components/footer_empty.js';
import logindefault from './components/logindefault.js';
import logincheck from './components/logincheck.js';

const helpObj = {
    getQueryString:function(key){
        var t = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i"),
            n = window.location.search.substr(1).match(t),q,
            r = "";

        if(n){
            if(n[2].indexOf("?")>-1){
                r = n[2].split("?")[0];
            }else{
                q = unescape(n[2]).split("=");
                r = q[q.length-1];
            }
        }
        console.log(r);
        return r;
    }
};

var app = new Vue({
    el: '#pageHome',
    data: {
        currentView: 'logindefault',
        footercurrentView: 'footer_empty',
    },
    components: {
        footerview:footerview,
        footer_empty:footer_empty,
        headerview:headerview,
        logindefault:logindefault,
        logincheck:logincheck,

    },
    created:function(){},
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
        viewHandler(arg){
            console.log(arg.main)
            if(arg.main=="logincheck"){
                this.headercurrentView = headerview
                this.footercurrentView = footerview
                this.currentView = arg.main
                this.msg = arg.sub;
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
