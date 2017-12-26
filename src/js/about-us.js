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
        footerview: footerview,
        headerview: headerview
    },
    created: function () {
    },
    mounted: function () {
        $('.about_slide_list').eq(0).show();

        $('html body').click(function(){
            $('#about_head_tab').slideUp(100);
        });
    },
    methods: {
        showHideUl(e){
            $(e.target).parents('.banner_switch').find('ul').slideToggle(100);
            $(e.target).parents('.banner_switch').find('i').toggleClass('down');
        },

        term_switch(e){
            var index=$(e.target).index();
            $(e.target).addClass('active').siblings().removeClass('active');
            $('.about_slide_list').eq(index).show().siblings().hide();
        }
    }
});
