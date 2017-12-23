import $ from './lib/jquery-3.2.1.min.js';
import Vue from './lib/vue.js';
import axios  from './lib/axios.min.js';

import headerview from './components/header.js';
import footerview from './components/footer.js';
import pannel from './components/pannel.js';
import usermotal from './components/usermotal';


var app = new Vue({
    el: '#pageHome',
    data: {
        tab:1,
        resend:0,
        countTime:0,
        codeTip:1

    },
    components: {
        footerview:footerview,
        headerview:headerview,
        usermotal:usermotal,
        pannel:pannel
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

        },
        fixHeight(){
            let self = this, winHeight =$(window).height() ;
            let tarHeight = $('.head-wrap').outerHeight()+$('.footer').outerHeight();
            $('.content-wrap').css('minHeight',(winHeight-tarHeight)+'px');
        }
    }
});
