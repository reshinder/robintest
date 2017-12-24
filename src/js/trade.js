import $ from './lib/jquery-3.2.1.min.js';
import Vue from './lib/vue.js';
import axios  from './lib/axios.min.js';
import pageBus from './common/bus';
import headerview from './components/header.js';
import footerview from './components/footer.js';
import modaltip from './components/modaltip.js';
import sidebarview from './components/sidebar.js';
import chartview from './components/chartview.js';

var app = new Vue({
    el: '#pageHome',
    data: {
        headerview: 'headerview',
        footerview: 'footerview'

    },
    components: {
        chartview: chartview,
        modaltip: modaltip,
        footerview: footerview,
        headerview: headerview,
        sidebarview: sidebarview
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
        eve: function () {
            pageBus.$emit('change', 'accounttip');
        },
        sliderPart(index){
            $(".slider-part").slideToggle(800);
        },

        //下拉框
        selectType(e){
            $(e.currentTarget).find('ul').slideDown(100);
        },

        //选中
        chooseLi(e){
            $(e.target).parent().slideUp(100);
        }

    }
});
