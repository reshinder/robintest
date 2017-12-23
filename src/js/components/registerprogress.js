import Axios  from '../common/axios_default'
import pageBus from '../common/bus'
import $ from '../lib/jquery-3.2.1.min';
import Vue from '../lib/vue.js';


let template= require('./registerprogress.html');
let logincheck = {
    template: template,
    props : ['childMsg'],
    data: function() {
        return {
            haschosen:false,
            nowTab:3,//0:发邮件表单 1:重置提示  2:重置成功: 3:注册成功 4:失效提示 5:邮件发送提示, 6.注册成功邮箱确认提示页
            emailerror:0,
            emailempty:0,
            emailverror:0,

            passworderror:0,
            passempty:0,
            passverror:0,
            confirmworderror:0,
        }
    },
    methods: {
        init:function(){},
        ame:function(){},
        eve:function(){
            pageBus.$emit('change','accounttip');
        },
        toSendEmail(){
            var self=this,email = $('#email'),tem = {},check = true;
            var regEmail =/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/g,regPass=/(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8}$/g;
            this.emailerror=0;
            this.emailempty=0;
            this.emailverror=0;
            if(email.val().trim()==""){
                this.emailerror = 1;
                this.emailempty = 1;
                check = false;
            }else{
                if(!regEmail.test(email.val().trim())){
                    this.emailerror = 1;
                    this.emailverror = 1;
                    check = false;
                }
            }

            if(check== true){
                tem['email'] = email.val().trim();
                self.sendEmailAction(tem)
            }
        },
        toResetAction(){
            var self=this,confirmword = $('#confirmword'),password = $('#password'),tem = {}, check1 = true, check2= true, check = false;
            var regPass=/(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8}$/g;
            this.passworderror=0;
            this.passempty=0;
            this.passverror=0;
            this.confirmworderror=0;
            if(password.val().trim()==""){
                this.passworderror = 1;
                this.passempty = 1;
                check1 = false;
            }else{
                if(!regPass.test(password.val().trim())){
                    this.passerror = 1;
                    this.passverror = 1;
                    check1 = false;
                }
            }
            if(password.val().trim()!=confirmword.val().trim()!=""){
                    check2 = false;
                   this.confirmworderror=1;
            }

            if(check1 == true&&check2 == true){
                tem['password'] = password.val().trim();
                self.remoteAction(tem)
            }
        },
        remoteAction: function (arg) {
            var self = this;
            var paraObj = {
                newPassword:arg['password']
            };
            //拦截设置,模拟请求在error完成交互
            Axios.interceptors.response.use(function (response){
                return response;
            }, function (error){
                //已经设置，要进入验证页面
                let testSuccess1 = {
                    "data":{
                        "success":true,
                        "data":{
                            "data":{
                                "execute":false,
                                "mode":"",
                                "securityAuthentication":2,//1短信，2谷歌
                                "identifier":"aaa"
                            }
                        }
                    }
                };
                //成功，不需验证
                let testSuccess2 = {
                    "data":{
                        "success":true,
                        "data":{
                            "execute":true
                        }
                    }
                };
                return Promise.reject(testSuccess1);
            });
            Axios.get('/user_account.act?cmd=resetPassword&',{params:paraObj})
                .then(function (response) {
                    let cuData =  response.data;

                })
                .catch(function (response) {
                    let cuData = response.data;
                    console.log(cuData)
                    if(cuData.success&&!cuData.data.execute){ //已经设置，进入验证页面
                        location.href='login.html?main=2&sub=0&reset=1'
                    }else{ //未设置，成功提示
                        self.nowTab = 3

                    }

                });
        },
        sendEmailAction(arg){
            var self = this;
            var paraObj = {
                email:arg['email']
            };
            Axios.get('/user_account.act?cmd=getBackPasswordSendEmail&',{params:paraObj})
                .then(function (response) {
                    var cuData =  response.data;
                })
                .catch(function (error) {
                    console.info(error)
                    self.nowTab = 1
                });
        },
        toLogin(){
            location.href='login.html';
        },
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
