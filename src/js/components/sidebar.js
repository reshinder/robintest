
import pageBus from '../common/bus'
var jquery=require('../../js/lib/jquery.js');
import axios from '../common/axios_default';
import vlm from '../lib/vlm.js';
var template= require('./sidebar.html');


var sidebar = {
    template: template,
    data: function() {
        return {
           "busitype":"coin-usd-btc",//当前币种
           "price":1001, //当前市价
           "amount":0.001,//当前数量
           "tickerArary":[],//所有币种Ticker信息

           "recentTradeRecords":[],//最近成交记录
           "balances":[], //总账户信息
           "ticker":{}, //选择最新币种Ticker
           "smAssetToUsd":"0", //USD总资产
           "userAssetInfo":{} //币种详细资产情况



        }
    },
    methods: {

        init:function(){
          var that=this;
          that.loginCmd();
          that.getTickerAllCmd();
          that.getTickerCmd();
          that.getBalancesCmd();
          that.getSumAssetToUsdCmd();

          setInterval(function(){
               that.getTickerCmd();
               that.getTickerAllCmd();
           }, 1000*60);
        },
        getBalancesCmd(){
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
        getUserAssetInfoCmd(coinName){
          var that=this;
          axios.get('userFund.act?cmd=getUserAssetInfo&coinCode='+coinName)
            .then(function (response) {
                if(response.data.sucess){
                    that.userAssetInfo=response.data.data;
                }else{
                   alert(response.data.message)
                }
            })
        },
        getSumAssetToUsdCmd(){
          var that=this;
          axios.get('userFund.act?cmd=getSumAssetToUsd')
            .then(function (response) {
                if(response.data.sucess){
                    that.smAssetToUsd=response.data.data;
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



       loginCmd(){
         var that=this;
         axios.get('user.act?cmd=login&accountType=1&account=test1@test.com&password=abc12345')
           .then(function (response) {
               if(response.data.sucess){

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

        sliderPart(event,index,coinName){

            if(index>0){
              //获取币种
              this.getUserAssetInfoCmd(coinName);
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
                //更新资产
                that.getBalancesCmd();
                that.getSumAssetToUsdCmd();
                alert("买单下单成功！")
              }else{
                 alert(response.data.message)
              }
            })
        },
        sellEvent:function(event){
          var that=this;

          //获取Coin账户信息
          axios.get('cointrade.act?cmd=placeSellOrder&busitype=coin-usd-btc&price='+this.price+"&amount="+this.amount)
          .then(function (response) {
            if(response.data.sucess){
              //更新资产
              that.getBalancesCmd();
              that.getSumAssetToUsdCmd();

              alert("卖单下单成功！")
            }else{
               alert(response.data.message)
            }
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        },
        eve: function () {
            pageBus.$emit('change', 'accounttip');
        },
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
