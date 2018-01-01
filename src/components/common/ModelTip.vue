<template>
  <div class="modal-out">
    <div class="modal-backdrop" @webkitTransitionEnd="ame()"></div>
    <div id="modal" class="modal">
      <span class="close" @click.prevent.stop="closeTip()"></span>
      <div class="modal-content sms-check">
        <div class="modal-header">
          <h3>SMS CHECK</h3>
          <p class="">This action requires an additional security check.Pleasure confirm using SMS code.</p>
        </div>
        <div class="modal-body">
          <div class="input-outest">
            <div class="input-inner">
              <input type="text" v-model="smscode" id="smscdode" placeholder="Enter SMS Code" /><span :class="{'get-code':1,disabled:smsTab==1}" @click="unBindAction($event)" >Get code</span>
              <div class="bottom-line" :class="this.smserror==1?'to-red':''"></div>
              <transition name="error-tip" v-if="smserror==1&&smsempty==1">
                <p class="tip-p">Please enter sms code.</p>
              </transition>
              <transition name="error-tip" v-if="smserror==1&&smsverror==1">
                <p class="tip-p more-p">Wrong code</p>
              </transition>
            </div>
            <button class="submit">Submit</button>
          </div>
        </div>
        <div class="modal-footer">
          <p class="small"><span class="light"></span>For the sake of your account safety.google-authentication or phone authentication is requires for large amount withdrawal,and strongly recommended for all the trading and withdrawal process.
            Please consider to keep one of the authentication enabled</p>
        </div>
      </div>
      <div class="modal-content sms-check">
        <div class="modal-header">
          <h3>2FA CHECK</h3>
          <p class="">This action requires an additional security check.Pleasure confirm 2FA token.</p>
        </div>
        <div class="modal-body">
          <div class="input-out">
            <div class="input-inner">
              <input type="text" id="gltoken" v-model="gltoken" placeholder="Enter Google 2Fa token" />
              <div class="bottom-line" :class="this.passworderror==1?'to-red':''"></div>
              <transition name="error-tip" v-if="glerror==1&&glempty==1">
                <p class="tip-p">Please enter your Google 2Fa token.</p>
              </transition>
              <transition name="error-tip" v-if="glerror==1&&glverror==1">
                <p class="tip-p more-p">Wrong token</p>
              </transition>
            </div>
            <button type="button" class="resend" @click="unBindGLAction()">Submit</button>
          </div>
        </div>
        <div class="modal-footer">
          <p class="small"><span class="light"></span>For the sake of your account safety.google-authentication or phone authentication is requires for large amount withdrawal,and strongly recommended for all the trading and withdrawal process.
            Please consider to keep one of the authentication enabled</p>
        </div>
      </div>
      <div class="modal-content change-method">
        <div class="modal-header">
          <h3>change method</h3>
        </div>
        <div class="modal-body">
          <p class="only-p">For the sake of your axxount safety,two-factor authentication or phone authentication is
            required for large amount winthdrawal.You can choose to enable either of the authentication method,but only one of them could be enabled at one time</p>
          <p class="only-p">If you want to change,please disable or unbind the current authentication method first.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="okbtn">ok</button>
        </div>
      </div>
      <div class="modal-content enabletfa">
        <div class="modal-header">
          <h3>Enable 2FA</h3>
        </div>
        <div class="modal-body">
          <p class="only-p">The first step is to download the google Authenticator app for your Android or IOS device.If you need help getting started,please
            see Google's Support Page<br>If you do not have access to android Market or APP Store,there are other options for getting Goole Authenticator,Android Download,Goole Chrome Plugin,or iTunes App Store</p>
          <p class="only-p">The token will not be shown again after 2FA is enabled.If you have multiple devices,add your account token to all of them before clicking enable.(Note:Your Account Token will change each time you reload your browser)</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="okbtn" @click.prevent.stop="closeTip()">ok</button>
        </div>
      </div>
      <div class="modal-content deltip">
        <div class="modal-header">
          <h3>Delete Address</h3>
        </div>
        <div class="modal-body">
          <table>
            <tr>
              <td>Address Name</td>
              <td>Sandy's BTC Address</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>DDSDSDSDSDSDDSDSDSDSD</td>
            </tr>
          </table>
        </div>
        <div class="modal-footer">
          <div class="btn-out">
            <button type="button" class="active" @click.prevent.stop="closeTip()">Cancel</button>
            <button type="button" @click.prevent.stop="closeTip()">Confirm</button>
          </div>
        </div>
      </div>
      <div class="modal-content enabletfa">
        <div class="modal-header">
          <h3>Close setting explain</h3>
        </div>
        <div class="modal-body">
          <p class="only-p">Close tip login in explain </p>
          <p class="only-p">Close tip Find password explain </p>
          <p class="only-p">Close tip senstive explain </p>

        </div>
        <div class="modal-footer">
          <button type="button" class="okbtn" @click.prevent.stop="closeTip('send')">ok</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ModelTip',
    data: function() {
      return {
        passworderror:"",
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
     /* pageBus.$on('change', function (index, arg, type){
        self.tip = 0;
        self.showpart = index;
        console.log("*****")
        console.log(arg)
        if(type == "smsAuth"){
          this.securityInfo = arg;
        }
        $('.modal-out').css('zIndex',1).removeClass('hide-box').addClass('show-box')
      })*/;

    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @import "../../assets/css/base.less";
  .modal-out{
    position: relative;
    z-index: -1;
    .modal-backdrop{
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 56;
      background-color:rgba(0,0,0,0.8);
      opacity: 0;

    }
    .modal{
      position: fixed;
      padding: 28px 68px;
      left: 50%;
      top: 50%;
      z-index: 58;
      width: 600px;
      background-color:@white;
      color: @black;
      transform: translate(-50%,-500%);
      border-radius: 2px;
      overflow: hidden;

      .modal-content{
        text-align: left;
        .modal-header{
          margin:0 auto 30px;
          color: #fff;
          h3{
            opacity: 0.9;
            font-family: HelveticaNeue-Bold;
            font-size: 36px;
            color: #000000;
          }
          p{
            margin-top: 21px;
            opacity: 0.3;
            font-family: HelveticaNeue;
            font-size: 12px;
            color: #000000;
            letter-spacing: 0;
            line-height: 18px;
          }
        }

        .modal-body{
          .input-out{
            position: relative;
            height: 42px;
            line-height: 42px;
            .clear;
            .input-inner{
              float: left;
              width: 300px;
              height: 42px;
              line-height: 42px;
              input{
                width:100%;
                padding: 0 12px;
                height: 42px;
                border: 0;
                line-height: 42px;
              }
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
                bottom: -28px;
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
            }

            button{
              float: right;
              width: 120px;
              height: 42px;
              line-height: 42px;
              background-color: @blue1;
              border: 0;
              color: @white;
              text-align: center;
              font-family: HelveticaNeue-Bold;
              font-size: 16px;
              letter-spacing: 0;
              cursor: pointer;
              &.disabled{
                background-color: #d1d1d1;
              }
            }
          }
          .only-p{
            margin-bottom: 24px;
            opacity: 0.7;
            font-family: HelveticaNeue;
            font-size: 14px;
            color: #000000;
            letter-spacing: 0;
            line-height: 24px;
          }
          .input-outest{
            height: 42px;
            line-height: 42px;
            .clearfix();
            .input-inner{
              position: relative;
              float: left;
              margin-right: 30px;
              width: 300px;
              >input{
                padding: 0 15px;
                border:0;
                float: left;
                height: 42px;
                line-height: 42px;
                width: 204px;
                opacity: 0.7;
                font-family: HelveticaNeue;
                font-size: 14px;
                color: #000000;
                letter-spacing: 0;
              }
              .get-code{
                cursor: pointer;
                float: left;
                width:96px;
                text-align: center;
                line-height: 18px;
                height: 18px;
                margin-top: 12px;
                border-left:1px solid #e5e5e5;
                color:#284e6a;
                &.disabled{
                  color:#b8b8b8;
                }
              }
            }
            .submit{
              cursor: pointer;
              width: 120px;
              height: 42px;
              background: #1F4764;
              border-radius: 2px;
              font-family: HelveticaNeue-Bold;
              font-size: 16px;
              color: #FFFFFF;
              letter-spacing: 0;
              border:0;
            }
          }
        }
        .modal-footer{
          margin-top: 100px;
          p{
            opacity: 0.7;
            font-family: HelveticaNeue;
            font-size: 12px;
            color: #000000;
            letter-spacing: 0;
            line-height: 20px;
            .light{
              margin: 0 14px 0 10px;
              float: left;
              position: relative;
              width: 26px;
              height: 26px;
              top: 6px;
              border: 1px solid black;
            }

          }
        }
        &.change-method{
          .modal-header{
            h3{
              margin-bottom: 48px;
            }
          }
          .modal-footer{
            margin-top: 64px;
            text-align: right;
            button.okbtn{
              background-color: @white;
              border: 0;
              font-family: HelveticaNeue;
              font-size: 16px;
              color: #1F4764;
              letter-spacing: 0.57px;
              line-height: 18px;
              cursor: pointer;
            }
          }
        }
        &.deltip{
          .modal-header{
            h3{
              margin-bottom: 48px;
            }
          }
          .modal-body{
            table{
              tr{
                td{
                  text-align: left;
                  padding: 21px 40px 21px 0;
                  &:first-child{
                    color: #b2b2b2;
                  }

                }
              }
            }
          }
          .modal-footer{
            margin-top: 64px;
            text-align: right;
            .btn-out{
              button{
                margin-left: 20px;
                width: 120px;
                height: 42px;
                line-height: 42px;
                text-align: center;
                color: #fff;
                border: 1px solid #1F4764;
                background: #1F4764;
                font-family: HelveticaNeue-Bold;
                font-size: 16px;
                border-radius: 4px;
                &.active{
                  color: #1F4764;
                  border: 1px solid #1F4764;
                  background: #fff;
                }

              }
            }
          }
        }
        &.enabletfa{
          .modal-body{
            .only-p{
              margin-bottom: 24px;
              opacity: 0.7;
              font-family: HelveticaNeue;
              font-size: 14px;
              color: #000000;
              letter-spacing: 0;
              line-height: 24px;
            }
          }
          .modal-footer{
            margin-top: 2px;
            text-align: right;
            button{
              font-family: HelveticaNeue;
              font-size: 16px;
              color: #1F4764;
              letter-spacing: 0.57px;
              background: @white;
              cursor: pointer;
            }
          }
        }
      }

    }
    &.show-box{
      .modal-backdrop{
        opacity: 1;
        transition:all 300ms ease 0s;
      }
      .modal{
        transition:all 700ms ease-in-out 300ms;
        transform: translate(-50%,-68%);
      }
    }
    &.hide-box{
      .modal-backdrop{
        transition:all 300ms ease-in-out 700ms;
        opacity: 0;
      }
      .modal{
        transition:all 700ms ease 0s;
        transform: translate(-50%,-500%);
      }
    }

  }
  @media screen and (max-width:750px){
    .modal-out{
      position: relative;
      z-index: -1;
      .modal-backdrop{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 56;
        background-color:rgba(0,0,0,0.8);
        opacity: 0;

      }
      .modal{
        padding: 16px;
        width:80%;
        .close{
          right: 12px;
          top:12px;
        }
        .modal-content{
          .modal-header{
            margin:0 auto 30px;
            color: #fff;
            h3{
              opacity: 0.9;
              font-family: HelveticaNeue-Bold;
              font-size: 28px;
              color: #000000;
            }
            p{
              margin-top: 21px;
              opacity: 0.3;
              font-family: HelveticaNeue;
              font-size: 12px;
              color: #000000;
              letter-spacing: 0;
              line-height: 18px;
            }
          }
          .modal-body{
            max-height: 280px;
            overflow-y: scroll;
            .input-out{
              input{
                float: none;
                width: 100%;
                padding: 0 12px;
              }
              button{
                float: right;
                margin-top: 8px;
                width: 100px;
                height: 36px;
                line-height: 36px;
                background-color: @blue1;
                border: 0;
                color: @white;
                text-align: center;
                font-family: HelveticaNeue-Bold;
                font-size: 14px;
                letter-spacing: 0;
                cursor: pointer;
              }
            }
            .only-p{
              margin-bottom: 24px;
              opacity: 0.7;
              font-family: HelveticaNeue;
              font-size: 14px;
              color: #000000;
              letter-spacing: 0;
              line-height: 24px;
            }
          }
          .modal-footer{
            margin-top: 72px;
            p{
              opacity: 0.7;
              font-family: HelveticaNeue;
              font-size: 12px;
              color: #000000;
              letter-spacing: 0;
              line-height: 20px;
              .light{
                margin: 0 14px 0 10px;
                float: left;
                position: relative;
                width: 26px;
                height: 26px;
                top: 6px;
                border: 1px solid black;
              }

            }
          }
          &.change-method{
            .modal-header{
              h3{
                margin-bottom: 48px;
              }
            }
            .modal-footer{
              margin-top: 64px;
              text-align: right;
              button.okbtn{
                background-color: @white;
                border: 0;
                font-family: HelveticaNeue;
                font-size: 16px;
                color: #1F4764;
                letter-spacing: 0.57px;
                line-height: 18px;
                cursor: pointer;
              }
            }
          }
          &.deltip{
            .modal-header{
              h3{
                margin-bottom: 48px;
              }
            }
            .modal-body{
              table{
                tr{
                  td{
                    text-align: left;
                    padding: 21px 40px 21px 0;
                    &:first-child{
                      color: #b2b2b2;
                    }

                  }
                }
              }
            }
            .modal-footer{
              margin-top: 64px;
              text-align: right;
              .btn-out{
                button{
                  margin-left: 20px;
                  width: 120px;
                  height: 42px;
                  line-height: 42px;
                  text-align: center;
                  color: #fff;
                  border: 1px solid #1F4764;
                  background: #1F4764;
                  font-family: HelveticaNeue-Bold;
                  font-size: 16px;
                  border-radius: 4px;
                  &.active{
                    color: #1F4764;
                    border: 1px solid #1F4764;
                    background: #fff;
                  }

                }
              }
            }
          }
          &.enabletfa{
            .modal-body{
              .only-p{
                margin-bottom: 24px;
                opacity: 0.7;
                font-family: HelveticaNeue;
                font-size: 14px;
                color: #000000;
                letter-spacing: 0;
                line-height: 24px;
              }
            }
            .modal-footer{
              margin-top: 2px;
              text-align: right;
              button{
                font-family: HelveticaNeue;
                font-size: 16px;
                color: #1F4764;
                letter-spacing: 0.57px;
                background: @white;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }

</style>
