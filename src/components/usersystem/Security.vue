<template>
  <div class="security">
    <div class="security-sub sms-choose">
      <div class="unit authenmethod">
        <h2>Authentication Method</h2>
        <p class="choose-tip">Only need to choose one method:</p>
        <div class="input-out single-choose">
          <span class="radio" :class="{clicked:smsclicked}" @click.prevent.stop="smsclicked=!smsclicked;tfaclicked=false;"></span><span>SMS</span> <span>(Phone Authentication)</span>
        </div>
        <transition name="slide-fade" v-if="smsclicked==true">
          <div class="authenticatenow">
            <h5>Authenticate Now</h5>
            <div class="input-box">
              <label>Location</label>
              <div class="input-inner">
                <input type="text" id="location" value="china" placeholder="China" readonly="readonly" /><span class="choose">choose</span>
                <div class="bottom-line" :class="this.locationerror==1?'to-red':''"></div>
                <transition name="error-tip" v-if="locationerror==1">
                  <p class="tip-p" v-if="locationempty==1">Please choose a country</p>
                </transition>
              </div>
            </div>
            <div class="input-box">
              <label>Phone Number</label>
              <div class="input-inner">
                <span class="phone-num">+86</span><input id="tel" v-model="phone" type="tel" placeholder="phone number" />
                <div class="bottom-line" :class="this.telerror==1?'to-red':''"></div>
                <transition name="error-tip" v-if="telerror==1">
                  <p class="tip-p" v-if="telempty==1">Please enter your phone number.</p>
                  <p class="tip-p" v-if="telverror==1">Please enter a valid number.</p>
                </transition>
              </div>
            </div>
            <div class="input-box">
              <label>SMS Code</label>
              <div class="input-inner">
                <input type="text" placeholder="code" v-model="phoneCode" id="code" /><span class="choose getc" @click.prevent.stop="getCode($event)">Get Code</span>
                <div class="bottom-line" :class="this.telerror==1?'to-red':''"></div>
                <transition name="error-tip" v-if="smserror==1">
                  <p class="tip-p" v-if="smsempty==1">Please enter your sms code.</p>
                  <p class="tip-p" v-if="smsverror==1">Wrong sms code.</p>
                </transition>
              </div>
            </div>
            <div class="button-out">
              <button type="button" @click="smsBindRemote">submit</button>
            </div>
          </div>
        </transition>

        <div class="input-out single-choose">
          <span class="radio" :class="{clicked:tfaclicked}" @click.prevent.stop="tfaclicked=!tfaclicked;smsclicked=false;"></span><span>2FA</span> <span class="">(Google Authentication)</span>
        </div>
        <transition name="slide-fade" v-if="tfaclicked==true">
          <div class="tfacontent">
            <p>Using Two-factor authentication is highly recommended.Please consider our avalable options for increasing the secrity of your account.
              We want to give you every opportunity to be confident that your account is secure.</p>
            <p class="table-p">If you enable mutiple 2FA methods,the below operation will be protected By 2FA instead of email confirmation</p>
            <table class="method-table">
              <tr>
                <td>Logins</td>
                <td>Withdrawal Confirmations</td>
              </tr>
              <tr>
                <td>Find your Password</td>
                <td>API Key Creation</td>
              </tr>
              <tr>
                <td>Security Settings</td>
                <td>Sensitive Account Setting Changes</td>
              </tr>
            </table>
            <div class="qr-code-out clear">
              <div class="qr">
                <h4>Authenticate Now</h4>
                <div class="qr-code"></div>
              </div>
              <div class="scan">
                <ul>
                  <li>1.Scan the QR Code</li>
                  <li>2.Enter the 2FA token below</li>
                </ul>
                <div class="input-out">
                  <div class="input-inner">
                    <input type="text" value="" id="tokencode" v-model="tokencode" placeholder="Enter your Token">
                    <div class="bottom-line" :class="this.tokenerror==1?'to-red':''"></div>
                    <transition name="error-tip" v-if="tokenerror==1&&tokenempty==1">
                      <p class="tip-p">Please enter the 2FA token.</p>
                    </transition>
                    <transition name="error-tip" v-if="tokenerror==1&&tokenverror==1">
                      <p class="tip-p">Please enter a valid 2FA token</p>
                    </transition>
                  </div>
                  <button type="submit" @click="unBindGLAction">Submit</button>
                </div>
              </div>
            </div>
            <p class="click-tip" @click.prevent.stop="eve(3)">How to Enable Google Authentication? click me~</p>
          </div>
        </transition>
      </div>
      <div class="unit password">
        <h2>Password</h2>
        <table class="table-set">
          <tr>
            <td>password</td>
            <td>********</td>
            <td class="bc pl50 cup" @click.prevent.stop="changePassword">change</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="security-sub tfasuccess">
      <div class="unit authenmethod">
        <h2>SMS Authentication</h2>
        <table class="tfa-table table-set">
          <tr>
            <td>Phone number</td>
            <td>{{areaCode}}{{phone}}</td>
            <td class="bc pl50 cup" @click.prevent.stop="eve(0)">Modify</td>
            <td class="bc pl50 cup" @click.prevent.stop="eve(0)">Unbind</td>
          </tr>
        </table>
      </div>
      <div class="unit setting-items">
        <h2>SMS Application Setting</h2>   <!--changeApplicationSet(item)-->
        <ul class="choose-ul">
          <li class="choose-out" v-for="(item,index) in securityAuthenticationList"><label :class="{chosen:item.status==1}" @click.prevent.stop="changeApplicationSet(item)"></label><span>{{item | filterName}}</span></li>
        </ul>
      </div>
      <div class="unit password">
        <h2>Password</h2>
        <table class="table-set">
          <tr>
            <td>password</td>
            <td>********</td>
            <td class="bc pl50 cup" @click.prevent.stop="changePassword">change</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="security-sub tfasuccess">
      <div class="unit authenmethod">
        <h2>Two-factor Authentication Method</h2>
        <table class="tfa-table table-set">
          <tr>
            <td>2FA <span class="grey">Goole Authentication</span></td>
            <td>Enabled</td>
            <td class="bc pl50 cup" @click.prevent.stop="eve(1)">Disable</td>
          </tr>
        </table>
      </div>
      <div class="unit setting-items">
        <h2>2FA Application Setting</h2>
        <ul class="choose-ul">
          <li class="choose-out"><label :class="{chosen:tlc}" @click="tlc=!tlc"></label><span>Login in</span></li>
          <li class="choose-out"><label :class="{chosen:tpc}" @click="tpc=!tpc"></label><span>Find your password</span></li>
          <li class="choose-out"><label :class="{chosen:tsc}" @click="tsc=!tsc"></label><span>Senstive setting changes</span></li>
        </ul>

      </div>
      <div class="unit password">
        <h2>Password</h2>
        <table class="table-set">
          <tr>
            <td>password</td>
            <td>********</td>
            <td class="bc pl50 cup" @click.prevent.stop="changePassword">change</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="security-sub tfa">
      <div class="unit authenmethod">
        <h2>Authentication Method</h2>
        <div class="input-out single-choose">
          <span class="radio"></span><span>2FA</span> <span class="">(Google Authentication)</span>
        </div>
        <p>Using Two-factor authentication is highly recommended.Please consider our avalable options for increasing the secrity of your account.
          We want to give you every opportunity to be confident that your account is secure.</p>
        <p class="table-p">If you enable mutiple 2FA methods,the below operation will be protected By 2FA instead of email confirmation</p>
        <table class="method-table table-set">
          <tr>
            <td>Logins</td>
            <td>Withdrawal Confirmations</td>
          </tr>
          <tr>
            <td>Find your Password</td>
            <td>API Key Creation</td>
          </tr>
          <tr>
            <td>Security Settings</td>
            <td>Sensitive Account Setting Changes</td>
          </tr>
        </table>
        <div class="qr-code-out clear">
          <div class="qr">
            <h4>Authenticate Now</h4>
            <div class="qr-code"></div>
          </div>
          <div class="scan">
            <ul>
              <li>1.Scan the QR Code</li>
              <li>2.Enter the 2FA token below</li>
            </ul>
            <div class="input-out">
              <input type="text" placeholder="Enter your Token"><button type="submit">Submit</button>
            </div>
          </div>
        </div>
        <p class="click-tip" @click.prevent.stop="eve(3)">How to Enable Google Authentication? click me~</p>
        <div class="input-out single-choose">
          <span class="radio"></span><span>SMS</span> <span class="">(Phone Authentication)</span>
        </div>
      </div>
      <div class="unit password">
        <h2>Password</h2>
        <table class="table-set">
          <tr>
            <td>password</td>
            <td>********</td>
            <td class="blue" @click.prevent.stop="eve('accounttip')">change</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Security',
    data () {
      return {
        securityAuthenticationList:[],
        areaCode:"86",
        phone:"",//手机号
        phoneCode:"",
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
        securityInfo:{}

      }
    },
    methods:{
      init:function(){
        if(this.needRemote){
          this.getSecurityInfo();
        }

      },
      eve:function(index,arg, type){
        pageBus.$emit('change',index, arg, type);
      },
      getSecurityInfo() {
        var self = this;
        var paraObj = {
          identifier:"",
        };
        Axios.get('/user_account.act?cmd=getUserSafeInfo&',{params:paraObj})
          .then(function (response) {
            let cuData = response.data;
            if(cuData.success){ //成功
              self.securityInfo = cuData.data;
              self.securityAuthentication = cuData.data.securityAuthentication;
              self.phone = cuData.data.phone;
            }else{ //失败

            }
            if(self.securityAuthentication!=0){
              self.getApplicationSetting();
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
          this.sendSMSCode()
        }


      },
      sendCode(){
        /* var self =this;
         if(1){
         self.securityAuthentication = 1;
         self.slc = true
         self.spc = true
         self.ssc = true
         }else{

         }*/
      },
      getSMSCode(arg) {
        var self = this;
        var paraObj = {
          areaCode:"86",
          phone:self.phone
        }
        console.log(self.phone)
        /*  if(self.nowTab ==1){
         paraObj.smsCaptcha = "";
         }else{
         paraObj.googleCaptcha = "";
         }*/
        Axios.get('/user_security.act?cmd=bindPhoneSendSMS&',{params:paraObj})
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
        paraObj['smsCaptcha'] = self.phoneCode;
        Axios.get('/user_security.act?cmd=bindPhone&',{params:paraObj})
          .then(function (response) {
            let cuData =  response.data;
            console.log(cuData)
            if(cuData.success){ //成功
              alert('You have successfully bound phone authentication!')
            }else{ //失败
              alert(cuData.message)
            }

          })
          .catch(function (response) {});
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
      changeApplicationSet(arg){
        var self = this, paraObj ={};
        if(arg.status){
          this.eve('0',self.securityInfo, "smsAuth")
        }
        paraObj = {
          operationName:arg.securityAuthenticationName,
          status:arg.status==1?0:1
        }
        Axios.get('/user_security.act?cmd=operationSecuritySet&',{params:paraObj})
          .then(function (response){
            let cuData =  response.data;
            if(cuData.success){
              if(!response.data.execute){

              }else{
                arg.status=arg.status==1?0:1
              }
            }else{
              alert(cuData.message)
            }
          })
          .catch(function (response) {});
      },
      getApplicationSetting(){
        var self = this;
        Axios.get('/user_security.act?cmd=getUserAuthenticationSecuritySet')
          .then(function (response) {
            let cuData =  response.data;
            if(cuData.success){
              self.securityAuthenticationList.push(cuData.data[0]);
              self.securityAuthenticationList.push(cuData.data[2]);
              self.securityAuthenticationList.push(cuData.data[5]);
            }


          })
          .catch(function (response) {});
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
    }
  }
</script>

<style rel="stylesheet/less" lang="less"  scoped>
  @import "../../assets/css/base.less";
  .app{
    background-color: @bgcolor;
  }
  .user-content{
    min-height: 700px;
    .table-set{
      border-collapse: collapse;
      border: none;
      tr{
        margin-bottom: 34px;
        opacity: 0.7;
        font-family: HelveticaNeue;
        font-size: 14px;
        line-height: 16px;
        color: #000000;
        td,th{
          text-align: left;
          height: 40px;
          line-height: 40px;
          overflow:hidden;
          white-space: nowrap;
          text-overflow:ellipsis;
          &:nth-child(1){width:250px}
          &:nth-child(2){width:160px}
          &:nth-child(3){width:95px}
          &:nth-child(4){width:95px}
        }
      }
    }
  }
  @media (max-width: 768px){
    .user-content{
      min-height: 100px;
      .table-set{
        table-layout:fixed;
        width: 100%;
        tr{
          td,th{
            text-align: center;
            &:nth-child(1){width:auto}
            &:nth-child(2){width:auto;}
            &:nth-child(3){width:auto;}
            &:nth-child(4){width:auto;}
          }
        }
      }
      td,th{
        word-wrap:break-word;
        word-break:break-all;
      }
    }

  }


  body,html{
    background-color: @bgcolor;
  }
  .content-wrap{
    margin-top: 20px;
    margin-bottom: 100px;
    .l-panel{
      float: left;
      width: 15%;
      margin-right: 20px;
      background-color: @white;
      >ul{
        margin-left: -15px;
        margin-right: -15px;
        li{
          height: 70px;
          line-height: 70px;
          text-align: center;
          opacity: 0.9;
          font-family: HelveticaNeue;
          font-size: 14px;
          color: #000000;
          &:last-child{
            border-bottom: 0;
          }
          &:hover{
            background: #6C94B0;;
            color: #fff;
            cursor: pointer;
          }
          &.active{
            color: #fff;
            background: #6C94B0;
          }
          &.report{
            ul{
              li{
                height: 50px;
                line-height: 50px;
                font-family: HelveticaNeue;
                font-size: 14px;
                color: #000000;
                letter-spacing: 0;
                background: #f7f8f9;
                &.active,&:hover{
                  border-left:3px solid #6c94b0;
                  color: #6c94b0;
                  background: #fff;
                }
                .arrow{
                  background: #fff;
                }
              }
            }
          }
        }
      }
    }
    .r-tab{
      float: left;
      position: relative;
      width: 83%;
      padding: 0;

    }
  }

  .security{
    .security-sub{
      .unit{
        margin-bottom: 10px;
        padding: 21px 40px;
        background: #fff;
        h2{
          opacity: 0.9;
          font-family: 'HelveticaNeue-Bold';
          font-size: 24px;
          color: #000000;
          letter-spacing: 0;
        }
        p{
          margin-bottom: 30px;
          font-family: HelveticaNeue;
          font-size: 14px;
          color: #363636;
          letter-spacing: 0;
          line-height: 24px;
          &.table-p{
            margin-bottom: 4px;
          }
          &.choose-tip{
            margin:36px 0 48px 0;
            opacity: 0.7;
            font-family: HelveticaNeue;
            font-size: 18px;
            color: #000000;
            letter-spacing: 0;
          }
        }
        .grey{
          color: #b2b2b2;
        }
        table{
          margin-bottom: 34px;
          /*     tr{
                 td{
                   padding: 2px 50px 2px 0;
                   opacity: 0.7;
                   font-family: HelveticaNeue;
                   font-size: 14px;
                   color: #000000;
                   letter-spacing: 0;
                   line-height: 24px;
                 }
               }*/
          &.method-table{
            tr{
              td{
                position: relative;
                padding-left: 16px;
                &:before{
                  content: "";
                  position: absolute;
                  width: 4px;
                  height: 4px;
                  border-radius: 2px;
                  background:#0d0d0d ;
                  left:2px;
                  top:50%;
                  transform: translate(-50%,-50%);
                }
              }
            }
          }
        }
        .single-choose{
          margin: 39px auto 31px;
          font-family: HelveticaNeue;
          font-size: 18px;
          color: #000000;
          letter-spacing: 0;
          line-height: 23px;
          span{
            display: inline-block;
            vertical-align: middle;
            &.radio{
              margin-right: 18px;
            }
          }
        }
        .qr-code-out{
          background: #ecf6fd;
          padding: 27px 40px 40px;
          .qr{
            float: left;
            width: 33%;
            h4{
              opacity: 0.9;
              font-family: HelveticaNeue-Medium;
              font-size: 14px;
              color: #000000;
              letter-spacing: 0;
            }
            .qr-code{
              margin-top: 36px;
              width: 110px;
              height: 110px;
              border: 1px solid blue;
            }
          }
          .scan{
            float: left;
            padding-top: 98px;
            width: 66%;
            ul{
              .clearfix();
              li{
                float: left;
                opacity: 0.7;
                font-family: HelveticaNeue;
                font-size: 14px;
                color: #000000;
                letter-spacing: 0;
                &:first-child{
                  margin-right: 70px;
                }
              }
            }
            .input-out{
              .clearfix();
              margin-top: 42px;
              .input-inner{
                position: relative;
                margin-right: 30px;
                float: left;
                height: 34px;
                width: 260px;
                line-height: 34px;
                .bottom-line{
                  position: absolute;
                  bottom: 0;
                  left: 50%;
                  height: 1px;
                  background: #5e5e5e;
                  width: 100%;
                  transform: translateX(-50%);
                  &.to-red{
                    background: #D94242;
                    animation:linec 700ms 1;
                    -webkit-animation:linec 700ms 1;
                    animation-fill-mode:forwards;
                    -webkit-animation-fill-mode:forwards;
                  }
                }
                .tip-p{
                  position: absolute;
                  bottom: -56px;
                  padding: 6px 14px;
                  opacity: 0.7;
                  font-family: HelveticaNeue;
                  font-size: 12px;
                  color: #D94242;;
                  letter-spacing: 0;
                  line-height: 14px;
                  &.more-p{
                    bottom:-44px;
                  }
                }

                input{
                  height: 34px;
                  width: 100%;
                  line-height: 34px;
                  padding: 0 15px;
                  border: 0;
                  background: transparent;
                }
              }


              button{
                float: left;
                height: 34px;
                line-height: 34px;
                width: 90px;
                text-align: center;
                color: #fff;
                background: @blue1;
                cursor: pointer;
              }
            }
          }
        }
        .click-tip{
          margin: 36px 0;
          font-family: HelveticaNeue;
          font-size: 14px;
          color: #4AABF0;
          letter-spacing: 0;
          cursor: pointer;
        }
        &.password{
          h2{
            margin-top:21px;
            margin-bottom:38px;
          }
          table{
            tr{
              td{
                padding-right: 80px;
              }
            }
          }
        }
        &.setting-items{
          >.choose-ul{
            margin-top: 40px;
            li{
              margin-bottom: 20px;
              label,span{
                display: inline-block;
                vertical-align: middle;
              }
              label{
                position: relative;
                margin-right: 10px;
                width: 18px;
                height: 18px;
                border: 1px solid #b8b844;
                border-radius: 2px;
                cursor: pointer;
                &.chosen{
                  background-color:#b8b844;
                  &:after{
                    content: '\A0';
                    display: inline-block;
                    border: 2px solid #fff;
                    border-top-width: 0;
                    border-right-width: 0;
                    width: 12px;
                    height: 8px;
                    -webkit-transform: rotate(-50deg);
                    position: absolute;
                    top: 2px;
                    left: 2px;
                  }
                }
              }
            }
          }
        }
      }
      &.sms-choose{
        .unit{
          .authenticatenow{
            margin:40px 80px 60px 40px;
            padding: 28px 40px;
            background: #ecf6fd;
            h5{
              margin-bottom: 32px;
              opacity: 0.9;
              font-family: HelveticaNeue-Medium;
              font-size: 14px;
              color: #000000;
              letter-spacing: 0;
            }
            .input-box{
              .clearfix();
              margin-bottom: 28px;
              label{
                float: left;
                height: 32px;
                width: 148px;
                line-height: 32px;
              }
              .input-inner{
                position: relative;
                float: left;
                width: 300px;
                height: 32px;
                line-height: 32px;
                .bottom-line{
                  position: absolute;
                  bottom: 0;
                  left: 50%;
                  height: 1px;
                  background: #85c6f4;
                  width: 100%;
                  transform: translateX(-50%);
                  &.to-red{
                    background: #D94242;
                    animation:linec 700ms 1;
                    -webkit-animation:linec 700ms 1;
                    animation-fill-mode:forwards;
                    -webkit-animation-fill-mode:forwards;
                  }
                }
                .tip-p{
                  position: absolute;
                  bottom: -56px;
                  padding: 6px 14px;
                  opacity: 0.7;
                  font-family: HelveticaNeue;
                  font-size: 12px;
                  color: #D94242;;
                  letter-spacing: 0;
                  line-height: 14px;
                  &.more-p{
                    bottom:-44px;
                  }
                }
                input{
                  border: 0;
                  padding: 0 10px;
                  background: #ecf6fd;
                }
                span{
                  display: inline-block;
                  text-align: center;
                  height: 14px;
                  line-height: 14px;
                  &.choose{
                    position: relative;
                    width: 88px;
                    border-left: 1px solid #85c6f4;
                    cursor: pointer;
                    &:after{
                      position: relative;
                      top:2px;
                      content: "";
                      display: inline-block;
                      vertical-align: middle;
                      margin-left: 8px;
                      width: 0;
                      height: 0;
                      border: 4px solid transparent;
                      border-top-color: #133d5c;
                    }
                  }
                  &.getc{
                    &:after{
                      display: none;
                    }
                  }
                  &.phone-num{
                    width: 50px;
                    border-right: 1px solid #85c6f4;
                    opacity: 0.7;
                    font-family: HelveticaNeue;
                    font-size: 12px;
                    color: #000000;
                    letter-spacing: 0;
                  }
                }
              }

            }
            .button-out{
              padding-right: 60px;
              text-align: right;
              button{
                width: 90px;
                text-align: center;
                height: 34px;
                line-height: 34px;
                background: #1F4764;
                border-radius: 2px;
                color: #fff;
                cursor: pointer;
              }
            }
          }
        }
      }
      &.tfasuccess{
        .unit{
          >.tfa-table{
            margin-top: 32px;
            margin-bottom: 14px;
          }
        }
      }
    }
  }

  @media (max-width: 768px){
    .security{
      .security-sub{
        .unit{
          margin-bottom: 10px;
          padding: 21px 40px;
          background: #fff;
          h2{
            opacity: 0.9;
            font-family: 'HelveticaNeue-Bold';
            font-size: 24px;
            color: #000000;
            letter-spacing: 0;
          }
          p{
            margin-bottom: 30px;
            font-family: HelveticaNeue;
            font-size: 14px;
            color: #363636;
            letter-spacing: 0;
            line-height: 24px;
            &.table-p{
              margin-bottom: 4px;
            }
            &.choose-tip{
              margin:36px 0 48px 0;
              opacity: 0.7;
              font-family: HelveticaNeue;
              font-size: 18px;
              color: #000000;
              letter-spacing: 0;
            }
          }
          .grey{
            color: #b2b2b2;
          }
          table {
            margin-bottom: 34px;
            &.method-table {
              tr {
                td {
                  text-align: left;
                }
              }
            }
          }
        }}}
  }

</style>
