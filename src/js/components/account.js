import pageBus from '../common/bus'
import $ from '../lib/jquery-3.2.1.min';
import Vue from '../lib/vue.js';
let account = {
    template: `<div class="account-out">
    <div class="tab-unit">
        <h2>Account</h2>
        <p>Email: waneeeeee@qq.com</p>
    </div>
    <div class="tab-unit">
        <h2>Verification</h2>
        <p class="small">Verification is required for USD deposit withdrawal.</p>
        <p class="small swallow-grey">Trading, deposit, and withdrawal functionalities are banned for U.s individual customers</p>
        <p class="href-p">
            <a href="">Verify now</a>
        </p>
    </div>
    <div class="tab-unit">
        <h2>Basic Verification</h2>
        <div class="level-out vp">
            <span class="fc">verification passed</span>
            <span></span>
        </div>
        <table>
            <tr>
                <td>Name: Wangerxiao</td>
                <td>Nationality: China</td>
            </tr>
            <tr>
                <td>Passport ID: 111111111111111</td>
                <td> </td>
            </tr>
        </table>

    </div>
    <div class="tab-unit">
        <h2>Security</h2>
        <div class="level-out">
            <span class="fc">security level:</span>
            <span></span>
        </div>
        <table>
            <tr>
                <td>password</td>
                <td>********</td>
                <td class="bc pl50" @click.prevent.stop="eve()">change</td>
            </tr>
            <tr>
                <td>2FA<span class="fc">(Google Authentication)</span></td>
                <td>Disabled</td>
                <td class="bc pl50" @click.prevent.stop="eve()">Enabled</td>
            </tr>
            <tr>
                <td>2FA<span class="fc">(Google Authentication)</span></td>
                <td>Unbind</td>
                <td class="bc pl50" @click.prevent.stop="eve()">Bind</td>
            </tr>
        </table>
        <table v-if="bVerification==1">
            <tr>
                <td>password</td>
                <td>********</td>
                <td class="bc pl50" @click.prevent.stop="eve()">change</td>
            </tr>
            <tr>
                <td>2FA<span class="fc">(Google Authentication)</span></td>
                <td>Enabled</td>
                <td class="bc pl50" @click.prevent.stop="eve()">Disable</td>
            </tr>
        </table>
        <p class="small swallow-green"><span class="why"></span>2FA and SMS only need to complete a certification</p>
        <p class="small swallow-green click-tip" v-if="bVerification==1">Want to change Authentication method? Click me~</p>
    </div>
</div>`,
    data: function() {
        return {
            bVerification:1
        }
    },
    methods: {
        init:function(){},
        ame:function(){
            console.log("动画结束")
        },
        eve:function(){
            pageBus.$emit('change','accounttip');
        },
    },
    created: function() {

    },
    mounted: function() {
        this.init()
    }
};

export default account