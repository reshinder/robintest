import $ from '../lib/jquery-3.2.1.min';
import Vue from '../lib/vue.js';
import pageBus from '../common/bus.js';

import account from './account.js';
import notification from './notification.js';
import security from './security.js';
import addressbook from './addressbook.js';
import verification from './verification.js';

let template= require('./pannel.html');

let pannel = {
    template: template,
    data: function() {
        return {
            bVerification:1,
            currentView: 'account',
            active:0
        }
    },
    components: {
        account: account,
        security: security,
        notification: notification,
        addressbook: addressbook,
        verification: verification,
    },
    methods: {
        init(){

        },
        toggleTabs (tabName,index) {
            this.currentView = tabName;
            this.active = index;
        }
    },

    created() {},

    mounted() {
        this.init()
    }
};

export default pannel