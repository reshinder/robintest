require('../../js/lib/jquery.js');
require('../../js/lib/tradingview/charting_library.min.js');
require('../../js/lib/tradingview/datafeed/udf/datafeed.js');
var Vue = require('../lib/vue.js');
var pageBus = require('../common/bus.js');
var template= require('./chartview.html');


var chartview = {
    template: template,
    data: function() {
        return {}
    },
    methods: {
        init:function(){
          TradingView.onready(function()
      			{
              var widget = window.tvWidget = new TradingView.widget({
        					fullscreen: false,
                  datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo_feed.tradingview.com"),
        					container_id: "chartview",
                  "height": 290,
                  "symbol": "NASDAQ:AAPL",
                  "interval": "D",
                  "timezone": "Etc/UTC",
                  "theme": "Light",
                  "style": "1",
                  "locale": "zh_CN",
                  "toolbar_bg": "#f1f3f6",
                  "enable_publishing": false,
                  "allow_symbol_change": true,
                  "hideideas": true

        				});
      			});
            console.log("组件开始")

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

        return chartview;

    });

} else if (typeof module !== 'undefined' && module.exports) {

    module.exports.chartview = chartview;

} else {

    window.chartview = chartview;

}
