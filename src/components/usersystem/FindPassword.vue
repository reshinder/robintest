<template>
  <div class="row content-out" >
    <div class="unit resetword">
      <h1>Request Password Request</h1>
      <div class="input-out">
        <input id="remail" type="email" v-model="remail" value="" placeholder="Email address"  />
        <div class="bottom-line" :class="this.emailerror==1?'to-red':''"></div>
        <transition name="error-tip" v-if="emailerror==1&&emailempty==1">
          <p class="tip-p">Please enter your Email address.</p>
        </transition>
        <transition name="error-tip" v-if="emailerror==1&&emailverror==1">
          <p class="tip-p">Please enter a valid Email address</p>
        </transition>
      </div>
      <p class="tip-b">
        <span class="mo-choose" :class="{chosen:haschosen}" @click.prevent.stop="haschosen=!haschosen"></span> I acknowledge that my account will be put on 3 days withdrawal hold for a security precaution
      </p>
      <div class="button-out">
        <button type="button" class="cancel active" @click.stop.prevent="toLogin">Cancel</button>
        <button type="button" class="submit" @click.prevent.stop="toSendEmail">Submit</button>
      </div>
    </div>
    <div class="unit resetwordtip">
      <h1>Request Password Request</h1>
      <p>An email has been sent with a link to reset your password.</p>
      <p>We hava sent a reset password email {{remail}}. Please check it to proceed with the password reset process</p>
      <p>If you have noe received your email within 5 minutes,please check the following:</p>
      <ul>
        <li>check if you hava the correct email</li>
        <li>Please check your spam folder</li>
        <li>Contact us at support@bitstar.com</li>
      </ul>
      <p class="click-tip" @click.prevent.stop="toLogin">Back to Home <span class="long-arrow"></span></p>
    </div>
    <div class="unit resetword">
      <h1>Request Password</h1>
      <div class="input-out">
        <input id="password" class="password"  type="password" name="password" value="" placeholder="password"  />
        <div class="bottom-line" :class="this.passworderror==1?'to-red':''"></div>
        <transition name="error-tip" v-if="passworderror==1&&passempty==1">
          <p class="tip-p">Please enter your Password.</p>
        </transition>
        <transition name="error-tip" v-if="passworderror==1&&passverror==1">
          <p class="tip-p more-p">Passwords must be at least 8 characters with 1 capital letter, 1 lowercase character, and 1 number, and without spaces.</p>
        </transition>
      </div>
      <div class="input-out">
        <input id="confirmword" class="password"  type="password" name="confirmword" value="" placeholder="Confirm Password"  />
        <div class="bottom-line" :class="this.confirmworderror==1?'to-red':''"></div>
        <transition name="error-tip" v-if="confirmworderror==1">
          <p class="tip-p">Please enter the same value again.</p>
        </transition>
      </div>
      <p class="tip-b">
        <span class="mo-choose" :class="{chosen:haschosen}" @click.prevent.stop="haschosen=!haschosen"></span> I acknowledge that my account will be put on 3 days withdrawal hold for a security precaution
      </p>
      <div class="button-out">
        <button type="button" class="cancel active" @click.stop.prevent="toLogin">Cancel</button>
        <button type="button" class="submit" @click.prevent.stop="toResetAction">Submit</button>
      </div>
    </div>
    <div class="unit resetwordtip">
      <h1>Congratulations!</h1>
      <p>Your password has been reset successfully.You can log in again with your new password.</p>
      <p class="click-tip">Log in now <span class="long-arrow" @click.stop.prevent="toLogin"></span></p>
    </div>
  </div>
</template>

<script>
  import ModelTip from '../common/ModelTip.vue'

  export default {
    name: 'FindPassword',
    components:{
      ModelTip:ModelTip
    },
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
      init:function(){

        this.fixView()
      },
      toggleTabs(){
        location.href='register.html?main=2&sub=0'
      },
      ame:function(){},
      eve:function(){
        pageBus.$emit('change','accounttip');
      },
      fixView(){
        var header = $('.head-wrap').outerHeight(true),footer = $('.footer-e').outerHeight(true);
        $('.content-wrap').css('height',$(window).height()-(header+footer))

      },

      remoteAction: function (arg) {
        var self = this;
        var paraObj = {
          loginName:arg['email'],
          password:arg['password'],
        };
        Axios.get('/user_account.act?cmd=login&',{params:paraObj})
          .then(function (response) {
            let cuData = response.data;
            alert(cuData.success)
            if(cuData.success){
              alert(cuData.data.execute)
              if(cuData.data.execute){
                helper.setItem('identifier',cuData.data.identifier);
                self.$emit('logincheck',{main:cuData.data.securityAuthentication})
              }else{
                location.href = 'trade.html'
              }
            }else{
              alert(cuData.message)
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

  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @import "../../assets/css/base.less";
  .footer {
    position: fixed;
  }
  .content-out{
     background: @white!important;
    .unit{
      margin: 120px auto;
      width:450px;
      h1{
        opacity: 0.9;
        font-family: HelveticaNeue-Bold;
        font-size: 32px;
        color: #000000;
        letter-spacing: 0;
      }
      .input-out{
        position: relative;
        margin-top: 70px;
        width: 100%;
        line-height: 42px;
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
            bottom:-56px;
          }
        }
        input{
          width: 100%;
          padding: 0 15px;
          padding-right: 54px;
          border: 0;
          height: 42px;
          line-height: 42px;
          background: @white;
        }
        .for-w{
          position: absolute;
          right: 10px;
          top:50%;
          margin-top: -11px;
          border: 1px solid #9b9b9b;
          height: 22px;
          width: 22px;
          border-radius: 11px;
        }
      }
      .tip-b{
        margin-top: 74px;
        line-height: 26px;
        color: #9c9c00;
        span{
          position: relative;
          top:-2px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 10px;
          width: 18px;
          height: 18px;
          border: 1px solid #b8b844;
          border-radius: 2px;
          cursor: pointer;
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
      .button-out{
        margin-top: 80px;
        text-align: right;
        button{
          width: 120px;
          height: 42px;
          line-height: 42px;
          text-align: center;
          font-family: HelveticaNeue-Bold;
          font-size: 16px;
          letter-spacing: 0;
          color: @white;
          background: @blue1;
          border: 1px solid @blue1;
          cursor: pointer;
          &.active{
            background: @white;
            color: @blue1;;
          }
          &:first-child{
            margin-right: 20px;
          }
        }
      }
      &.resetwordtip{
        width:810px;
        h1{
          margin-bottom: 49px;
        }
        p{
          margin-bottom: 24px;
          opacity: 0.7;
          font-family: HelveticaNeue;
          font-size: 18px;
          color: #000000;
          letter-spacing: 0;
          line-height: 30px;
        }
        ul{
          li{
            position: relative;
            padding-left: 26px;
            margin-bottom: 6px;
            opacity: 0.7;
            font-family: HelveticaNeue;
            font-size: 14px;
            color: #000000;
            letter-spacing: 0;
            &:before{
              position: absolute;
              content: "";
              background: #7f7f7f;
              width: 6px;
              height: 6px;
              border-radius: 3px;
              left: 0;
              top:50%;
              margin-top: -3px;
            }
          }
        }
        .click-tip{
          margin-top: 15px;
          font-family: HelveticaNeue-Bold;
          font-size: 18px;
          color: #4AABF0;
          letter-spacing: 0;
          cursor:pointer
        }
      }
    }
  }
  @media (max-width: 992px) {
    .content-out{
      .unit{
        margin: 120px 10%;
        width:80%;
        h1{
          margin-bottom: 49px;
        }
      }
    }
  }
</style>
