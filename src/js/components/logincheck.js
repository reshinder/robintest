import Axios from '../common/axios_default';
import pageBus from '../common/bus'
import $ from '../lib/jquery-3.2.1.min';
import Vue from '../lib/vue.js';

let logincheck = {
    template: `<div class="row content-out" >
    <div class="unit sms-authen" v-if="nowTab==1">
        <h1>SMS Authentication</h1>
        <div class="input-out">
            <input type="text" id="smscode" value="" v-model="smscode" placeholder="Enter your SMS authentication token" />
            <span class="s-btn"  @click.prevnt.stop="smsAction">Get SMS Code</span>
            <div class="bottom-line" :class="this.smserror==1?'to-red':''"></div>
            <transition name="error-tip" v-if="smserror==1">
            <p class="tip-p" v-if="smsempty==1">Please enter your SMS Code.</p>
            <p class="tip-p" v-if="smsverror==1">Please enter the correct SMS Code</p>
            </transition>  
        </div>
        <div class="button-out">
            <button type="button" @click.prevnt.stop="submitAction(1)">Submit</button>
        </div>
    </div>
    <div class="unit tfabox" v-if="nowTab==2">
        <h1>2FA</h1>
        <div class="input-out">
            <input type="text" id="tfacode" value="" v-model="tfacode" placeholder="Enter your Google 2FA Token" />
            <div class="bottom-line" :class="this.tfaerror==1?'to-red':''"></div>
            <transition name="error-tip" v-if="tfaerror==1">
                 <p class="tip-p" v-if="tfaempty==1">Please enter your 2FA code.</p>
                 <p class="tip-p" v-if="tfaverror==1">Please enter a valid 2FA code.</p>
           </transition>
        </div>
        <div class="button-out">
            <button type="button" @click.prevnt.stop="submitAction(2)">Submit</button>
        </div>
    </div>
    <div class="unit resetwordtip" v-if="nowTab==3">
        <h1>Congratulations!</h1>
        <p>Your password has been reset successfully.You can log in again with your new password.</p>
        <p class="click-tip" @click.stop.prevent="toLogin">Log in now <span class="long-arrow"></span></p>
    </div>
</div>`,
    props : ['sub','isfromreset'],
    data: function() {
        return {
            isFromRest:0,
            tfacode:"",
            smscode:"",
            nowTab:1,// 1.sms-authen: 2: 2FA
            smsTab:0,//sms验证状态：0，默认 1，倒计时中，2：1:resend状态,
            tfaerror:0,
            tfaempty:0,
            tfaverror:0,
            smserror:0,
            smsempty:0,
            smsverror:0,

        }
    },
    methods: {
        init: function () {
            this.nowTab = this.sub;
            console.log(this.nowTab)
        },
        eve: function () {
            pageBus.$emit('change', 'accounttip');
        },
        toLogin(){
            this.$emit('logincheck',{main:2,sub:0})
        },
        submitAction(index){
            if(index==1){
                if($('#smscode').val().trim()==""){
                    this.smserror = 1;
                    this.smsverror = 1;
                    return ;
                }
            }else{
                if($('#tfacode').val().trim()==""){
                    this.tfaerror = 1;
                    this.tfaverror = 1;
                    return ;
                }

            }
            this.sendSMSCode(index);

        },
        getSMSCode(arg) {
              var self = this;
              var paraObj = {
              identifier:""
              };
             //拦截设置,模拟请求在error完成交互
                  Axios.interceptors.response.use(function (response){
                 return response;
             }, function (error){
        //手机验证成功
        let testSuccess1 = {
            "data":{
               "success":true,
               "data":null
            }
        };
        //手机验证失败
        let testSuccess2 = {
            "data":{
                "success":false,
                "code":"US707", //错误码
                "message":"错误信息"
            }
        };

        return Promise.reject(testSuccess1);
    });
      Axios.get('/user_security.act?cmd=securityAuthenticateSendSMS&',{params:paraObj})
        .then(function (response) {
            let cuData =  response.data;

        })
        .catch(function (response) {
            let cuData = response.data;
            console.log(cuData)
            if(cuData.success){ //成功

            }else{ //失败

            }

        });
},
        sendSMSCode(arg) {
            var self = this;
            var paraObj = {
                identifier:"",
            };

            //拦截设置,模拟请求在error完成交互
            Axios.interceptors.response.use(function (response){
                return response;
            }, function (error){
                //手机或GL验证成功
                let testSuccess1 = {
                    "data":{
                        "success":true,
                        "data":null
                    }
                };
                //手机或GL验证失败
                let testSuccess2 = {
                    "data":{
                        "success":false,
                        "code":"US707", //错误码
                        "message":"错误信息"
                    }
                };
                return Promise.reject(testSuccess1);
            });
            Axios.get('/user_account.act?cmd=getBackPasswordSendEmail&',{params:paraObj})
                .then(function (response) {
                    let cuData =  response.data;
                })
                .catch(function (response) {
                    let cuData = response.data;
                    console.log(cuData)
                    if(cuData.success){ //成功
                        if(self.isfromreset){ //reset 跳转的成功后提示重置成功
                            self.nowTab = 3;
                        }else{
                            location.href="trade.html"
                        }

                    }else{ //失败

                    }

                });
        },
        smsAction(index){
            var self= this, countSecond = function (){
                var obt = $(".s-btn");
                obt.html("60s");
                self.second = 60;
                self.smsTab =1;
                self.timers = setInterval(function() {
                    self.second--;
                    obt.html(self.second+"s");
                    if(self.second <= 0){
                        self.smsTab =2;
                        obt.html("Resend");
                        clearInterval(self.timers);
                        self.timers = null;
                    }
                }, 1000);
            };
            if(self.smsTab ==0){
                countSecond();
                this.getSMSCode();

            }else if(self.smsTab==2){
                countSecond();
                this.getSMSCode();
            }

        }
    },
    created: function() {

    },
    mounted: function() {
        this.init()
    }
};

export default logincheck
