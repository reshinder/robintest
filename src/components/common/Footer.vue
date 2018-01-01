<template>
  <div>
    <div class="footer" v-if="showEmpty==false">
      <div class="container">
        <div class="row">
          <div class="col-lg-2 col-md-12 col-sm-12  col-xs-12">
            <div class="footer-part qr-code"><span></span></div>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-12  col-xs-12">
            <div class="footer-part product"><h3>Product</h3>
              <ul>
                <li>Deposit</li>
                <li>Withdraw</li>
                <li>API</li>
                <li>Frees</li>
              </ul>
            </div>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-12  col-xs-12">
            <div class="footer-part help"><h3>Help</h3>
              <ul>
                <li>Help Document</li>
                <li>How to Deposit</li>
                <li>How to Withdraw</li>
                <li>How to transction</li>
                <li>FAQs</li>
              </ul>
            </div>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-12  col-xs-12">
            <div class="footer-part community"><h3>Community</h3>
              <ul>
                <li>Notice Center</li>
              </ul>
            </div>
          </div>
          <div class="col-lg-2 col-md-3 col-sm-12  col-xs-12">
            <div class="footer-part about-us"><h3>About us</h3>
              <ul>
                <li>Our Company</li>
                <li>Privacy Policy</li>
                <li>Terms of use</li>
                <li>AML Policy</li>
                <li>KYC Policy</li>
                <li>Contact Us</li>
              </ul>
            </div>
          </div>
          <div class="col-lg-1 col-md-12 col-sm-12  col-xs-12">
            <div class="footer-part social-icon">
              <ul class="social-icon">
                <li><a href=""></a></li>
                <li><a href=""></a></li>
                <li><a href=""></a></li>
                <li><a href=""></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="copy-right"><p>@2017 superbit Corparation</p></div>
    </div>
    <div class="footer-e" v-if="showEmpty==true">
      <div class="copy-right"><p>@2017 superbit Corparation</p></div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Footer',
    data () {
      return {
        open: '',
        showEmpty:false
      }
    },
    methods:{
       init(){
           this.showEmpty = this.$router.currentRoute.fullPath == '/login'?true:false;
       }
    },
    watch:{
      '$route' (to, from) {
        this.showEmpty = to.path!="/login"?false:true
      }
    },
    created: function() {},
    mounted: function() {
      this.init()
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>
  @import "../../assets/css/base.less";
  .footer{
    width: 100%;
    bottom:0;
    padding-top: 38px;
    background-color: @blue1;
    color: @white;
    border: 1px solid @blue1;
    text-align: center;
    .footer-part{
      display: inline-block;
      text-align: left;
      h3{
        margin-bottom: 20px;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #FFFFFF;
        letter-spacing: 0;
        text-align: center;
      }
      ul{
        li{
          opacity: 0.7;
          font-family: PingFangSC-Regular;
          font-size: 12px;
          line-height: 17px;
          margin-bottom: 3px;
        }
      }
      &.qr-code{
        span{
          display: block;
          width: 88px;
          height: 88px;
          background-color: @white;
        }
      }
      &.product{

      }
      &.help{

      }
      &.community{

      }
      &.about-us{

      }
      &.social-icon{
        ul.social-icon{
          margin-top: 16px;
          li{
            margin-bottom: 16px;
            width: 24px;
            height: 24px;
            border-radius: 12px;
            background-color: #7a3cd8;
            cursor: pointer;
          }
        }
      }
    }
    .copy-right{
      border-top: 1px solid #294f6b;
      background-color: @blue1;
      p{
        height: 66px;
        line-height: 66px;
        margin: 0;
        text-align: center;
        opacity: 0.5;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #FFFFFF;
        letter-spacing: 0;
      }
    }
  }
  .footer-e{
    background-color: @grey1;
    color: @white;
    text-align: center;
    .copy-right{
      p{
        height: 110px;
        line-height: 110px;
        opacity: 0.5;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #000000;
        letter-spacing: 0;
      }
    }
  }
  @media (max-width: 1200px) {
    .footer{
      /* position: fixed;*/
      width: 100%;
      bottom:0;
    }
  }
  @media (max-width: 992px) {
    .footer{
      position: static;
      .footer-part{
        display: inline-block;
        text-align: left;
        h3{
          margin-bottom: 20px;
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #FFFFFF;
          text-align: center;
        }
        ul{
          li{
            opacity: 0.7;
            font-family: PingFangSC-Regular;
            font-size: 12px;
          }
        }
        &.qr-code{
          padding-bottom: 12px;
          span{
            display: block;
            width: 88px;
            height: 88px;
            background-color: @white;
          }
        }
        &.social-icon{
          ul.social-icon{
            margin-top: 16px;
            li{
              display: inline-block;
              margin:0 10px;
              margin-bottom: 16px;
              width: 24px;
              height: 24px;
              border-radius: 12px;
            }
          }
        }
      }

    }
    .footer-e{
      position: fixed;
      width: 100%;
      bottom:0;
    }
  }
  @media (max-width: 768px) {
    .footer{
      .footer-part{
        margin-bottom: 16px;
      }

    }
  }

</style>
