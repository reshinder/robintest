import $ from '../lib/jquery-3.2.1.min.js';
import Vue from '../lib/vue.js';
import pageBus from '../common/bus.js';

let template= require('./header.html');


let headerview = {
    template: template,
    data: function() {
        return {
            open:false
        }
    },
    methods: {
        init(){

        },
        mainMenu(index){
            $('.nav-all-out').slideToggle(1000)
        },
        mousehandler(arg,e){

        }

    },
    created() {
        this.init()
    },

    mounted() {

    }
};

export default headerview;
