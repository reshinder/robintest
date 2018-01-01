<template>
  <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12 charts-line">
                <div class="row unit-pan">
                    <div class="tickers-table">
                        <div class="top-name" @click.stop.prevent="slider($event)">
                            <span class="arrow down-arrow"></span>
                            <span>CHARTS</span>
                        </div>
                        <div class="charts-view-out">
                            <chartview></chartview>
                        </div>
                    </div>
                </div>
                <!-- 委托订单 -->
                <div class="row unit-pan">
                    <div class="tickers-table">
                        <div class="top-name" @click.stop.prevent="slider($event)">
                            <span class="arrow down-arrow"></span>
                            <span>ORDERS</span>
                            <div class="select_column" @click.stop.prevent="selectType($event)">
                                <em class="sel_text">BTC</em>
                                <i class="down_gray_arrow"></i>
                                <ul @click.stop.prevent="chooseLi($event,1)">
                                    <li :data-type="item.busitype" v-for='item in busiTypeInfos'>{{item.commodityCode|uppercase}}</li>
                                </ul>
                            </div>

                            <!--右侧tab start-->
                            <div class="fr right_col_tab">
                                <a href="javascript:;" @click.stop.prevent="orderDelegateBidsOrAsks($event,2)" @click="bidsAndAsks='Bids'" :class="{active:bidsAndAsks=='Bids'}">Bids<i></i></a>
                                <a href="javascript:;" @click.stop.prevent="orderDelegateBidsOrAsks($event,1)" @click="bidsAndAsks='Asks'" :class="{active:bidsAndAsks=='Asks'}">Asks<i></i></a>
                                <a href="javascript:;" @click.stop.prevent="orderDelegateBidsOrAsks($event,'')"  @click="bidsAndAsks='All'"  :class="{active:bidsAndAsks=='All'}">All<i></i></a>
                            </div>
                            <!--右侧tab end-->
                        </div>
                        <div class="tickers-content order-table">
                            <table>
                                <thead>
                                <tr>
                                    <td><span class="clear-arrow">PAIR</span></td>
                                    <td><span>CONTEXT</span><span class="arrow-t"></span></td>
                                    <td><span>TYPE</span><span class="arrow-t choose-up"></span></td>
                                    <td><span>AMOUNT</span><span class="arrow-t"></span></td>
                                    <td><span>PRICE</span><span class="arrow-t"></span></td>
                                    <td><span>STATUS</span><span class="arrow-t"></span></td>
                                    <td class="tl"><span>PLACES</span><span class="arrow-t"></span></td>
                                    <td class="delete-td">
                                        <span></span>
                                    </td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="item in unCompleteOrders">
                                   <td>
                                        <span class="circle"></span>
                                        <span>{{item.busitype|getCoinType(0)}}/{{item.busitype|getCoinType(1)}}</span>
                                    </td>
                                    <td>
                                        <span>{{item.type}}</span>
                                    </td>
                                    <td>
                                        <span>LIMIT</span>
                                    </td>
                                    <td class="tl">
                                        <span>{{item.orderAmount}}</span>
                                    </td>

                                    <td>
                                        <span>{{item.orderPrice}}</span>
                                    </td>
                                    <td class="sc-blue">
                                        <span>Active</span>
                                    </td>
                                    <td class="tl">
                                        <span>{{item.createTime|dateTimeFormat('yyyy-MM-dd hh:mm:ss')}}</span>
                                    </td>
                                    <td class="delete-td">
                                        <span></span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <p class="no-act">
                                <span>No acticity orders</span>
                                <span class="sc-blue remove-a">Remove applied filters</span>
                            </p>
                        </div>
                    </div>
                </div>
                <!-- 成交历史订单 -->
                <div class="row unit-pan">
                    <div class="tickers-table">
                        <div class="top-name" @click.stop.prevent="slider($event)">
                            <span class="arrow down-arrow"></span>
                            <span>ORDER HISTORY</span>
                            <div class="select_column" @click.stop.prevent="selectType($event)">
                                <em class="sel_text">BTC</em>
                                <i class="down_gray_arrow"></i>
                                <ul @click.stop.prevent="chooseLi($event,2)">
                                    <li :data-type="item.busitype" v-for='item in busiTypeInfos'>{{item.commodityCode|uppercase}}</li>
                                </ul>
                            </div>

                            <!--右侧tab start-->
                            <div class="fr right_col_tab">
                                <a href="javascript:;" @click.stop.prevent="orderHistory($event,4)" @click="orderSate='Canceled'" :class="{active:orderSate=='Canceled'}">Canceled<i></i></a>
                                <a href="javascript:;" @click.stop.prevent="orderHistory($event,2)" @click="orderSate='Executed'" :class="{active:orderSate=='Executed'}">Executed<i></i></a>
                                <a href="javascript:;" @click.stop.prevent="orderHistory($event,3)"  @click="orderSate='Partially'" :class="{active:orderSate=='Partially'}">Partially Executed<i></i></a>
                                <a href="javascript:;" @click.stop.prevent="orderHistory($event,'')" @click="orderSate='All'" :class="{active:orderSate=='All'}">All<i></i></a>
                            </div>
                            <!--右侧tab end-->
                        </div>
                        <div class="tickers-content history-table">
                            <table>
                                <thead>
                                <tr>
                                    <td><span class="clear-arrow">PAIR</span></td>
                                    <td><span>CONTEXT</span><span class="arrow-t"></span></td>
                                    <td><span>TYPE</span><span class="arrow-t choose-up"></span></td>
                                    <td class="tr"><span>AMOUNT</span><span class="arrow-t"></span></td>
                                    <td><span>PRICE</span><span class="arrow-t"></span></td>
                                    <td><span>STATUS</span><span class="arrow-t"></span></td>
                                    <td><span>PLACES</span><span class="arrow-t"></span></td>
                                    <td class="delete-td">
                                        <span class="close"></span>
                                    </td>
                                </tr>

                                </thead>
                                <tbody>
                                <tr v-for="item in completeOrders">
                                   <td>
                                        <span class="circle"></span>
                                        <span>{{item.busitype|getCoinType(0)}}/{{item.busitype|getCoinType(1)}}</span>
                                    </td>
                                    <td>
                                        <span>{{item.type}}</span>
                                    </td>
                                    <td>
                                        <span>LIMIT</span>
                                    </td>
                                    <td class="tl">
                                        <span>{{item.orderAmount}}</span>
                                    </td>

                                    <td>
                                        <span>{{item.orderPrice}}</span>
                                    </td>
                                    <td class="sc-blue">
                                        <span>Active</span>
                                    </td>
                                    <td class="tl">
                                        <span>{{item.createTime|dateTimeFormat('yyyy-MM-dd hh:mm:ss')}}</span>
                                    </td>
                                    <td class="delete-td" @click.stop.prevent="deleteOrder($event)">
                                        <span></span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <p class="no-act">
                                <span>No acticity orders</span>
                                <span class="sc-blue remove-a">Remove applied filters</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row unit-pan book-trader">
                    <div class="col-sm-12 col-xs-12 order-book-p">
                        <div class="tickers-table">
                            <div class="top-name" @click.stop.prevent="slider($event)">
                                <span class="arrow down-arrow"></span>
                                <span>ORDER BOOK</span>
                                <span class="fc">BTC/USD</span>
                                <div class="change-tag">
                                    <span class="minus"></span>
                                    <span class="plus"></span>
                                </div>
                            </div>
                            <div class="tickers-content order-book">
                                <div class="hill_wrap">
                                    <div class="hill_tit">
                                        <span class="clear-arrow"></span>
                                        <span class="clear-arrow">AMOUNT</span>
                                        <span class="clear-arrow">TOTAL</span>
                                        <span class="clear-arrow">PRICE</span>
                                        <span class="clear-arrow">PRICE</span>
                                        <span class="clear-arrow">TOTAL</span>
                                        <span class="clear-arrow">AMOUNT</span>
                                        <span class="clear-arrow"></span>
                                    </div>
                                    <div class="hill_body">

                                        <!-- <div class="hill_list" v-for="(item,index) in asks">
                                            <div class="hill_left_bg"><em v-bind:style="{width:(bids[index].totel*100/bids.allBidsAmount)+'%'}"></em></div>
                                            <div class="hill_right_bg"><em v-bind:style="{width:(asks[index].totel*100/asks.allAsksAmount)+'%'}"></em></div>
                                            <div class="hill_item" >
                                                <span>bid{{index+1}}</span>
                                                <span>{{bids[index].amount|dataformat(2)}}</span>
                                                <span>{{bids[index].totel|dataformat(2)}}</span>
                                                <span>{{bids[index].price|dataformat(2)}}</span>

                                                <span>{{asks[index].price|dataformat(2)}}</span>
                                                <span>{{asks[index].totel|dataformat(2)}}</span>
                                                <span>{{asks[index].totel|dataformat(2)}}</span>
                                                <span>ask{{index+1}}</span>
                                            </div>
                                        </div> -->
                                        <div class="hill_list">
                                        <div class="hill_left_bg"><em style="width: 20%;"></em></div>
                                        <div class="hill_right_bg"><em style="width: 20%;"></em></div>
                                        <div class="hill_item">
                                            <span>3</span>
                                            <span>123</span>
                                            <span>234.9</span>
                                            <span>444</span>
                                            <span>444.22</span>
                                            <span>444.34</span>
                                            <span>114.28</span>
                                            <span>666.88</span>
                                        </div>
                                    </div>

                                    <div class="hill_list">
                                        <div class="hill_left_bg"><em style="width: 40%;"></em></div>
                                        <div class="hill_right_bg"><em style="width: 40%;"></em></div>
                                        <div class="hill_item">
                                            <span>3</span>
                                            <span>123</span>
                                            <span>234.9</span>
                                            <span>444</span>
                                            <span>444.22</span>
                                            <span>444.34</span>
                                            <span>114.28</span>
                                            <span>666.88</span>
                                        </div>
                                    </div>

                                    <div class="hill_list">
                                        <div class="hill_left_bg"><em style="width: 60%;"></em></div>
                                        <div class="hill_right_bg"><em style="width: 60%;"></em></div>
                                        <div class="hill_item">
                                            <span>3</span>
                                            <span>123</span>
                                            <span>234.9</span>
                                            <span>444</span>
                                            <span>444.22</span>
                                            <span>444.34</span>
                                            <span>114.28</span>
                                            <span>666.88</span>
                                        </div>
                                    </div>


                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-xs-12 trades-p">
                        <div class="tickers-table">
                            <div class="top-name" @click.stop.prevent="slider($event)">
                                <span class="arrow down-arrow"></span>
                                <span>TRADES</span>
                                <span class="fc">BTC/USD</span>
                            </div>
                            <div class="tickers-content trade">
                                <table>
                                    <thead>
                                    <tr>
                                        <td><span class="clear-arrow">TIME</span></td>
                                        <td><span class="clear-arrow">PRICE</span></td>
                                        <td><span class="clear-arrow">AMOUNT</span></td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="item in recentTradeRecords">
                                        <span>{{item.time}}</span>

                                        <td><span>{{item.price|dataformat(2)}}</span></td>
                                        <td><span>{{item.amount|dataformat(4)}}</span></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</template>

