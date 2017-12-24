
import pageBus from '../common/bus'
let header_empty = {
    template: ` <div class="container-fluid head-out">
        <div class="row">
            <div class="logo">Superbit</div>
             <div class="login-enter">
                 <p>Alredy have an account? <a href="login.html">Log in</span></p>
             </div>
        </div>
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
        eve:function(){
            pageBus.$emit('change','deltip'); //Hub触发事件
        },

    },

    created: function() {

    },

    mounted: function() {
        this.init()
    }
};
export  default header_empty;