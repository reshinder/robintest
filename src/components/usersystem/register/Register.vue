<template>
 <router-view></router-view>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: 'Register',
    components:{},
    data: function() {
      return {
        screenWidth:"",
        bVerification:1,
        emailerror:0,
        emailempty:0,
        emailverror:0,
        passerror:0,
        passempty:0,
        passverror:0,
        email:"",
        password:"",
      }
    },
    methods: {
      init:function(){
        this.fixView()
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
              if(cuData.data.execute){
                this.$store.commit('SAVE_BASE_DATA',paraObj); //保存输入信息
                helper.setItem('identifier',cuData.data.identifier);
                if(cuData.data.identifier==1){
                  self.$router.push({ path: '/authentication/google_authentication' })
                }else if(cuData.data.identifier==2){
                  self.$router.push({ path: '/authentication/sms_authentication' })
                }
              }else{
                self.$router.push({ path: '/trade' })
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
          tem['loginName'] = email.val().trim();
          tem['password'] = password.val().trim();
          this.remoteAction();
        }
      }
    },
    watch: {
      screenWidth (val) {
        if (!this.timer) {
          this.screenWidth = val
          this.timer = true
          let that = this
          setTimeout(function () {
            that.init()
            that.timer = false
          }, 400)
        }
      }
    },
    mounted(){
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
        })()
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @import "../../../assets/css/base.less";
  #app{
    &.register-default{
      width: 100%;
      height: 100%;
      background: url("../../../assets/register.png") no-repeat center center;
      background-size:cover;
    }
  }
  .register{
    margin-top: 172px;
    margin-left: 50%;
    width: 560px;
    h2{
      margin-bottom: 92px;
      opacity: 0.9;
      font-family: HelveticaNeue-Bold;
      font-size: 44px;
      color: #000000;
      letter-spacing: 0;
    }
    .input-wrap {
      position: relative;
      margin-left: 190px;
      width: 366px;
      margin-bottom: 30px;
      height: 50px;
      line-height: 50px;
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
      input{
        margin-bottom: 5px;
        padding: 0 15px;
        background-color: transparent;
        width: 366px;
        line-height: 48px;
        border: 0
      }
      .error-tip{
        padding-left: 15px;
        opacity: 0.7;
        font-family: HelveticaNeue;
        font-size: 12px;
        color: #D94242;
        letter-spacing: 0;
        line-height: 12px;
        &.top-tip{
          position: absolute;
          top:-18px;
          font-family: PingFangSC-Regular;
          font-size: 16px;
          letter-spacing: 0;
          line-height: 18px;
          &:before{
            margin-right: 8px;
            display: inline-block;
            vertical-align: top;
            content: "";
            width: 16px;
            height: 16px;
            border-radius: 8px;
            background:#D94242 ;
            opacity: 0.7;
          }
        }
      }
    }
    .sign-p{
      margin-left: 205px;
      width: 366px;
      font-family: HelveticaNeue;
      font-size: 14px;
      color: #B0B02F;
      letter-spacing: 0;
      line-height: 25px;
    }
    .btns-out{
      margin-top: 24px;
      margin-bottom: 36px;
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
        cursor: pointer;
      }
    }
  }
  @media (max-width: 1200px) {
    .register{
      margin-left: 34%;
      .input-wrap {
        margin-left: 148px;
      }
    }
  }
  @media (max-width: 992px) {
    #pageHome{
      &.register-default{
        width: 100%;
        height: 100%;
        background: @white;
      }
    }
    .register{
      margin-left: auto;
      margin-right: auto;
      width: 560px;
      .input-wrap {
        margin-left: 120px;
        position: relative;
        margin-bottom: 30px;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #eaeaea;
        input{
          float: none;
        }

      }
      .sign-p{
        margin-left: 120px;
        width: 366px;
      }
    }
  }
  @media (max-width: 768px) {
    .register{
      width: 80%;
      .input-wrap {
        width: 80%;
        margin-left: 10%;
        position: relative;
        margin-bottom: 30px;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #eaeaea;
        input{
          width: 80%;
          float: none;
        }

      }
      .sign-p{
        margin-left: 10%;
        width: 80%;

      }
    }
  }
  @media (max-width: 750px) {
    .register{
      h2{
        margin-bottom: 50px;
        opacity: 0.9;
        font-family: HelveticaNeue-Bold;
        font-size: 24px;
        color: #000000;
        letter-spacing: 0;
      }
    }
  }

</style>
