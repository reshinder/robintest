import Vue from '../lib/vue.js';
import Axios from '../common/axios_default';
import pageBus from '../common/bus'
import $ from '../lib/jquery-3.2.1.min';


let template= require('./trade_panel.html');
let trade_panel = {
    props:['subMsg'],
    template: template,
    data: function() {
        return{

        }
    },
    methods: {
        init:function(){

        }
    },
    created: function() {

    },
    mounted: function() {
        this.init();
    }
};

export default trade_panel