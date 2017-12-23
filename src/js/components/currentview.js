var $ = require('../lib/jquery-3.2.1.min.js');
var Vue = require('../lib/vue.js');
var pageBus = require('../common/bus.js');
var template= require('./currentview.html');
var loginview= require('./loginview.js');
var reset= require('./reset.js');

var currentview = {
    template: template,
    data: function() {
        return {
            currentView: 'loginview'
        }
    },
    components: {
        reset: reset,
        loginview:loginview
    },
    methods: {
        init:function(){

        },
        toggleTabs (tabName) {
            alert(1);
            this.currentView = tabName;
        },
        showbox(){
            $('.modal-out').addClass('show-box')
        },
    },

    created: function() {},

    mounted: function() {
        this.init()
    }
}

if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

    define(function() {

        return currentview;

    });

} else if (typeof module !== 'undefined' && module.exports) {

    module.exports.currentview = currentview;

} else {

    window.currentview = currentview;

}
