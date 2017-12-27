import pageBus from '../common/bus'
import Axios from '../common/axios_default';
import $ from '../lib/jquery-3.2.1.min';
import Vue from '../lib/vue.js';
import qs from '../lib/qs.js';
import VeeValidate from '../lib/vee-validate';

import cn from '../lib/zh_CN'
import { Validator } from '../lib/vee-validate';
Vue.use(VeeValidate,{
    locale: 'cn',
});

const pngBig = (value, args) => {
    return value<=10;
};

Validator.extend('pngBig', pngBig);
//自定义或者覆盖规则提示文案
const dictionary = {
    en: {
        messages: {
            pngBig: () => 'less than 4096KB.',
            required:(field, args)=>field + ' can not be empty.',
        }
    },
    cn: {
        messages: {
            pngBig: () => '必须小于4M.',
            required:(field, args)=>field + ' 不能为空.',
        }
    }
};
Validator.updateDictionary(dictionary);

let template= require('./verification.html');
let verification = {
    template: template,
    data: function() {
        return {
            idcliked:true,
            psclicked:false,
        }
    },
    methods: {
        init(){},
        changeHandler(e,index,idstr){
            let fileName = '',file, size="", type="",nameEle = $('#'+idstr);
            fileName = e.target.value.split( '\\' ).pop();
            file = e.target.files[0];
            size = file['size'];
            type=file['type'];
            nameEle.val(fileName)
            if (!file.type.match('image.*')){
                return false;
            }

            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(arg) {
                console.log(arg)
            }
        },
        verificationHandler(){ //图片地址接口要单独;
           if(1){ //验证通过
               //三张图片单独传
               let  formData = new FormData();
               if(!this.idcliked){ //id型，三张，图片
                   let  fileData1 = $("#nfp").prop("files")[0],fileData2 = $("#nbp").prop("files")[0],fileData3 = $("#self").prop("files")[0];
                   formData.append("nationalityFront",fileData1);
                   formData.append("nationalityBack", fileData2);
                   formData.append("selfiePic", fileData3);
                   let config = { //form-data,不编码
                       headers: {
                           'Content-Type': 'multipart/form-data'
                       }
                   };
                   Axios.post('/ComRankH5/sender_amount_rank',formData,config)
                       .then(function (response) {
                           console.log(response);
                       })
                       .catch(function (error) {
                           console.log(error);
                       });

                  /* Axios.post('/ComRankH5/sender_amount_rank', qs.stringify({
                       act_id: '349',
                       page: '2',
                       limit: '100',
                       pics:formData,
                   }))
                       .then(function (response) {
                           console.log(response);
                       })
                       .catch(function (error) {
                           console.log(error);
                       });*/

               }else{ //passport型，两张
                   let  fileData1 = $("#psp").prop("files")[0],fileData3 = $("#self").prop("files")[0];
                   formData.append("passportPic",fileData1);
                   formData.append("selfiePic", fileData3);
                   Axios.post('/ComRankH5/sender_amount_rank',formData)
                       .then(function (response) {
                           console.log(response);
                       })
                       .catch(function (error) {
                           console.log(error);
                       });


               }
           }

        },
        closeTip(){
            $('.modal-out').removeClass('show-box')
        },
        showbox(){
            $('.modal-out').addClass('show-box')
        },
        validateForm(scope) {
            console.log(scope)
            let self =this;
            this.$validator.validateAll(scope).then((result) => {
                if (result) {
                  self.verificationHandler()
                }
            });
        }
    },
    created() {

    },
    mounted() {
        this.init()
    }
};
export default verification