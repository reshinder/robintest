<template>
  <div class="row content-out" >
    <div class="unit resetwordtip">
      <h1>Congratulations!</h1>
      <p>Your password has been reset successfully.You can log in again with your new password.</p>
      <p class="click-tip" @click.stop.prevent="$router.push({ path: '/login' })">Log in now <span class="long-arrow"></span></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AuthenticationSuccess',
    components:{
    },
    data () {
      return {
        email: '',
        securityAuthentication:""
      }
    }

  }
</script>

<style rel="stylesheet/less" lang="less" >
  @import "../../../../assets/css/base.less";
  .footer{
    position: fixed;
  }
  .content-out{
    background: @white;
    .unit{
      margin: 120px auto;
      width: 450px;
      h1{
        opacity: 0.9;
        font-family: HelveticaNeue-Bold;
        font-size: 36px;
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
        }
        input{
          width: 100%;
          padding: 0 15px;
          border: 0;
          height: 42px;
          line-height: 42px;
          background: @white;
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
          cursor: pointer;
        }
      }
      &.sms-authen{
        .input-out{
          position: relative;
          .clearfix();
          input{
            padding-right: 118px;
          }
          span{
            position: absolute;
            right: 0;
            top:50%;
            transform: translateY(-50%);
            width: 118px;
            height: 16px;
            text-align: center;
            font-family: HelveticaNeue;
            font-size: 14px;
            border-left: 2px solid #efefef;
            color: #B0B02F;
            letter-spacing: 0;
            line-height: 18px;
            &.s-btn{
              cursor: pointer;
            }
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
  @media (max-width: 750px) {
    .content-out{
      .unit{
        margin: 120px auto;
        width: 80%;
      }
    }
  }
</style>
