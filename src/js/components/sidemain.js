import pageBus from '../common/bus'
var jquery=require('../../js/lib/jquery-3.2.1.min.js');
import axios from '../common/axios_default';
import vlm from '../lib/vlm.js';
import Vue from '../lib/vue.js';
import chartview from '../components/chartview.js';
let template= require('./sidemain.html');
let sidemain = {
    template: template,
    data: function() {
        return {
         "bidsAndAsks":"All",
         "orderSate":"All",
         "busiTypeInfos":[]
        }
    },
    components: {
        chartview: chartview
    },
    filters:{      //数据过滤器
        uppercase:function(value){
          return value.toUpperCase();
      }
    },
    methods: {
        init:function(){
           this.getBusiTypeInfosCmd();
        },
        //下拉框
        selectType(e){
            $(e.currentTarget).find('ul').slideDown(100);
        },
        //选中
        chooseLi(e){
            $(e.target).parents('.select_column').find('.sel_text').html($(e.target).html());
            $(e.target).parent().slideUp(100);
        },
        //获取交易对基础信息
        getBusiTypeInfosCmd(){
          var that=this;
          axios.get('cointrade.act?cmd=getBusiTypeInfos')
            .then(function (response) {
                if(response.data.sucess){
                    that.busiTypeInfos=response.data.data;
                    console.log("that.busiTypeInfos:"+that.busiTypeInfos)
                }else{
                   alert(response.data.message)
                }
            })
        },
        eve:function(arg){
            pageBus.$emit('change',arg);
        },
    },
    created: function() {

    },
    mounted: function() {
        this.init()
    }
};

export default sidemain
