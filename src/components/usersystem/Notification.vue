<template>
  <div class="notification">
    <h2>Email Notification</h2>
    <div class="no-content">
      <ul>
        <li v-for="(item,index) in notifications">
          <span class="trans-btn" :class="item.setStatus==1?'on':''" @click="toggle($event,index)"></span>
          <p>{{item.notificationName}}</p>
          <p class="small">You'll get email notification every time you login in</p>
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
  import Axios from '../../assets/js/axios_default'

  export default {
    name: 'Notification',
    data: function() {
      return {
        notifications:[
          {
            "notificationName":"Login Notification",
            "setStatus":1//:0未开启，1开启
          },
          {
            "notificationName":"Withdraw Notification",
            "setStatus":1//:0未开启，1开启
          },
          {
            "notificationName":"Desposit Notification",
            "setStatus":1//:0未开启，1开启
          },
          {
            "notificationName":"Securitysetting Notification",
            "setStatus":1//:0未开启，1开启
          },
          {
            "notificationName":"Withdraw Audition Passed",
            "setStatus":1//:0未开启，1开启
          }

        ]
      }
    },
    methods: {
      init:function(){
        this.getNotifications();
      },
      closeTip(){
        $('.modal-out').removeClass('show-box')
      },
      ame:function(){
        console.log("动画结束")
      },
      toggle:function(e,index){
        this.notifications[index]['setStatus'] =!this.notifications[index]['setStatus'];
        this.changeNotification(this.notifications[index])
        // Vue.set( this.onValue, index, targetValue);
      },
      getNotifications() {
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
              "data":[
                {
                  "notificationName":"通知名称1",
                  "setStatus":1//:0未开启，1开启
                },
                {
                  "notificationName":"通知名称2",
                  "setStatus":1//:0未开启，1开启
                },
                {
                  "notificationName":"通知名称3",
                  "setStatus":1//:0未开启，1开启
                },
                {
                  "notificationName":"通知名称4",
                  "setStatus":1//:0未开启，1开启
                },
                {
                  "notificationName":"通知名称5",
                  "setStatus":1//:0未开启，1开启
                },

              ]
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
        Axios.get('/user_acount.act?cmd=getEmailNotificationSetList&',{params:paraObj})
          .then(function (response) {
            let cuData =  response.data;
          })
          .catch(function (response) {
            let cuData = response.data;
            self.notification = cuData.data;
            console.log(self.notification)
          });
      },
      changeNotification(arg){
        var self = this;
        var paraObj = {
          notificationName:arg['notificationName'],
          status:arg['setStatus']
        };

        //拦截设置,模拟请求在error完成交互
        Axios.interceptors.response.use(function (response){
          return response;
        }, function (error){
          //成功
          let testSuccess1 = {
            "data":{
              "success":true,
              "data":null
            }
          };
          return Promise.reject(testSuccess1);
        });
        Axios.get('/user_account.act?cmd=emailNotificationSet&',{params:paraObj})
          .then(function (response) {
            let cuData =  response.data;
          })
          .catch(function (response) {
            let cuData = response.data;


          });
      },
    },
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

  .notification{
    padding: 21px 40px;
    background: #fff;
    h2{
      margin-bottom: 37px;
      opacity: 0.9;
      font-family: HelveticaNeue-Bold;
      font-size: 24px;
      color: #000000;
      letter-spacing: 0;
    }
    ul{
      li{
        position: relative;
        padding: 16px 96px 16px 40px;
        p{
          margin-bottom: 6px;
          font-family: HelveticaNeue-Bold;
          font-size: 14px;
          color: #000000;
          letter-spacing: 0;
          &.small{
            opacity: 0.3;
            font-family: HelveticaNeue;
            font-size: 12px;
            color: #000000;
            letter-spacing: 0;
          }
        }
        .trans-btn{
          position: absolute;
          right: 40px;
          width: 34px;
          height: 14px;
          top:50%;
          transform: translateY(-50%);
          border-radius: 7px;
          background: rgba(34,31,31,0.26);
          cursor: pointer;
          &:before{
            content: "";
            position: absolute;
            left: -2%;
            top:50%;
            transform: translateY(-50%);
            width: 20px;
            height: 20px;
            border-radius: 10px;
            background: #f1f1f1;
            box-shadow: 0 0 2px 1px #b3b6b8;
            transition:all 300ms ease-in-out 0s;
          }

          &.on{
            background: #8fa3b1;
            &:before{
              left: 52%;
              background: #1f4764;
            }
          }
        }
        &:hover{
          background: #f0f4f7;
        }
      }
    }
  }

  @media (max-width: 750px) {
    .notification{
      ul{
        li{
          padding: 16px 96px 16px 0;
        }
      }
    }
  }

</style>
