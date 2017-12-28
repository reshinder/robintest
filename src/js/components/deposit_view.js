import Vue from '../lib/vue.js';
import Axios from '../common/axios_default';
import pageBus from '../common/bus'
import $ from '../lib/jquery-3.2.1.min';


let template= require('./deposit_view.html');
let deposit_view = {
    props:['subMsg'],
    template: template,
    data: function() {
        return{
            current:0, //0：充值主页    1: 未认证， 2  view all USD,3:充值数字货币 4:美元充值界面 5.美元充值未认证 6：美元重置流程 7：X-code充值
            isUSD:true //true默认USD false对应BTC
        }
    },
    methods: {
        init:function(){

        },
        showProgress(index){
            if(index==2){
                this.current=this.isUSD?1:2;
            }else{
                this.current=index;
            }

        },
        openQRmodal(){
            pageBus.$emit("change",1)
        },
    },
    created: function() {

    },
    mounted: function() {
        this.init();
    }
};

export default deposit_view