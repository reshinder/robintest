<template>
  <div class="head-wrap">
    <div class="container">
      <div class="row">
        <div class="logo-word" onClick='window.location.href="trade.html"'><router-link to="/Trade">SUPERBIT</router-link></div>
        <div class="trade">
          <a class="link">
            <span><router-link to="/Trade">Trade</router-link></span>
            <em class="bot_cross_tip"></em>
          </a>
          <ul class="sub-menu">
            <li><a href="#">BTC/USD</a></li>
            <li><a href="#">LTC/USD</a></li>
            <li><a href="#">ETH/USD</a></li>
          </ul>
        </div>

        <button type="button" class="mobile-menu" @click.prevent.stop="open=!open">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <ul class="main-nav">
          <!--<li class="trade">-->
          <!--<a class="link">Trade</a>-->
          <!--<ul class="sub-menu">-->
          <!--<li><a href="#">BTC/USD</a></li>-->
          <!--<li><a href="#">LTC/USD</a></li>-->
          <!--<li><a href="#">ETH/USD</a></li>-->
          <!--</ul>-->
          <!--</li>-->
          <li><a class="link" href="deposit.html?main=0">Deposit</a></li>
          <li><a class="link" href="withdraw.html?main=0">Withdraw</a></li>
          <li class="icon-li-b"><a class="link" href="assets.html?main=0">Asset</a></li>
          <li class="icon-li"><a class="a" href="notice.html"></a></li>
          <li class="icon-li"><a class="b"></a></li>
          <li class="icon-li"><a class="c"></a></li>
          <li class="icon-li"><a class="d" href="aboutus.html"></a></li>
          <li class="icon-li user">
            <a class="e"></a>
            <ul class="sub-menu">
              <li><a href="usersystem.html?main=0">Account</a></li>
              <li><a href="usersystem.html?main=1">Security</a></li>
              <li><a href="usersystem.html?main=2">Notification</a></li>
              <li><a href="usersystem.html?main=3">Verification</a></li>
              <li><a href="usersystem.html?main=4">Address Book</a></li>
            </ul>
          </li>
        </ul>
       <!-- <transition name="slide-fade">-->
          <ul class="mobile-nav" v-if="open" @click="open=!open">
            <li>
              <a class="link" href="">Trade</a>
              <ul class="sub-menu">
                <li><a href="#">BTC/USD</a></li>
                <li><a href="#">LTC/USD</a></li>
                <li><a href="#">ETH/USD</a></li>
              </ul>
            </li>
            <li><a class="link">Deposit</a></li>
            <li><a class="link">Withdraw</a></li>
            <li><a class="link">Asset</a></li>
            <li><a class="link">Account</a></li>
            <li><a class="link">Security</a></li>
            <li><a class="link">Notification</a></li>
            <li><a class="link">Verification</a></li>
            <li><a class="link">Address Book</a></li>
            <li><a class="icon a"></a></li>
            <li><a class="icon b"></a></li>
            <li><a class="icon c"></a></li>
            <li><a class="icon d"></a></li>
            <li><a class="icon e"></a></li>
          </ul>
     <!--   </transition>-->

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data () {
      return {
        msg: ''
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" >
  @import "../assets/css/base.less";

  .head-wrap{
    background: @blue1;
  .row{
    position: relative;
  .logo-word{
    float: left;
    margin-left: 15px;
    padding: 24px 0;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #FFFFFF;
    letter-spacing: 0;
    vertical-align: middle;
  }
  .trade{
    position: absolute;
    left:180px;
    top:28px;
    width: 120px;
    text-align: center;
    font-size: 16px;
    color: @white;
  .bot_cross_tip{
    width:4px;
    height:4px;
    border-radius: 2px;
    display: block;
    background-color: @white;
    margin:10px 0 0 50%;
    opacity: .5;
  }
  >ul{
     position: absolute;
     left: 0;
     top:44px;
     display: none;
     z-index: 5;
  li{
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: @blue1;
    padding: 0;
  >a{
     color: #fff;
   }
  &:hover{
     background: @blue2;
   }
  }
  }
  &:hover{
  >ul{
     display: block;
   }
  }
  }

  .mobile-menu{
    position: absolute;
    top:17px;
    right:15px;
    display: none;
    float: right;
    padding: 9px 10px;
    background-color: transparent;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
  .icon-bar {
    display: block;
    width: 22px;
    height: 2px;
    border-radius: 1px;
    background-color: #888;
  &+.icon-bar {
      margin-top: 4px;
    }
  }
  }
  li{
    float: left;
    position: relative;
    padding: 27px 19.5px;
    font-family: HelveticaNeue;
    font-size: 14px;
    line-height: 16px;
    color: #FFFFFF;
    cursor: pointer;
  >a.link {
     padding: 5px 0;
     font-family: HelveticaNeue;
     font-size: 14px;
     color: #FFFFFF;
     transition: all 250ms;
   }
  &.icon-li{
     padding: 0;
  >a{
     display: inline-block;
     margin: 24px 9px;
     width: 24px;
     height: 24px;
  &.a{
   /* !* background: url("../../images/1.png") center center no-repeat;*!*/
     background-size:contain;
   }
  &.b{
   /* !* background: url("../../images/2.png") center center no-repeat;*!*/
     background-size:contain;
   }
  &.c{
     width: 20px;
     height: 24px;
   /*!*  background: url("../../images/3.png") center center no-repeat;*!*/
     background-size:contain;
   }
  &.d{
     width: 20px;
     height: 24px;
  /* !*  background: url("../../images/4.png") center center no-repeat;*!*/
     background-size:contain;
   }
  &.e{
     width: 20px;
     height: 24px;
    /* !*background: url("../../images/5.png") center center no-repeat;*!*/
     background-size:contain;
   }
  }
  &.user{
     position: relative;
  ul{
    position: absolute;
    left: 50%;
    z-index: 32;
    margin-left: -60px;
    top: 74px;
    width: 120px;
    text-align: center;
    font-size: 16px;
    color: #fff;
  li{
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #1F4764;
    padding: 0;
  a{
    color: #fff;
  }

  &:hover{
     background: @blue2;
   }
  }
  }
  &:hover{
  ul{
    display: block;
  }
  }
  }
  }
  &.icon-li-b{
     padding: 27px 39px 27px 19.5px;
   }

  >.sub-menu{
     display: none;
   }
  }
  .main-nav{
  .clearfix();
    float: right;
  }
  .mobile-nav{
    display: none;
  .clearfix();
    background: @blue1;
    position: fixed;
    z-index: 66;
    width: 280px;
    max-height:100%;
    overflow-x: hidden;
    overflow-y: scroll;
    right:0;
    top:0;
  li{
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    float: none;
  }

  }
  }

  }

  @media (max-width: 750px) {
    .head-wrap{
      background: @white;
    .container{
    .row{
    .logo-word{
      color:@blue1;
    }
    .mobile-menu{
      display: block;
    .icon-bar {
      display: block;
      background-color:@blue1;
    }
  }
  .main-nav{
    display: none;
  }
  .mobile-nav{
    display: block;
  }
  }
  }

  }

  }

</style>
