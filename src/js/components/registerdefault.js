import pageBus from '../common/bus'
import axios from '../lib/axios.min'
import $ from '../lib/jquery-3.2.1.min';
import Vue from '../lib/vue.js';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8;';
axios.defaults.baseURL = 'http://106.14.210.142:8080';

const helpObj ={
    getQueryString:function(key){
        var t = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i"),
            n = window.location.search.substr(1).match(t),q,
            r = "";

        if(n){
            if(n[2].indexOf("?")>-1){
                r = n[2].split("?")[0];
            }else{
                q = unescape(n[2]).split("=");
                r = q[q.length-1];
            }
        }
        console.log(r);
        return r;
    }
};

let template= require('./registerdefault.html');
let registerdefault = {
    template: template,
    data: function() {
        return {
            bVerification:1,
            haschosen:false
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
            axios.get('/user_account.act?cmd=registerByEmail?',{params:paraObj})
                .then(function (response) {
                    var cuData =  response.data;
                    console.log(123)

                })
                .catch(function (error) {
                    console.log(456)
                    location.href='register.html?main=registerprogress&sub=4'
                    console.info(error)
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
        createAction(){
            var self=this,email = $('#email'),password = $('#password'),confirmword = $('#confirm'),tem = {}, check = true;
            $('#register input').each(function(a, b) {
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
            tem['confirmword'] = confirmword.val().trim();
            self.remoteAction(tem)
        },
        binEvent(){
            var self =this;
            $('#register input').blur(function() {
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

export default registerdefault
