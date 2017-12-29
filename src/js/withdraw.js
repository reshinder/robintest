import $ from './lib/jquery-3.2.1.min.js';
import Vue from './lib/vue.js';
import axios  from './lib/axios.min.js';
import pageBus from './common/bus';
import headerview from './components/header.js';
import footerview from './components/footer.js';
import trade_panel from './components/trade_panel.js';
import withdraw_view from './components/withdraw_view.js';
import assetsmodal from './components/assetsmodal.js';

var app = new Vue({
    el: '#pageHome',
    data: {
        headerview: 'headerview',
        footerview: 'footerview'
    },
    components: {
        assetsmodal: assetsmodal,
        footerview: footerview,
        headerview: headerview,
        trade_panel: trade_panel,
        withdraw_view:withdraw_view
    },
    created: function () {
    },
    mounted: function () {
        this.init();
    },
    methods: {
        init(){
            let self = this;

        }

    }
});
