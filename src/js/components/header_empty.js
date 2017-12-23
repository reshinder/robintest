
import pageBus from '../common/bus'
let template= require('./header_empty.html');
let header_empty = {
    template: template,
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