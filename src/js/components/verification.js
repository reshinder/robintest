import pageBus from '../common/bus'

import $ from '../lib/jquery-3.2.1.min';
import Vue from '../lib/vue.js';
let template= require('./verification.html');

let verification = {
    template: template,
    data: function() {
        return {
            idcliked:true,
            psclicked:false,
        }
    },
    methods: {
        init:function(){},
        closeTip(){
            $('.modal-out').removeClass('show-box')
        },
        showbox(){
            $('.modal-out').addClass('show-box')
        },
        ame:function(){
            console.log("动画结束")
        },
    },
    created: function() {

    },
    mounted: function() {
        this.init()
    }
};
export default verification