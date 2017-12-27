import Vue from '../lib/vue.js';
import Axios from '../common/axios_default';
import pageBus from '../common/bus'
import $ from '../lib/jquery-3.2.1.min';


let template= require('./report.html');
let report = {
    props:['subMsg'],
    template: template,
    data: function() {
        return{
            subReport:0
        }
    },
    methods: {
        init:function(){}
    },
    created: function() {

    },
    mounted: function() {
        console.log("^^^^")
        console.log(this.subMsg)
        this.subReport = this.subMsg
    }
};

export default report