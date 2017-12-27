import Vue from '../lib/vue.js';
import Axios from '../common/axios_default';
import pageBus from '../common/bus'
import $ from '../lib/jquery-3.2.1.min';


let template= require('./security.html');
let security = {
    template: template,
    props:['subMsg'],
    data: function() {
        return {
            needRemote:true,
            securityAuthentication:0,//安全认证:0未设置，1手机，2谷歌2fa,
            smsTab:0,
            smsclicked:false, //选择sms
            tfaclicked:false, //选择2fa
            //验证用途
            tlc:false, //2fa login
            tpc:false, //2fa 密码修改
            tsc:false, //2fa 敏感设置

            slc:true, //手机 login
            spc:false, //手机  密码修改
            ssc:false, //手机  敏感设置

            tokencode:"",
            tokenerror:0,
            tokenempty:0,
            tokenverror:0,

            locationerror:0,
            locationempty:0,
            locationverror:0,
            smserror:0,
            smsempty:0,
            smsverror:0,
            telerror:0,
            telempty:0,
            telverror:0,


        }
    },
    methods: {
        init:function(){
            if(this.needRemote){
                this.getSecurityInfo();
            }

        },
        eve:function(arg){
            pageBus.$emit('change',arg);
        },
        getSecurityInfo() {
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
                    "data": {
                        "success": true,
                        "data": {
                            "areaCode": "区号",
                            "phone": "手机号（前后两位为数字，其它为*号）",
                            "securityAuthentication":1//  安全认证:0未设置，1手机，2谷歌
                        }
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
            Axios.get('/user_account.act?cmd=getUserSafeInfo&',{params:paraObj})
                .then(function (response) {
                    let cuData = response.data;
                    if(cuData.success){ //成功
                           self.securityAuthentication = cuData.data.securityAuthentication;
                    }else{ //失败

                    }
                })
                .catch(function (response) {
                       console.error(response)
                });
        },
        smsBindRemote(){
             let phone = $('#tel').val().trim(),location = $('#location').val().trim(),code = $('#code').val().trim(),
                 regTel=/\d{6,}/g, check1=true,check2=true,check3=true;
                this.locationerror=0;
                this.locationempty=0;
                this.locationverror=0;

                this.telerror=0;
                this.telempty=0;
                this.telverror=0;

                this.smserror=0;
                this.smsempty=0;
                this.smsverror=0;
                 if(location==""){
                     this.locationerror=1;
                     this.locationempty=1;
                     check1 = false;
                 }
                 if(phone==""){
                     this.telerror=1;
                     this.telempty=1;
                     check2 = false;
                 }else if(!regTel.test(phone)){
                     this.telerror=1;
                     this.telverror=1;
                     check2 = false;
                 }
                 if(code==""){
                     this.smserror=1;
                     this.smsempty=1;
                     check3 = false;
                 }else if(0){
                     this.smserror=1;
                     this.smsverror=1;
                     check3 = false;
                 }

                 if(check1&&check2&&check3){
                      this.sendCode()
                 }


        },
        sendCode(){
            var self =this;
            if(1){ //sccuss
                self.securityAuthentication = 1
                self.slc = true
                self.spc = true
                self.ssc = true
            }else{

            }
        },
        getSMSCode(arg) {
            var self = this,paraObj ={}, smsGetAPI = "";

            if(self.nowTab ==1){
                paraObj.smsCaptcha = "";
            }else{
                paraObj.googleCaptcha = "";
            }

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
            var self = this,paraObj ={};
            paraObj.smsCaptcha = "";
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
        getCode(e,index){
            var self= this, countSecond = function (){
                var obt = $(e.target);
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
            }else if(self.smsTab==1){
                this.sendSMSCode();
            }
        },
        unBindGLAction(){
            this.tokenerror = 0;
            this.tokenempty = 0;
            this.tokenverror = 0;
            if($('#tokencode').val().trim()==""){
                this.tokenerror = 1;
                this.tokenempty = 1;
                //this.tokenverror = 0;
                return ;
            }
            this.unBindGL();
        },
        unBindGL(){
            var self = this,paraObj ={};
            paraObj.googleCaptcha = this.tokencode;
            Axios.get('/user_security.act?cmd=unbindGoogleAuthenticate&',{params:paraObj})
                .then(function (response) {
                    let cuData = response.data;
                    let testData ={
                        "data":{
                            "success":true,
                            "data":null
                        }
                    };
                    cuData = testData;
                    console.log(cuData)
                    if(cuData.data.success){
                        self.securityAuthentication = 2
                        self.tlc = true
                        self.tpc = true
                        self.tsc = true
                    }else{ //失败

                    }
                })
                .catch(function (response) {});
        },
        changePassword(){
            location.href= "register.html?main=2&sub=0"
        },
    },
    created: function() {
          let self =this;
          console.log(this.subMsg)
          if(this.subMsg==1){
              this.needRemote = false;
              self.securityAuthentication=0;//安全认证:0未设置，1手机，2谷歌2fa,
              self.smsclicked=true;
              self.tfaclicked=false;
          }else if(this.subMsg==2){
              this.needRemote = false;
              self.securityAuthentication=0;//安全认证:0未设置，1手机，2谷歌2fa,
              self.smsclicked=false;
              self.tfaclicked=true;
          }


    },
    mounted: function() {
        this.init()

    }
};

export default security