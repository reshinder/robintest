import pageBus from '../common/bus'
import $ from '../lib/jquery-3.2.1.min';
import Vue from '../lib/vue.js';


let template= require('./logincheck.html');
let logincheck = {
    template: template,
    props : ['childMsg'],
    data: function() {
        return {
            nowTab:1,//0:2FA 1:sms-authen:
            smsTab:0,//1:p-get SMS 2:
        }
    },
    methods: {
        init: function () {
            this.nowTab = this.childMsg
        },
        eve: function () {
            pageBus.$emit('change', 'accounttip');
        },
        submitAction(index){
            this.nowTab = index
        },
        smsAction(index){
            this.smsTab = index
        }
    },
    created: function() {

    },
    mounted: function() {
        this.init()
    }
};

export default logincheck
