var domain = require('./lib/jquery-3.2.1.min.js');
var $ = require('./lib/jquery-3.2.1.min.js');
var Vue = require('./lib/vue.js');
var axios  = require('./lib/axios.min.js');

var headerview = require('./components/header.js');
var footerview = require('./components/footer.js');
var chartview = require('./components/chartview.js');
var modaltip = require('./components/modaltip.js');
var pageBus = require('./common/bus.js');

var app = new Vue({
    el: '#pageHome',
    data: {

    },
    components: {
        chartview:chartview,
        modaltip:modaltip,
        footerview:footerview,
        headerview:headerview,

    },
    created:function(){},
    mounted:function () {
        this.init();
    },
    methods: {
        init(){
            var self = this;
            console.log("$$$")

        },
        sliderPart(index){
            $('.slider-part').slideToggle(700);
        },
        showbox(){
            $('.modal-out').addClass('show-box')
        },
    }
})
