import pageBus from '../common/bus'
import Vue from '../lib/vue.js';
import Axios from '../common/axios_default';
import $ from '../lib/jquery-3.2.1.min';


let notification = {
    template: `<div class="notification">
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
</div>`,
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
    created: function() {

    },
    mounted: function() {
        this.init()
    }
};

export default notification