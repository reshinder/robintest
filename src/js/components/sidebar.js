
import pageBus from '../common/bus'
var jquery=require('../../js/lib/jquery.js');
import axios from '../common/axios_default';
import vlm from '../lib/vlm.js';
var template= require('./sidebar.html');


var sidebar = {
    template: template,
    data: function() {
        return {
           "price":1001,
           "amount":0.001,
           "tickerArary":[],
           "unCompleteOrders":[],
           "completeOrders":[],
           "recentTradeRecords":[]
        }
    },
    methods: {

        init:function(){
          this.loginCmd();
          this.getTickerAll();
          this.getUnCompleteOrdersCmd();
          this. getRecentTradeRecordsCmd();
          this.getRecentTradeRecords();

        },

       getUnCompleteOrdersCmd(){
         var that=this;
         axios.get('cointrade.act?cmd=getUnCompleteOrders&busitype=coin-usd-btc')
           .then(function (response) {
               if(response.data.sucess){
                   that.unCompleteOrders=response.data.data;
                   console.log("that.unCompleteOrders:"+that.unCompleteOrders)
               }else{
                  alert(response.data.message)
               }
           })
       },
       getRecentTradeRecordsCmd(){
         var that=this;
         axios.get('cointrade.act?cmd=getCompleteOrders&busitype=coin-usd-btc')
           .then(function (response) {
               if(response.data.sucess){
                 that.recentTradeRecords=response.data.data;
                 console.log("that.recentTradeRecords:"+that.recentTradeRecords)
               }else{
                  alert(response.data.message)
               }
           })
       },

       loginCmd(){
         var that=this;
         axios.get('user.act?cmd=login&accountType=1&account=test1@test.com&password=abc12345')
           .then(function (response) {
               if(response.data.sucess){

               }else{
                  alert(response.data.message)
               }
           })
       },


        getTickerAll(){
          var that=this;
          axios.get('cointrade.act?cmd=getAllTicker')
            .then(function (response) {
                if(response.data.sucess){
                    that.tickerArary=response.data.data;
                }else{
                   alert(response.data.message)
                }
            })
        },

        getRecentTradeRecords(){
          var that=this;
          axios.get('cointrade.act?cmd=getRecentTradeRecords&busitype=coin-usd-btc')
            .then(function (response) {
              if(response.data.sucess){
                   that.recentTradeRecords=response.data.data;
              }else{
                 alert(response.data.message)
              }
            })
        },

        sliderPart(event,index){
            if(index>0){
              $(event.target).closest(".tickers-table").hide();
              $('.slider-part').slideToggle(700);
            }else {
                $(event.target).parent().prev().slideToggle(700);
                $('.slider-part').hide();
            }
        },
        buyEvent:function(event){
          axios.get('cointrade.act?cmd=placeBuyOrder&busitype=coin-usd-btc&price='+this.price+"&amount="+this.amount)
           .then(function (response) {
              if(response.data.sucess){
                alert("买单下单成功！")
              }else{
                 alert(response.data.message)
              }
            })
        },
        sellEvent:function(event){

          //获取Coin账户信息
          axios.get('cointrade.act?cmd=placeSellOrder&busitype=coin-usd-btc&price='+this.price+"&amount="+this.amount)
          .then(function (response) {
            if(response.data.sucess){
              alert("卖单下单成功！")
            }else{
               alert(response.data.message)

            }
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        }
    },
    created: function() {
        this.init()
    },
    filters:{      //数据过滤器
        dataformat:function(value,num){
            value=Number(value)
            return value.toFixed(num)
      },
       getCoinType:function(value,index){
            return vlm.coinType[value][index];
       }

    },

    mounted: function() {

        console.info('mounted');

    }
}

if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

    define(function() {

        return sidebar;

    });

} else if (typeof module !== 'undefined' && module.exports) {

    module.exports.sidebar = sidebar;

} else {

    window.sidebar = sidebar;

}
