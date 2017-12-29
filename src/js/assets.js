import $ from './lib/jquery-3.2.1.min.js';
import Vue from './lib/vue.js';
import axios  from './lib/axios.min.js';
import pageBus from './common/bus';
import headerview from './components/header.js';
import footerview from './components/footer.js';
import trade_panel from './components/trade_panel.js';
import assets_view from './components/assets_view.js';


var app = new Vue({
    el: '#pageHome',
    data: {
        headerview: 'headerview',
        footerview: 'footerview'
    },
    components: {
        footerview: footerview,
        headerview: headerview,
        trade_panel: trade_panel,
        assets_view:assets_view
    },
    created: function () {
    },
    mounted: function () {
        this.init();
    },
    methods: {
        init(){
            let self = this;
        },

    }
});
