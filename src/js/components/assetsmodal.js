import Axios from '../common/axios_default';
import pageBus from '../common/bus'
import $ from '../lib/jquery-3.2.1.min';

let template= require('./assetsmodal.html');
let assetsmodal = {
    template: template,
    data: function() {
        return {
            showpart:0, // 0 :超级码提示； 1.二维码 2:set up authentication
        }
    },
    methods: {
        init:function(){

        },
        closeTip(){
              this.tip=1;
                $('.modal-out').removeClass('show-box').addClass('hide-box')
        },

        ame:function(){
            if(this.tip==1){
                $('.modal-out').css('zIndex',-1)
            }
        }

    },
    watch: {
        smsCode: function (val) {
            var self =this;
            if(String(val).length>6){
                self.smsTab =2;
                $("#getcode").html("Submit");
                clearInterval(self.timers);
                self.timers = null;
            }
        },

    },
    created: function() {
       console.log("create")
    },
    mounted: function() {
        var self =this;
        this.init();
        pageBus.$on('change', function (type){
            self.showpart = type;
            console.log(type)
            $('.modal-out').css('zIndex',1).removeClass('hide-box').addClass('show-box')
        });

    }
};
export default assetsmodal


