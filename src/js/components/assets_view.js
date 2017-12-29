import Vue from '../lib/vue.js';
import Axios from '../common/axios_default';
import helper from '../common/chelper';
import pageBus from '../common/bus';
import $ from '../lib/jquery-3.2.1.min';


let template= require('./assets_view.html');
let assets_view = {
    props:['subMsg'],
    template: template,
    data: function() {
        return{
            current:0,

        }
    },
    methods: {
        init(){
            let self = this;
            if(helper.getQueryString('main')!=""){
                this.current = helper.getQueryString('main');
            }

        },
        toAnotherPage(index){
            if(index==1){
                location.href="deposit.html"
            }else{
                location.href="withdraw.html"
            }
        },
    },
    created: function() {

    },
    mounted: function() {
        this.init();
    }
};

export default assets_view