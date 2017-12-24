import $ from '../lib/jquery-3.2.1.min';
import Axios from '../common/axios_default';
import pageBus from '../common/bus'

import Vue from '../lib/vue.js';

let logindefault = {
    template: `<div class="content-wrap row" >
    <div class="left-wrap col-lg-6 col-md-6 col-sm-6" >
        <p>SUPERBIT<br>SUPER LIFE</p>
    </div>
    <div class="right-wrap col-lg-6 col-md-6 col-sm-6">
        <div class="row  content-wrap">
            <h2>Log in</h2>
            <form id="loginForm">
                <div class="input-wrap">
                    <div class="input-wrap">
                        <input id="email" class="email"  type="email" name="email" value="" placeholder="Email address"  />
                         <div class="bottom-line" :class="this.emailerror==1?'to-red':''"></div>
                             <transition name="error-tip" v-if="emailerror==1&&emailempty==1">
                               <p class="tip-p">Please enter your Email address.</p>
                             </transition>
                                 <transition name="error-tip" v-if="emailerror==1&&emailverror==1"> 
                               <p class="tip-p">Please enter a valid Email address</p>
                             </transition>
                    </div>
                   <div class="input-wrap">
                        <input id="password" class="password"  type="password" name="password" placeholder="Password"  value="" />
                         <div class="bottom-line" :class="this.passerror==1?'to-red':''"></div>
                             <transition name="error-tip" v-if="passerror==1&&passempty==1">
                               <p class="tip-p">Please enter your Password.</p>
                              </transition>  
                              <transition name="error-tip" v-if="passerror==1&&passverror==1">
                               <p class="tip-p more-p">Passwords must be at least 8 characters with 1 capital letter, 1 lowercase character, and 1 number, and without spaces.</p>
                             </transition>  
                    </div>
                    <div class="input-forget">
                        <a  @click.prevnt.stop="toggleTabs">Forget password?</a>
                    </div>
                    <div class="btns-out">
                        <button type="button" class="active" @click.prevnt.stop="loginAction">Login in</button>
                    </div>
            </form>

        </div>
    </div>
</div>

`,
    data: function() {
        return {
            bVerification:1,
            emailerror:0,
            emailempty:0,
            emailverror:0,
            passerror:0,
            passempty:0,
            passverror:0,
        }
    },
    methods: {
        init:function(){},
        toggleTabs(){
            location.href='register.html?main=2&sub=0'
        },
        ame:function(){},
        eve:function(){
            pageBus.$emit('change','accounttip');
        },

        remoteAction: function (arg) {
            var self = this;
            var paraObj = {
                loginName:arg['email'],
                password:arg['password'],
            };
            //拦截设置,模拟请求在error完成交互
            Axios.interceptors.response.use(function (response){
                return response;
            }, function (error){
                //已经设置，进入验证页面
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
                //未设置，直接进入交易界面
                let testSuccess2 = {
                    "data":{
                        "success":true,
                        "data":{
                            "execute":true
                        }
                    }
                };
                //return Promise.reject(testSuccess1);
                return Promise.reject(error);
            });
            Axios.get('/user_account.act?cmd=login&',{params:paraObj})
                .then(function (response) {
                    let cuData = response.data;
                    if(cuData.success&&!cuData.data.execute){ //已经设置，进入验证页面
                        self.$emit('logincheck',{main:cuData.data.data.securityAuthentication})
                    }else{ //未设置，进入交易页
                        location.href = 'trade.html'
                    }
                })
                .catch(function (response) {
                     console.log(response)
                });
        },
        loginAction(){
            var self=this,email = $('#email'),password = $('#password'),tem = {}, check1 = true, check2= true, check = false;
            var regEmail =/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/g,regPass=/(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8}$/g;
            this.emailerror=0;
            this.emailempty=0;
            this.passerror=0;
            this.passempty=0;
            this.passverror=0;
            if(email.val().trim()==""){
                this.emailerror = 1;
                this.emailempty = 1;
                check1 = false;
            }else{
                if(!regEmail.test(email.val().trim())){
                    this.emailerror = 1;
                    this.emailverror = 1;
                    check1 = false;
                }
            }
            if(password.val().trim()==""){
                this.passerror = 1;
                this.passempty = 1;
                check2 = false;
            }else{
                if(!regPass.test(password.val().trim())){
                    this.passerror = 1;
                    this.passverror = 1;
                    check2 = false;
                }
            }
            if(check1 == true&&check2 == true){
                tem['email'] = email.val().trim();
                tem['password'] = password.val().trim();
                self.remoteAction(tem)
            }
        }
    },
    created: function() {

    },
    mounted: function() {
        this.init()
    }
};

export default logindefault
