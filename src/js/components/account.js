import Axios from '../common/axios_default';
import pageBus from '../common/bus'
import $ from '../lib/jquery-3.2.1.min';
import Vue from '../lib/vue.js';

let account = {
    template: `<div class="account-out">
    <div class="tab-unit">
        <h2>Account</h2>
        <p>Email: {{email}}</p>
    </div>
    <div class="tab-unit" v-if="securityAuthentication==0">
        <h2>Verification</h2>
        <p class="small">Verification is required for USD deposit withdrawal.</p>
        <p class="small swallow-grey">Trading, deposit, and withdrawal functionalities are banned for U.s individual customers</p>
        <p class="href-p">
            <a href="">Verify now</a>
        </p>
    </div>
    <div class="tab-unit" v-if="securityAuthentication==0">
        <h2>Security</h2>
        <div class="level-out">
            <span class="fc">security level:</span>
            <span></span>
        </div>
        <table>
            <tr>
                <td>password</td>
                <td>********</td>
                <td class="bc pl50 cup" @click.prevent.stop="eve()">change</td>
            </tr>
            <tr>
                <td>2FA<span class="fc">(Google Authentication)</span></td>
                <td>Disabled</td>
                <td class="bc pl50 cup" @click.prevent.stop="eve()">Enabled</td>
            </tr>
           <tr>
                <td>SMA<span class="fc">(Phone Authentication)</span></td>
                <td>Unbind</td>
                <td class="bc pl50 cup" @click.prevent.stop="eve()">Bind</td>
            </tr>
        </table>
        <p class="small swallow-green"><span class="why"></span>2FA and SMS only need to complete a certification</p>
    </div>
    
    <div class="tab-unit" v-if="securityAuthentication!=0">
        <h2>Basic Verification</h2>
        <div class="level-out vp">
            <span class="fc">verification passed</span>
            <span></span>
        </div>
        <table>
            <tr>
                <td>Name: {{name}}</td>
                <td>Nationality: {{nationality}}</td>
            </tr>
            <tr>
                <td>Passport ID: {{cardNumber}}</td>
                <td> </td>
            </tr>
        </table>

    </div>
    <div class="tab-unit" v-if="securityAuthentication!=0">
        <h2>Security</h2>
        <div class="level-out">
            <span class="fc">security level:</span>
            <span></span>
        </div>
        <table>
            <tr>
                <td>password</td>
                <td>********</td>
                <td class="bc pl50 cup" @click.prevent.stop="changePassword()">change</td>
            </tr>
             <tr v-if="securityAuthentication==1">
                <td>SMA<span class="fc">(Phone Authentication)</span></td>
                <td v-if="phoneHasBind">Bind</td>
                <td v-else>Unbind</td>
                <td class="bc pl50 cup" @click.prevent.stop="toBindSMS()" v-if="!phoneHasBind">Bind</td>
                <td class="bc pl50 cup" @click.prevent.stop="eve(0)" v-else>Unbind</td>
            </tr>
             <tr v-if="securityAuthentication==2">
                <td>2FA<span class="fc">(Google Authentication)</span></td>
                <td v-if="googleHasBind">Enabled</td>
                <td v-else>Disable</td>
                <td class="bc pl50 cup" @click.prevent.stop="eve(1)" v-if="googleHasBind">Disable</td>
                <td class="bc pl50 cup" @click.prevent.stop="eve(3)" v-else>Enabled</td>
            </tr>
        </table>
        <p class="small swallow-green click-tip cup" @click.prevent.stop="eve(3)">Want to change Authentication method? Click me~</p>
    </div>
</div>`,
    props : ['sub'],
    data: function() {
        return {
           //  status:1,//1:基本信息，未认证 2：已经认证，
            email:"",
            name:"",
            nationality:"",
            cardNumber:"",
            verificationMode:0, //身份认证方式: 0无，1身份证，2护照
            securityAuthentication:1,//安全认证:0未设置，1手机，2谷歌,
            phoneHasBind:1,
            googleHasBind:1,
        }
    },
    methods: {
        init:function(){
            this.getBaseInfo();
            this.getVerificationInfo();
            this.getSecurityInfo();
        },
        eve:function(index){
            pageBus.$emit('change',index);
        },
        changePassword(){
             location.href= "register.html?main=2&sub=0"
        },
        getBaseInfo() {
            var self = this;
            var paraObj = {
                identifier:"",
            };

            //拦截设置,模拟请求在error完成交互
            Axios.interceptors.response.use(function (response){
                return response;
            }, function (error){
                //成功
                let testSuccess1 = {
                    "data":{
                        "success":true,
                        "data":{
                            "userId":"5556",
                            "email":"test@test.com",
                        }
                    }
                };
                //失败
                let testSuccess2 = {
                    "data":{
                        "success":false,
                        "code":"US707", //错误码
                        "message":"错误信息"
                    }
                };
                return Promise.reject(testSuccess1);
            });
            Axios.get('/user_account?cmd=getUserBaseInfo&',{params:paraObj})
                .then(function (response) {
                    let cuData =  response.data;
                })
                .catch(function (response) {
                    let cuData = response.data;
                    if(cuData.success){ //成功
                         self.email = cuData.data.email;
                    }else{ //失败

                    }

                });
        },
        getVerificationInfo() {
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
                        "data":{
                            "familyName":"姓氏",
                            "givenName":"名字",
                            "nationality":"国籍",
                            "verificationMode":0, //身份认证方式: 0无，1身份证，2护照
                            "verificationStatus":1, //身份认证状态:0未设置，1正在审核，2认证通过，3审核不通过, // (当身份认证状态为0和3时，显示全部身份认证全部信息；剩余仅显示姓名、国籍、证件号)
                            "cardNumber":1111,//"证件号（前后两位为数字，其它为*号）",
                            "cardIssueCountry":"发卡国家",
                            "cardExpirationDate":"证件有效期",
                            "hasCardPhoto1":"有无证件照片1:0无，1有",
                            "hasCardPhoto2":"有无证件照片2:0无，1有",
                            "hasSelfieWithCardAndNote":"有无证件和笔记自拍照:0无，1有",
                            "failReason":"失败原因"
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
            Axios.get('/user_account?cmd=getUserVerificationInfo&',{params:paraObj})
                .then(function (response) {
                    let cuData =  response.data;
                })
                .catch(function (response) {
                    let cuData = response.data;
                    if(cuData.success){ //成功
                        self.name = cuData.data.givenName+""+cuData.data.familyName;
                        self.nationality = cuData.data.nationality;
                        self.cardNumber = cuData.data.cardNumber;

                    }else{ //失败

                    }

                });
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
                            "securityAuthentication": 2//  安全认证:0未设置，1手机，2谷歌
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
            Axios.get('/user_account?cmd=getUserSafeInfo&',{params:paraObj})
                .then(function (response) {
                    let cuData =  response.data;
                })
                .catch(function (response) {
                    let cuData = response.data;
                    if(cuData.success){ //成功
                       self.securityAuthentication = cuData.data.securityAuthentication;

                    }else{ //失败

                    }

                });
        },
    },
    created: function() {

    },
    mounted: function() {
        this.init()
    }
};

export default account