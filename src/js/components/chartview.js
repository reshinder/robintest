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
        					fullscreen: true,

        					container_id: "chartview",
        					//	BEWARE: no trailing slash is expected in feed URL
        					datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo_feed.tradingview.com"),
        					library_path: "",
        					locale:  "en",

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
