import $ from './lib/jquery-3.2.1.min.js';
import Vue from './lib/vue.js';
import axios  from './lib/axios.min.js';
import pageBus from './common/bus';
import headerview from './components/header.js';
import footerview from './components/footer.js';

var app = new Vue({
    el: '#pageHome',
    data: {
        headerview: 'headerview',
        footerview: 'footerview'

    },
    components: {
        footerview:footerview,
        headerview:headerview
    },
    created:function(){},
    mounted:function () {

    },
    methods: {
        showDetail(e){
            if($(e.target)[0].tagName == "H4"){
                $(e.target).parent().find('.about_list_det').slideToggle();
            }
        }
    }
});
