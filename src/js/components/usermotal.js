import Axios from '../common/axios_default';
import pageBus from '../common/bus'
import $ from '../lib/jquery-3.2.1.min';

let template= require('./usermotal.html');
let usermotal = {
    template: template,
    data: function() {
        return {
            smscode:"",
            gltoken:"",
            tip:0,
            securityInfo:{},//手机验证存储信息
            showpart:0, // 1:accounttip 2.2facheck 3:changemethod 4:enabletfa, 5:deltip 6:更改设置提示；
            smsTab:0,
            timer:null,
            smserror:0,
            smsempty:0,
            smsverror:0,
            glerror:0,
            glempty:0,
            glverror:0
        }
    },
    methods: {
        init:function(){},
        closeTip(){
            this.tip=1;
            $('.modal-out').removeClass('show-box').addClass('hide-box')
        },

        ame:function(){
            if(this.tip==1){
                $('.modal-out').css('zIndex',-1)
            }
        },
        smsSubmit(){
            if(1){
               this.sendSMSCode();
            }
        },
        getSMSCode(arg) {
            var self = this;
            var paraObj = {
                areaCode:self.securityInfo.areaCode,
                phone:self.securityInfo.phone
            };
            Axios.get('/user_security.act?cmd=bindPhoneSendSMS&',{params:paraObj})
                .then(function (response) {
                    let cuData =  response.data;

                })
                .catch(function (response) {
                    let cuData = response.data;
                    if(cuData.success){ //成功
                    }else{ //失败

                    }

                });
        },
        sendSMSCode(arg) {
            var self = this,paraObj ={};
            paraObj.smsCaptcha = "";
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
        unBindAction(e){
            var self= this, countSecond = function (){
                var obt = $(e.target);
                obt.html("60s");
                self.second = 60;
                self.smsTab =1;
                self.timers = setInterval(function() {
                    self.second--;
                    obt.html(self.second+"s");
                    if(self.second <= 0){
                        self.smsTab =0;
                        obt.html("Resend");
                        clearInterval(self.timers);
                        self.timers = null;
                    }
                }, 1000);
            };
            if(self.smsTab ==0){
                countSecond();
                this.getSMSCode();
            }
        },
        unBindGLAction(){
            this.glerror = 0;
            this.glempty = 0;
            console.log(111)
            if($('#gltoken').val().trim()==""){
                this.glerror = 1;
                this.glempty = 1;
                return ;
            }
            this.unBindGL();
        },
        unBindGL(){
            var self = this,paraObj ={};
            paraObj.googleCaptcha = this.gltoken;
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
            Axios.get('/user_security.act?cmd=unbindGoogleAuthenticate&',{params:paraObj})
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

    },
    watch: {
        smsCode: function (val) {
            var self =this;
            if(String(val).length>6){
                self.smsTab =2;
                $("#getcode").html("Submit");
                clearInterval(self.timers);
                self.timers = null;
            }
        },

    },
    created: function() {

    },
    mounted: function() {
        var self =this;
        this.init();
        pageBus.$on('change', function (index, arg, type){
            self.tip = 0;
            self.showpart = index;
            console.log("*****")
            console.log(arg)
            if(type == "smsAuth"){
                this.securityInfo = arg;
            }
            $('.modal-out').css('zIndex',1).removeClass('hide-box').addClass('show-box')
        });

    }
};
export default usermotal


