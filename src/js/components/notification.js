import pageBus from '../common/bus'

import $ from '../lib/jquery-3.2.1.min';
import Vue from '../lib/vue.js';


let notification = {
    template: `<div class="notification">
    <h2>Email Notification</h2>
    <div class="no-content">
        <ul>
            <li>
                <span class="trans-btn" :class="this.onValue[0]==1?'on':''" @click="toggle(0)"></span>
                <p>Login Notification</p>
                <p class="small">You'll get email notification every time you login in</p>
            </li>
            <li>
                <span class="trans-btn" :class="this.onValue[1]==1?'on':''" @click="toggle(1)"></span>
                <p>Login Notification</p>
                <p class="small">You'll get email notification every time you login in</p>
            </li>
            <li>
                <span class="trans-btn" :class="this.onValue[2]==1?'on':''" @click="toggle(2)"></span>
                <p>Login Notification</p>
                <p class="small">You'll get email notification every time you login in</p>
            </li>
            <li>
                <span class="trans-btn" :class="this.onValue[3]==1?'on':''" @click="toggle(3)"></span>
                <p>Login Notification</p>
                <p class="small">You'll get email notification every time you login in</p>
            </li>
            <li>
                <span class="trans-btn" :class="this.onValue[4]==1?'on':''" @click="toggle(4)"></span>
                <p>Login Notification{{onValue[4]}}</p>
                <p class="small">You'll get email notification every time you login in</p>
            </li>
        </ul>

    </div>
</div>`,
    data: function() {
        return {
            onValue:[0,1,1,1,1]
        }
    },
    methods: {
        init:function(){},
        closeTip(){
            $('.modal-out').removeClass('show-box')
        },
        ame:function(){
            console.log("动画结束")
        },
        toggle:function(index){
             var targetValue = this.onValue[index]?0:1;
             Vue.set( this.onValue, index, targetValue);
        },
    },
    created: function() {

    },
    mounted: function() {
        this.init()
    }
};

export default notification