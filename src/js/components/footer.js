import $ from '../lib/jquery-3.2.1.min.js';
import Vue from '../lib/vue.js';
import pageBus from '../common/bus.js';

let template= require('./footer.html');

let footerview = {
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
};

export default footerview;