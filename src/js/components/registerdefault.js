import Vue from '../lib/vue.js';
import pageBus from '../common/bus'
import helper from '../common/chelper'
import Axios from '../common/axios_default'
import Validator from '../lib/vue-validator.min'
import $ from '../lib/jquery-3.2.1.min';
Vue.use(Validator)

Vue.validator('tel', function (val) {
    return /^[0-9]{11}$/.test(val)
});


let registerdefault = {
    template: ` <div class="row  content-wrap">
            <form class="register" id="register">
                <h2>Create your account now</h2>
               <div class='register-box'>  
                    <div class="input-wrap">
                        <input id="email" class="email" v-model="email"  type="email" name="email" value="" placeholder="Email address"  />
                         <div class="bottom-line" :class="this.emailerror==1?'to-red':''"></div>
                             <transition name="error-tip" v-if="emailerror==1&&emailempty==1">
                               <p class="tip-p">Please enter your Email address.</p>
                             </transition>
                                 <transition name="error-tip" v-if="emailerror==1&&emailverror==1"> 
                               <p class="tip-p">Please enter a valid Email address</p>
                             </transition>
                    </div>
                   <div class="input-wrap">
                        <input id="password" class="password" v-model="passowrd"  type="password" name="password" placeholder="Password"  value="" />
                         <div class="bottom-line" :class="this.passerror==1?'to-red':''"></div>
                             <transition name="error-tip" v-if="passerror==1&&passempty==1">
                               <p class="tip-p">Please enter your Password.</p>
                              </transition>  
                              <transition name="error-tip" v-if="passerror==1&&passverror==1">
                               <p class="tip-p more-p">Passwords must be at least 8 characters with 1 capital letter, 1 lowercase character, and 1 number, and without spaces.</p>
                             </transition>  
                    </div>
                  <div class="input-wrap" >
                      <input id="confirmword" class="password" v-model="confirmword"  type="password" name="password" placeholder="Confirm Password"  value="" />
                         <div class="bottom-line" :class="this.confirmerror==1?'to-red':''"></div>
                             <transition name="error-tip" v-if="confirmerror==1">
                               <p class="tip-p">Please enter the same value again.</p>
                              </transition>  
                  </div> 
  
                  <p class="sign-p">
                      <span class="mo-choose" :class="{chosen:haschosen}" @click.prevent.stop="haschosen=!haschosen"></span>By sign up,you agree to <span class="blue">Terms & Conditions</span> and <span class="blue">Anti-Spam Policy</span>
                  </p>
  
                  <div class="btns-out">
                      <button type="button" @click.prevent.stop="createAction">Sign Up</button>
                  </div>
                </div>
            </form>
            </div>`,
    data: function() {
        return {
            passowrd:"",
            email:"",
            confirmword:"",
            haschosen:false,
            emailerror:0,
            emailempty:0,
            emailverror:0,
            passerror:0,
            passempty:0,
            passverror:0,
            confirmerror:0,

        }
    },
    methods: {
        init:function(){

        },
        ame:function(){},
        eve:function(){
            pageBus.$emit('change','accounttip');
        },
        remoteAction: function (arg) {
            var self = this;
            var paraObj = {
                    email:arg['email'],
                    password:arg['password'],
                };
            //拦截设置,模拟请求在error完成交互
            Axios.interceptors.response.use(function (response){
                return response;
            }, function (error){
                //已经设置，进入验证页面
                let testSuccess1 = {
                    "data":{
                        "data":{
                            "success":true,
                            "data":null
                        }
                    }
                };
                //未设置，直接进入交易界面
                let testSuccess2 = {
                    "data":{
                        "data": {
                            "success": true,
                            "data": null
                        }
                    }
                };

                return Promise.reject(testSuccess1);
            });

            Axios.get('/user_account.act?cmd=registerByEmail&',{params:paraObj})
                .then(function (response) {
                    var cuData =  response.data;


                })
                .catch(function (response) {
                    console.log(response)
                     if(response.data.data.success){
                           self.$emit("registertip",{main:2,sub:6,email:self.email})
                     }
                });
        },
        createAction(){
            let email = $("#email").val().trim(),password = $("#password").val().trim(),confirmword = $("#confirmword").val().trim(),
                regEmail =/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/g,regPass=/(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8}$/g,
                check1 = true, check2 = true, check3 = true;
            this.emailerror=0;
            this.emailempty=0;
            this.emailverror=0;
            this.passerror=0;
            this.passempty=0;
            this.passverror=0;
            this.emailerror=0;
            this.confirmerror=0;
            if(email==""){
                this.emailerror = 1;
                this.emailempty = 1;
                check1= false;
            }else{
                if(!regEmail.test(email)){
                    this.emailerror = 1;
                    this.emailverror = 1;
                    check1= false;
                }
            }
            if(password==""){
                this.passerror = 1;
                this.passempty = 1;
                check2= false;
            }else{
                if(!regPass.test(password)){
                    this.passerror = 1;
                    this.passverror = 1;
                    check2= false;
                }
            }
            if(password!=confirmword){
                this.confirmerror = 1;
                check3= false;
            }
            if(check1&&check2&&check3){
                this.remoteAction({email:email,password:password});
            }
        },

    },
    created: function() {

    },
    mounted: function() {
        this.init()
    }
};

export default registerdefault
