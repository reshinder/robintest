<template>
  <div class="account-out">
    <div class="tab-unit">
      <h2>Account</h2>
      <p>Email: {{email}}</p>
    </div>
    <div class="tab-unit" v-if="securityAuthentication==0">
      <h2>Verification</h2>
      <p class="small">Verification is required for USD deposit withdrawal.</p>
      <p class="small swallow-grey">Trading, deposit, and withdrawal functionalities are banned for U.s individual customers</p>
      <p class="href-p">
        <a href="" @click.prevent.stop="toVerifyOpen(1)">Verify now</a>
      </p>
    </div>
    <div class="tab-unit" v-if="securityAuthentication==0">
      <h2>Security</h2>
      <div class="level-out">
        <span class="fc">security level:</span>
        <span></span>
      </div>
      <table class="table-set">
        <tr>
          <td>password</td>
          <td>********</td>
          <td class="bc pl50 cup" @click.prevent.stop="changePassword()">change</td>
        </tr>
        <tr>
          <td>2FA<span class="fc">(Google Authentication)</span></td>
          <td>Disabled</td>
          <td class="bc pl50 cup" @click.prevent.stop="toSecurityOpen(2)">Enabled</td>
        </tr>
        <tr>
          <td>SMA<span class="fc">(Phone Authentication)</span></td>
          <td>Unbind</td>
          <td class="bc pl50 cup" @click.prevent.stop="toSecurityOpen(1)">Bind</td>
        </tr>
      </table>
      <p class="small swallow-green cup" @click.prevent.stop=toSecurityOpen(0)><span class="why"></span>2FA and SMS only need to complete a certification</p>
    </div>
    <div class="tab-unit" v-if="securityAuthentication!=0">
      <h2>Basic Verification</h2>
      <div class="level-out vp">
        <span class="fc">verification passed</span>
        <span></span>
      </div>
      <table class="table-set">
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
      <table class="table-set">
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
    <ModelTip></ModelTip>
  </div>
</template>

<script>
  import ModelTip from '../common/ModelTip.vue'

  export default {
    name: 'Account',
    components:{
      ModelTip:ModelTip
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

  .account-out{
     width: 100%;
    .tab-unit{
      position: relative;
      margin-bottom: 10px;
      padding-top: 21px;
      padding-bottom: 26px;
      padding-left: 40px;
      background-color: @white;
      h2{
        margin-bottom: 38px;
        opacity: 0.9;
        font-family: HelveticaNeue-Bold;
        font-size: 24px;
        color: #000000;
      }
      p{
        opacity: 0.7;
        font-family: HelveticaNeue;
        font-size: 18px;
        color: #000000;
        letter-spacing: 0;
        line-height: 18px;
        &.small{
          font-family: HelveticaNeue;
          font-size: 14px;
          line-height: 16px;
        }
        &.swallow-grey{
          margin-top: 10px;
          opacity: 0.7;
          font-family: HelveticaNeue;
          font-size: 14px;
          line-height: 28px;
        }
        &.href-p{
          margin-top: 23px;
          line-height: 22px;
          a{
            font-family: HelveticaNeue-Bold;
            font-size: 18px;
            color: #4AABF0;
            cursor: pointer;
          }
        }
        &.click-tip{
          color: #4AABF0;
        }
      }
      .swallow-green{
        margin: 20px 0 27px;
        font-family: HelveticaNeue;
        font-size: 12px;
        color: #B0B02F;
      }
      .level-out{
        position: absolute;
        text-align: right;
        width: 100%;
        height: 16px;
        line-height: 16px;
        top:41px;
        right: 31px;
        span{
          display: inline-block;
          vertical-align: middle;
          font-family: HelveticaNeue;
          font-size: 12px;
          opacity: .7;
          &:last-child{
            position: relative;
            opacity: 1;
            top:1px;
            width: 60px;
            height: 6px;
            background-color: #ebebce;
            border-radius: 3px;
            &:before{
              content: "";
              position: absolute;
              background-color: #b0b02f;
              width: 50%;
              height: 6px;
              border-radius: 3px;
              left: 0;
              margin-top: -3px;
              top:50%;
            }
          }
        }
        &.vp{
          span:last-child{
            margin-left: 23px;
            width: 18px;
            height: 18px;
            border-radius: 9px;
            background: #B0B02F;
          }
        }
      }
    }
  }

  @media (max-width: 768px){
    .account-out{
      width: 100%;
      .tab-unit {
        padding-left:20px;
        h2{
          font-size: 20px;
        }
        .level-out{
          right: 20px;
          top:24px;
        }
      }
    }
  }

</style>
