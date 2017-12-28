import $ from './lib/jquery-3.2.1.min.js';
import Vue from './lib/vue.js';
import axios  from './lib/axios.min.js';
import pageBus from './common/bus';
import footerview from './components/footer.js';



var app = new Vue({
    el: '#pageHome',
    data: {
        footerview: 'footerview'
    },
    components: {
        footerview: footerview,
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
