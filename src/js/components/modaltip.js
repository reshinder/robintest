import pageBus from '../common/bus'
import $ from '../lib/jquery-3.2.1.min';

let template= require('./modaltip.html');
let modaltip = {
    template: template,
    data: function() {
        return {
            tip:0,
            showpart:"enabletfa",
            status:2,
        }
    },
    methods: {
        init:function(){},
        closeTip(){
            this.tip=1,
                $('.modal-out').removeClass('show-box').addClass('hide-box')
        },

        ame:function(){
            console.log("动画结束");
            if(this.tip==1){
                $('.modal-out').css('zIndex',-1)
            }
        }

    },
    created: function() {

    },
    mounted: function() {
        var self =this;
        this.init();
        pageBus.$on('change', function (type){
            console.log(type)
            self.tip = 0;
            self.showpart = type;
            $('.modal-out').css('zIndex',1).removeClass('hide-box').addClass('show-box')
        });
    }
};
export default modaltip


