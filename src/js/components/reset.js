require('../../js/lib/jquery.js');
require('../../js/lib/tradingview/charting_library.min.js');
require('../../js/lib/tradingview/datafeed/udf/datafeed.js');
var Vue = require('../lib/vue.js');
var pageBus = require('../common/bus.js');
var template= require('./reset.html');


var resetview = {
    template: template,
    data: function() {
        return {
            tab:0,
            resend:0,
            countTime:0,
            codeTip:1,
        }
    },
    methods: {
        init:function(){
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

        return resetview;

    });

} else if (typeof module !== 'undefined' && module.exports) {

    module.exports.resetview = resetview;

} else {

    window.resetview = resetview;

}
