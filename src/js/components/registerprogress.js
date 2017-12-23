import pageBus from '../common/bus'
import $ from '../lib/jquery-3.2.1.min';
import Vue from '../lib/vue.js';


let template= require('./registerprogress.html');
let logincheck = {
    template: template,
    props : ['childMsg'],
    data: function() {
        return {
            nowTab:3,//0:重置表单 1:重置提示  2:重置成功: 3:注册成功 4:失效提示 5:邮件发送提示, 6.注册成功邮箱确认提示页
        }
    },
    methods: {
        init:function(){},
        ame:function(){},
        eve:function(){
            pageBus.$emit('change','accounttip');
        },
        toLogin(){
            location.href='login.html'
        }
    },
    created: function() {
        var self =this;


    },
    mounted: function() {
        var self = this;
        this.nowTab = this.childMsg;

    }
};

export default logincheck
