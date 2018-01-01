<template>
  <div class="content-wrap row" >
    <div class="left-wrap col-lg-6 col-md-6 col-sm-6" >
      <p>SUPERBIT<br>SUPER LIFE</p>
    </div>
    <div class="right-wrap col-lg-6 col-md-6 col-sm-6">
      <div class="row  content-out">
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
              <a  @click.prevent.stop="$router.push({ path: '/findpassword' })">Forget password?</a>
            </div>
            <div class="btns-out">
              <button type="button" class="active" @click.prevnt.stop="loginAction">Login in</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import ModelTip from '../common/ModelTip.vue'

  export default {
    name: 'Login',
    components:{
      ModelTip:ModelTip
    },
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
      }
    },
    methods: {
      init:function(){
          this.fixView()
      },
      ame:function(){},
      eve:function(){
        //pageBus.$emit('change','accounttip');
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
  @import "../../assets/css/base.less";
  #app{
    position: relative;
    .content-wrap{
      width: 100%;
      background: url("../../assets/login_backgrond.png") no-repeat center center ;
      background-size: 100% 100%;
      div{
        float: left;
      }
      .left-wrap{
        position: relative;
        height: 100%;
        p{
          width: 100%;
          position: absolute;
          padding-left: 160px;
          bottom: 166px;
          font-family: BodoniSvtyTwoSCITCTT-Book;
          font-size: 72px;
          color: #FFFFFF;
          letter-spacing: 0;
          line-height: 86px;
        }
      }
      .right-wrap{
        height: 100%;
        background: #fff;
        .content-out{
          min-width: 400px;
          padding-top:141px;
          padding-left: 136px;
          div{
            float: left;
            width: 380px;

          }
          h2{
            width: 100%;
            margin: 0 auto 42px;
            opacity: 0.9;
            font-family: HelveticaNeue-Bold;
            font-size: 36px;
            color: #000000;
          }
          .input-wrap {
            float: none;
            position: relative;
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
                bottom:-56px;
              }
            }
            input{
              margin-bottom: 5px;
              padding: 0 15px;
              background-color: #fff;
              width: 100%;
              line-height: 48px;
              border: 0
            }
          }
          .input-forget{
            a{
              display: block;
              float: right;
              color: #B0B02F;
              cursor: pointer;
            }
          }
          .btns-out{
            button{
              width: 120px;
              height: 44px;
              line-height: 44px;
              text-align: center;
              background-color: #1F4764;
              color: #fff;
              border-radius: 2px;
              border: 0;
              float: right;
              margin-top: 72px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  @media (max-width: 1200px) {
    #app{
      position: relative;
      .content-wrap{
        .left-wrap{
          p{
            padding-left: 112px;
            bottom: 126px;
            font-size: 56px;
            line-height: 72px;
          }

        }
        .right-wrap{
          .content-out{
            padding-left: 106px;
          }
        }

      }
    }
  }
  @media (max-width: 992px) {
    #app{
      position: relative;
      .content-wrap{
        .left-wrap{
          p{
            padding-left: 112px;
            bottom: 126px;
            font-size: 56px;
            line-height: 72px;
          }

        }
        .right-wrap{
          .content-out{
            padding-left: 40px;
            div {
              width: 340px;
            }
          }
        }

      }
    }
  }
  @media (max-width: 768px) {
    #app{
      position: relative;
      .content-wrap{
        .left-wrap{
          display: none;
        }
        .right-wrap{
          float: none;
          width: 100%;
          .content-out{
            width: 60%;
            float: none;
            padding-left: 0;
            margin: 0 auto;
          }
        }

      }
    }
  }
</style>
