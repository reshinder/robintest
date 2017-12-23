
import pageBus from '../common/bus'
var jquery=require('../../js/lib/jquery.js');
import axios from '../common/axios_default';;
var template= require('./sidebar.html');


var sidebar = {
    template: template,
    data: function() {
        return {
           "price":1001,
           "amount":0.001,
           "tickerArary":[]
        }
    },
    methods: {

        init:function(){
          var that=this;
          axios.all([
              axios.get('user.act?cmd=login&accountType=1&account=test1@test.com&password=abc12345'),
              axios.get('cointrade.act?cmd=getAllTicker') //获取Ticker
            ])
          .then(axios.spread(function (response1,response2){
            that.tickerArary=response2.data.data;
            debugger;
            console.log(that.tickerArary);
          }))
          .catch(function (error) {
            console.log(error);
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
            .then(axios.spread(function (response){
              if(response.data.sucess){
                alert("买单下单成功！")
              }else{
                 alert(response.data.message)
              }
            }))

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
