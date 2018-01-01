<style scoped lang="less">
      @import "../../../assets/css/trade/sidebar.less";
</style>
<template>
<div class="col-lg-4 col-md-4 col-sm-8 col-xs-12 sidebar">
    <div class="row unit-pan first-pan">
        <div class="top-title clearfix">
            <span class="c-logo"></span>
            <div class="fl side_zb_wrap">
                <em class="bs">{{this.busitype|getCoinType(0)}}/{{this.busitype|getCoinType(1)}}</em>
                <em class="side_zb"><i>High：</i><i class="jt_num">{{ticker.high| dataformat(2)}}</i></em>
                <em class="side_zb"><i>Low： </i><i class="jt_num">{{ticker.low| dataformat(2)}}</i></em>
            </div>
            <span class="pull-right">
                <span class="coin-value">{{ticker.last|dataformat(2)}}</span><span class="s-arrow">{{ticker.float*100|dataformat(4)}}%</span>
                <i><b>VOL</b> {{ticker.vol|dataformat(2)}} {{this.busitype|getCoinType(0)}}</i>
            </span>
        </div>
        <div class="tickers-table ">
            <div class="top-name" @click.stop.prevent="slider($event)">
                <span class="arrow down-arrow"></span>
                <span>TICKERS</span>
            </div>
            <div class="tickers-content">
                <table>
                    <thead>
                    <tr>
                        <td @click.prevent.stop="showbox()"><span>SYMBOL</span><span class="arrow-t"></span></td>
                        <td class="tr" @click.prevent.stop="showbox()"><span>LST</span><span
                                class="arrow-t choose-up"></span></td>
                        <td @click.prevent.stop="showbox()"><span>24HR</span><span class="arrow-t choose-down"></span>
                        </td>
                        <td @click.prevent.stop="showbox()"><span>VOLUME SELF</span><span class="arrow-t"></span></td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for='item in tickerArary' @click.stop.prevent="changeCoinEvent($event,item.busitype)">
                        <td>
                            <span class="BTC-icon"></span>
                            <span>{{item.busitype | getCoinType(0)}}</span>
                        </td>
                        <td class="tr">
                            <span> {{item.usdvol | dataformat(2)}}</span>
                            <span class="fc">USD</span>
                        </td>
                        <td class="fc-red">
                            <span> {{item.float*100 | dataformat(2)}}%</span>
                        </td>
                        <td>
                            <span>{{item.vol | dataformat(4)}}</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="row unit-pan">
        <div class="tickers-table">
            <div class="top-name" @click.stop.prevent="slider($event)">
                <span class="arrow down-arrow"></span>
                <span>ORDER FROM</span>
            </div>
            <div class="tickers-content order-t">
                <div class="input-w">
                    <div class="row">
                        <div class="price-w select-t">
                            <input type="text" id="limit" value="Limit" readonly="readonly"/>
                        </div>
                    </div>
                </div>
                <div class="input-w ">
                    <div class="row">
                        <div class="price-w">
                            <label class="clearfix"><span>PRICE</span><span class="opa_3">USD</span><div class="fr"><em class="green_cross"></em><em class="red_cross"></em></div></label>
                            <input type="text" id="price" v-model="price"/>
                        </div>
                        <div class="price-w">
                            <label><span>AMOUNT</span><span class="opa_3">BTC</span><div class="fr"><em class="green_cross"></em><em class="red_cross"></em></div></label>
                            <input type="text" id="amount" v-model="amount"/>
                        </div>
                    </div>
                    <div class="row btns">
                        <button type="button" class="buy" v-on:click="buyEvent($event)">Buy</button>
                        <button type="button" class="sell" v-on:click="sellEvent($event)">Sell</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row unit-pan">
        <div class="tickers-table">
            <div class="top-name" @click.stop.prevent="slider($event)">
                <span class="arrow down-arrow"></span>
                <span>BALANCES</span>
            </div>
            <div class="tickers-content balances">
                <div class="side_balance_tit">
                    <h5 class="b-tip mr30">TOTAL</h5>
                    <h5 class="b-tip">AVAILABLE</h5>
                </div>

                <ul>
                    <li v-for="item in balances" @click.stop.prevent="sliderPart($event,1,item.coinCode)">
                        <span>{{item.coinName}}</span>
                        <span>{{item.userFixAmount}}</span>
                        <span>{{item.userActiveAmount}}</span>
                    </li>
                    <li>
                      <span>USD EQUIV<i class="market_color"> / MARKET</i></span>
                      <span>{{smAssetToUsd}}</span>
                   </li>
                </ul>
            </div>
        </div>
        <div class="slider-part">
            <span class="close" @click.stop.prevent="sliderPart($event,0)"></span>
            <div class="title">
                <span>{{this.userAssetInfo.coinName}} Asset</span>
            </div>
            <div class="tab-nav">
                <div class="tab">Deposit {{this.userAssetInfo.coinName}}</div>
                <div class="tab">Withdraw {{this.userAssetInfo.coinName}}</div>
            </div>
            <ul>
                <li>
                    <span>Total</span>
                    <span>

                          <span>{{this.userAssetInfo.userFixAmount}}</span>
                          <!-- <span class="fc">00000</span> -->
                          <span class="tmt">{{this.userAssetInfo.coinName}}</span>
                    </span>
                </li>
                <li>
                    <span>Avaliabble</span>
                    <span>
                          <span>{{userAssetInfo.userActiveAmount}}</span>
                          <!-- <span class="fc">00000</span> -->
                          <span class="tmt">{{userAssetInfo.coinName}}</span>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>
<script>


import jquery from '../../../assets/lib/jquery.js';
import axios from '../../../assets/lib/axios_default.js';
export default {
    data: function() {
        return {
          "coinType":{
                   "coin-usd-btc":["BTC","USD"]
                  ,"coin-usd-eth":["ETH","USD"]
                  ,"coin-usd-ltc":["LTC","USD"]
                  ,"coin-usd-etc":["ETC","USD"]
                  ,"coin-usd-bch":["BCH","USD"]
            },
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

          // setInterval(function(){
          //      that.getTickerCmd();
          //      that.getTickerAllCmd();
          //  }, 1000*60);
        },

        getBalancesCmd(){
          var that=this;
          axios.get('userFund.act?cmd=getUserAllAsset')
            .then(function (response) {
                if(response.data.sucess){
                    that.balances=response.data.data;
                }else{
                   //alert(response.data.message)
                }
            }).catch(function (response) {
              console.log(response)
          });

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
          axios.get('cointrade.act?cmd=getTicker&busitype='+this.busitype)
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
                pageBus.$emit('changeDelegleOrder', "buy");
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
             pageBus.$emit('changeDelegleOrder', "sell");
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
        changeCoinEvent:function(event,type){
            this.busitype=type;
            this.getTickerCmd();
            pageBus.$emit('changeCoin', this.busitype);

        }
    },
    created: function() {
        this.init();

    },
    filters:
    {
      //数据过滤器
      dataformat:function(value,num){
            value=Number(value)
            return parseFloat(value.toFixed(num));
      },
       getCoinType:function(value,index){
            return "BTC";
            //return this.coinType[value][index];
       }
    },
    mounted: function() {

        console.info('mounted');

    }

  }
</script>
