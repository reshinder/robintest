import pageBus from '../common/bus'

import $ from '../lib/jquery-3.2.1.min';
import Vue from '../lib/vue.js';


let authtication = {
    template: `<div class="content-wrap">
    <div class="container">
        <div class="row">
            <div class="sub-box">
                <div class="unit authentication" v-if="this.tab==0">
                    <h2>SMS Authentication</h2>
                    <div class="input-wrap clear" :class="this.codeTip==1?'fCode':''">
                        <input type="text" value="" placeholder="Enter your sms code" />
                        <button class="resend" type="button" v-if="resend==1">Resend</button>
                        <span class="count-time" v-if="countTime==1">58s</span>
                        <span class="get-code-tip" v-if="codeTip==1">Get SMS Code</span>
                    </div>
                </div>
                <div class="unit tfa" v-if="this.tab==1">
                    <h2>2FA</h2>
                    <div class="input-wrap clear 2fa">
                        <input type="text" value="" placeholder="Enter your Google 2FA Token" />
                    </div>
                </div>

                <div class="btns-out">
                    <button>Submit</button>
                </div>
            </div>
        </div>
    </div>
</div>`,
    data: function() {
        return {
            tab:0,
            resend:0,
            countTime:0,
            codeTip:1,
        }
    },
    methods: {
        init:function(){
        }

    },
    created: function() {
        this.init()
    },

    mounted: function() {
        console.info('mounted');

    }
}

export default authtication;