<script>
  import jquery from '../../../assets/lib/jquery.js';
  import axios from '../../../assets/lib/axios_default.js';
;
  import chartview from './chart.vue';
  export default {
    components: {chartview},
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

           // setInterval(function(){
           //   this.getCompleteOrdersCmd();
           //   this.getUnCompleteOrdersCmd();
           // }, 1000*1);

           $(".arrow").toggle(
             function(){
              $(this).removeClass("down-arrow")
              $(this).addClass("up-arrow")
              $(this).parent().siblings().hide()
           },
           function(){
              $(this).removeClass("up-arrow")
              $(this).addClass("down-arrow")
              $(this).parent().siblings().show();
           }
         )
        },
        registDepth(){
            var that=this;
            that.websocket = new WebSocket("ws://106.14.210.142:90/mkapi/ws");
            that.websocket.onopen = function(){
                console.log("websocket open");
                that.websocket.send('[{"type":"subHq","event":"depth","param":{"businessType":"coin-usd-btc","size":15, "dType":0}}]');
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
                   //alert(response.data.message)
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
                   //alert(response.data.message)
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
            this.$emit('change',arg);
        },

    },
    created: function() {
       var that=this;
       that.$on('changeCoin', target => {
            that.busitype=target

        });
        that.$on('changeDelegleOrder', target => {
              console.log(target);
              that.getUnCompleteOrdersCmd();
              that.getCompleteOrdersCmd();
         });
    },
    mounted: function() {
        this.init();

    }
};

</script>
