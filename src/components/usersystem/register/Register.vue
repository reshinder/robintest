<template>
   <router-view></router-view>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: 'Register',
    components:{},
    data: function() {
      return {
        screenWidth:"",
        bVerification:1,
        emailerror:0,
        emailempty:0,
        emailverror:0,
        passerror:0,
        passempty:0,
        passverror:0,
        email:"",
        password:"",
      }
    },
    methods: {
      init:function(){
       // this.fixView()
      },
      fixView(){
        var header = $('.head-wrap').outerHeight(true),footer = $('.footer-e').outerHeight(true);
        $('.content-wrap').css('height',$(window).height()-(header+footer))
      },
      remoteAction: function (arg) {
        var self = this;
        var paraObj = {
          loginName:arg['email'],
          password:arg['password'],
        };
        Axios.get('/user_account.act?cmd=login&',{params:paraObj})
          .then(function (response) {
            let cuData = response.data;
            alert(cuData.success)
            if(cuData.success){
              if(cuData.data.execute){
                this.$store.commit('SAVE_BASE_DATA',paraObj); //保存输入信息
                helper.setItem('identifier',cuData.data.identifier);
                if(cuData.data.identifier==1){
                  self.$router.push({ path: '/authentication/google_authentication' })
                }else if(cuData.data.identifier==2){
                  self.$router.push({ path: '/authentication/sms_authentication' })
                }
              }else{
                self.$router.push({ path: '/trade' })
              }
            }else{
              alert(cuData.message)
            }
          })
          .catch(function (response) {
            console.log(response)
          });
      },
      loginAction(){
        var self=this,email = $('#email'),password = $('#password'),tem = {}, check1 = true, check2= true, check = false;
        var regEmail =/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/g,regPass=/(?![0-9A-Z]+$)(?![0-9a-z]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8}$/g;
        this.emailerror=0;
        this.emailempty=0;
        this.passerror=0;
        this.passempty=0;
        this.passverror=0;
        if(email.val().trim()==""){
          this.emailerror = 1;
          this.emailempty = 1;
          check1 = false;
        }else{
          if(!regEmail.test(email.val().trim())){
            this.emailerror = 1;
            this.emailverror = 1;
            check1 = false;
          }
        }
        if(password.val().trim()==""){
          this.passerror = 1;
          this.passempty = 1;
          check2 = false;
        }else{
          if(!regPass.test(password.val().trim())){
            this.passerror = 1;
            this.passverror = 1;
            check2 = false;
          }
        }
        if(check1 == true&&check2 == true){
          tem['loginName'] = email.val().trim();
          tem['password'] = password.val().trim();
          this.remoteAction();
        }
      }
    },
    watch: {
      screenWidth (val) {
        if (!this.timer) {
          this.screenWidth = val
          this.timer = true
          let that = this
          setTimeout(function () {
            that.init()
            that.timer = false
          }, 400)
        }
      }
    },
    mounted(){
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
        })()
      }
    }
  }
</script>

<style rel="stylesheet/less" lang="less" scoped>

</style>
