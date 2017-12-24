
import pageBus from '../common/bus'
var jquery=require('../../js/lib/jquery.js');
import axios from '../common/axios_default';
import vlm from '../lib/vlm.js';
var template= require('./sidebar.html');


var sidebar = {
    template: template,
    data: function() {
        return {
           "busitype":"coin-usd-btc",
           "price":1001,
           "amount":0.001,
           "tickerArary":[],
           "unCompleteOrders":[],
           "completeOrders":[],
           "recentTradeRecords":[],
           "balances":[],
           "ticker":{}
        }
    },
    methods: {

        init:function(){
          this.loginCmd();
          this.getTickerAllCmd();
          this.getTickerCmd();
          this.getUnCompleteOrdersCmd();
          this.getRecentTradeRecordsCmd();
          this.getRecentTradeRecords();
          this.getBalances();

        },
        getBalances(){
          var that=this;
          axios.get('userFund.act?cmd=getUserAllAsset')
            .then(function (response) {
                if(response.data.sucess){
                    that.balances=response.data.data;
                }else{
                   alert(response.data.message)
                }
            })

        },
        getTickerCmd(){
          var that=this;
          axios.get('cointrade.act?cmd=getTicker&busitype=coin-usd-btc')
            .then(function (response) {
                if(response.data.sucess){
                    that.ticker=response.data.data;
                }else{
                   alert(response.data.message)
                }
            })
        },

       getUnCompleteOrdersCmd(){
         var that=this;
         axios.get('cointrade.act?cmd=getUnCompleteOrders&busitype=coin-usd-btc')
           .then(function (response) {
               if(response.data.sucess){
                   that.unCompleteOrders=response.data.data;
               }else{
                  alert(response.data.message)
               }
           })
       },
       getRecentTradeRecordsCmd(){
         var that=this;
         axios.get('cointrade.act?cmd=getCompleteOrders&busitype='+that.busitype)
           .then(function (response) {
               if(response.data.sucess){
                 that.recentTradeRecords=response.data.data;
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
        getTickerAllCmd(){
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
          axios.get('cointrade.act?cmd=getRecentTradeRecords&busitype='+that.busitype)
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
          var that=this;
          axios.get('cointrade.act?cmd=placeBuyOrder&busitype=coin-usd-btc&price='+that.price+"&amount="+that.amount)
           .then(function (response) {
              if(response.data.sucess){
                that.getBalances();
                alert("买单下单成功！")
              }else{
                 alert(response.data.message)
              }
            })
        },
        eve: function () {
            pageBus.$emit('change', 'accounttip');
        },
        sliderPart(index){
            $(".slider-part").slideToggle(800);
        },
        sellEvent:function(event){
          var that=this;
          //获取Coin账户信息
          axios.get('cointrade.act?cmd=placeSellOrder&busitype=coin-usd-btc&price='+this.price+"&amount="+this.amount)
          .then(function (response) {
            if(response.data.sucess){
              that.getBalances();
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
            return parseFloat(value.toFixed(num));
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
