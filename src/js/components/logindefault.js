import $ from '../lib/jquery-3.2.1.min';
import Axios from '../common/axios_default';
import pageBus from '../common/bus'

import Vue from '../lib/vue.js';



let template= require('./logindefault.html');
let logindefault = {
    template: template,
    data: function() {
        return {
            bVerification:1
        }
    },
    methods: {
        init:function(){
            this.binEvent();

        },
        ame:function(){},
        eve:function(){
            pageBus.$emit('change','accounttip');
        },

        remoteAction: function (arg) {
            var self = this;
            var paraObj = {
                email:arg['email'],
                password:arg['password'],
            };
            Axios.get('/user_account.act?cmd=login?',{params:paraObj})
                .then(function (response) {
                    var cuData =  response.data;
                    

                })
                .catch(function (error) {
                    //self.$emit('logincheck',{main:'logincheck',sub:0})
                });
        },
        checkForm(ele){
            var $_this = $(ele),
                id = $_this.attr('id'),
                $_label = $('#' + id + '-tip'),
                val = $.trim($_this.val()).replace('\n', '').replace('\t', '').replace('\\n', '').replace('\\t', ''),
                tip = $_this.attr('data-emptytip'),
                tipError = $_this.attr('data-errortip'),
                check = true;
            $_this.val(val);
            if (!!$_this.attr('data-required') && $_this.attr('data-required') === 'required' && val === '') {
                $_label.html(tip);
                check = false;
            }else if((!$_this.attr('data-required') || $_this.attr('data-required') === '')){
                if(val === ''){
                    check = true;
                }else if($_this.attr('pattern')&& !(new RegExp($_this.attr('pattern')).test(val))){
                    check = false;
                }
            }else if (!!$_this.attr('data-required') && $_this.attr('data-required') === 'required'&&$_this.attr('pattern') && !(new RegExp($_this.attr('pattern')).test(val))){
                $_label.html(tipError);
                check = false;
            }
            if (check) {
                $_label.html('');
            }
            return check;
        },
        loginAction(){
            var self=this,email = $('#email'),password = $('#password'),tem = {}, check = true;
            $('#loginForm input').each(function(a, b) {
                if (!self.checkForm(b)) {
                    check = false;
                }
            });
            if(!check){
                return false;
            }
            /*合适则发请求*/
            tem['email'] = email.val().trim();
            tem['password'] = password.val().trim();
            self.remoteAction(tem)
        },
        binEvent(){
            var self =this;
            $('#loginForm input').blur(function() {
                self.checkForm(this);
            });
        },
    },
    created: function() {

    },
    mounted: function() {
        this.init()
    }
};

export default logindefault
