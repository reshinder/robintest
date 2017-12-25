import pageBus from '../common/bus'

import $ from '../lib/jquery-3.2.1.min';
import Vue from '../lib/vue.js';


let template= require('./security.html');
let security = {
    template: template,
    data: function() {
        return {
            currentView:'tfasuccess',
            showSms:false
        }
    },
    methods: {
        init:function(){},
        eve:function(arg){
            pageBus.$emit('change',arg);
        },
    },
    created: function() {

    },
    mounted: function() {
        this.init()
    }
};

export default security