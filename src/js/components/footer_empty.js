var Vue = require('../lib/vue.js');
var pageBus = require('../common/bus.js');
var template= require('./footer_empty.html');


var footerview = {
    template: template,
    data: function() {
        return {}
    },
    methods: {
        init:function(){
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

        return footerview;

    });

} else if (typeof module !== 'undefined' && module.exports) {

    module.exports.chartview = footerview;

} else {

    window.chartview = footerview;

}
