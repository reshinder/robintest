import Axios from './common/axios_default';
import $ from './lib/jquery-3.2.1.min.js';
import Vue from './lib/vue.js';


import headerview from './components/header.js';
import footerview from './components/footer.js';
import footer_empty from './components/footer_empty.js';
import logindefault from './components/logindefault.js';
import logincheck from './components/logincheck.js';

/*axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8;';
axios.defaults.baseURL = domain.testDomain;*/

var app = new Vue({
    el: '#pageHome',
    data: {
        currentView: 'logindefault',
        footercurrentView: 'footer_empty',
        msg:''
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
