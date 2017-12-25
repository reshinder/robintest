import pageBus from '../common/bus'
import $ from '../lib/jquery-3.2.1.min';
import Vue from '../lib/vue.js';
let addressbook = {
    template: `<div class="address-book">
    <h2>Currency Addresses</h2>
    <table>
        <thead>
         <tr>
            <th>Currency</th>
            <th>Address Name</th>
            <th>Address</th>
            <th>Option</th>
         </tr>
        </thead>
        <tbody>
           <tr>
               <td>BTC</td>
               <td>My BTC address</td>
               <td>ABCDEFRHILKLMN</td>
               <td class="bc pl50 cup" @click.prevent.stop="eve(5)">Delete</td>
           </tr>
           <tr>
               <td>BTC</td>
               <td>My BTC address</td>
               <td>ABCDEFRHILKLMN</td>
               <td class="bc pl50 cup" @click.prevent.stop="eve(5)">Delete</td>
           </tr>
           <tr>
               <td>BTC</td>
               <td>My BTC address</td>
               <td>ABCDEFRHILKLMN</td>
               <td class="bc pl50 cup" @click.prevent.stop="eve(5)">Delete</td>
           </tr>
           <tr>
               <td>BTC</td>
               <td>My BTC address</td>
               <td>ABCDEFRHILKLMN</td>
               <td class="bc pl50 cup" @click.prevent.stop="eve(5)">Delete</td>
           </tr>
        </tbody>
    </table>

</div>`,
    data: function() {
        return {

        }
    },
    components: {

    },
    methods: {
        init:function(){

        },
        eve:function(index){
            pageBus.$emit('change',index);
        },

    },

    created: function() {

    },

    mounted: function() {
        this.init()
    }
};
export  default addressbook;