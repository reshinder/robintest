import Vue from '../lib/vue.js';
import Axios from '../common/axios_default';
import helper from '../common/chelper';
import pageBus from '../common/bus';
import $ from '../lib/jquery-3.2.1.min';


let template= require('./withdraw_view.html');
let withdraw_view = {
    props:['subMsg'],
    template: template,
    data: function() {
        return{
            current:0, //0：提现默认页  1: view all USD， 2  view all BTC,3:""  4:美元提现未认证 5.提现状态页
            isUSD:true //true默认USD false对应BTC
        }
    },
    methods: {
        init(){
            let self = this;
            if(helper.getQueryString('main')!=""){
                this.current = helper.getQueryString('main');
            }

        },
        showProgress(index){
            if(index==2){
                this.current=this.isUSD?1:2;
            }else{
                this.current=index;
            }

        },
        openQRmodal(index){
            console.log(index)
            pageBus.$emit("change",index)
        },
    },
    created: function() {

    },
    mounted: function() {
        this.init();
    }
};

export default withdraw_view