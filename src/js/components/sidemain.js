import pageBus from '../common/bus'
var jquery=require('../../js/lib/jquery.js');
import axios from '../common/axios_default';
import vlm from '../lib/vlm.js';
import Vue from '../lib/vue.js';
import chartview from '../components/chartview.js';
let template= require('./sidemain.html');
let sidemain = {
    template: template,
    data: function() {
  return {
         "busitype":"coin-usd-btc",//当前币种
         "websocket":null,
         "bidsAndAsks":"All",
         "orderSate":"All",
         "busiTypeInfos":[],
         "unCompleteOrders":[],//委托订单记录
         "completeOrders":[],//历史记录
         "recentTradeRecords":[],
         "asks":[],
         "bids":[],
         /*************unCompleteOrdersSearch查询条件***************/
          //busitype      交易对代号，必填
          //tradetype		  交易类型，选填，1买，2卖
          //ordercolum 	  排序字段（可选）
          //orderdirect  排序方向（可选）  0升序（默认），1降序
          //page			   起始页（可选）		默认为1，
          //size			   每页显示个数（可选），默认为20
         "unCompleteOrdersSearch":{"busitype":"coin-usd-btc","tradetype":"","ordercolum":"","orderdirect":"","page":1,size:10},
         /*********************************************************/

         /*************getCompleteOrdersSearch查询条件***************/
          //busitype      交易对代号，必填
          //ordercolum 	  排序字段（可选）
          //orderdirect  排序方向（可选）  0升序（默认），1降序
          //page			   起始页（可选）		默认为1，
          //size			   每页显示个数（可选），默认为20
         "completeOrdersSearch":{"busitype":"coin-usd-btc","orderstate":"","ordercolum":"","orderdirect":"","page":1,size:10}
         /*********************************************************/
        }
    },
    components: {
        chartview: chartview
    },
    filters:{      //数据过滤器
      uppercase:function(value){
          return value.toUpperCase();
      },
       dataformat:function(value,num){
          value=Number(value)
          return parseFloat(value.toFixed(num));
       },
       dateTimeFormat:function(value){
          return new Date(parseInt(value)).toLocaleString().replace(/[年月]/g,'-').replace(/[日上下午]/g,'');
       },
       getCoinType:function(value,index){
            return vlm.coinType[value][index];
       }
    },
    methods: {
        init:function(){
           //获取币种基础信息信息
           this.getBusiTypeInfosCmd();
           this.getCompleteOrdersCmd();
           this.getUnCompleteOrdersCmd();
           this.getRecentTradeRecordsCmd();
           this.registDepth();
        },
        registDepth(){
            var that=this;
            that.websocket = new WebSocket("ws://106.14.210.142:90/mkapi/ws");
            that.websocket.onopen = function(){
                console.log("websocket open");
                that.websocket.send('[{"type":"subHq","event":"depth","param":{"businessType":"swap-btc-cny","size":15, "dType":0}}]');
            }
            that.websocket.inclose = function(){
                console.log('websocket close');
            }
            that.websocket.onmessage = function(e){
                var data = JSON.parse(e.data).data;
                var allAsksAmount=0;
                var allBidsAmount=0;
                data.asks.forEach(function(item,index,array){
                      if(index==0){
                         item.totel=item.amount
                      }else{
                         item.totel=item.amount+(array[index-1]).totel
                        allAsksAmount+=item.totel;
                      }
                })
                data.asks.allAsksAmount=allAsksAmount;
                that.asks=data.asks;

                data.bids.forEach(function(item,index,array){
                      if(index==0){
                        item.totel=item.amount
                      }else{
                        item.totel=item.amount+(array[index-1]).totel
                        allBidsAmount+=item.totel;
                      }
                })
                data.bids.allBidsAmount=allBidsAmount;
                that.bids=data.bids;
            }
        },
        /**委托订单列表查询事件**/
        //下拉框
        selectType(e,type){
            $(e.currentTarget).find('ul').slideDown(100);

        },
        //选中
        chooseLi(e,type){
            $(e.target).parents('.select_column').find('.sel_text').html($(e.target).html());
            $(e.target).parent().slideUp(100);

            if(type==1){
              var ss=$(e.target).attr("data-type");
              this.unCompleteOrdersSearch.busitype=$(e.target).attr("data-type");
              //执行查询
              this.getUnCompleteOrdersCmd();
            }else{
              var ss=$(e.target).attr("data-type");
              this.completeOrdersSearch.busitype=$(e.target).attr("data-type");
              //执行查询
              this.getCompleteOrdersCmd();

            }
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

        getRecentTradeRecordsCmd(){
          var that=this;
          axios.get('cointrade.act?cmd=getRecentTradeRecords&busitype='+that.busitype)
            .then(function (response) {
                if(response.data.sucess){
                    that.recentTradeRecords=response.data.data;
                }else{
                   alert(response.data.message)
                }
            })
        },

        getUnCompleteOrdersCmd(){
          var that=this;
          axios.get('cointrade.act?cmd=getUnCompleteOrders', {params:that.unCompleteOrdersSearch})
            .then(function (response) {
                if(response.data.sucess){
                    that.unCompleteOrders=response.data.data;
                }else{
                   alert(response.data.message)
                }
            })
        },
        getCompleteOrdersCmd(){
          var that=this;
          axios.get('cointrade.act?cmd=getCompleteOrders', {params:that.completeOrdersSearch})
            .then(function (response) {
                if(response.data.sucess){
                    that.completeOrders=response.data.data;
                }else{
                   alert(response.data.message)
                }
            })
        },

        orderDelegateBidsOrAsks(e,type){
          //更新查询条件
          this.unCompleteOrdersSearch.tradetype=type;
          //执行查询
          this.getUnCompleteOrdersCmd();
        },
        orderHistory(e,type){
          //更新查询条件
          this.completeOrdersSearch.orderstate=type;
          //执行查询
          this.getCompleteOrdersCmd();
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
