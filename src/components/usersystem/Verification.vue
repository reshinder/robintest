<template>
  <form class="verification" @submit.prevent="validateForm('form-1')"  data-vv-scope="form-1">
    <div class="unit ver">
      <h2>verification</h2>
      <p class="big-mb">Verification is required for USD deposit,and USD withdrawal.Please enter your personal information and update the material
        needed for verification. After all the information is complete,the compliance team will begin to review,and you are able
        to monitor the progress towards verification.
      </p>
      <p class="gan">Verification is required for USD deposit,and USD withdrawal.Please enter your personal information and update the material
        needed for verification.</p>
      <p class="gan">Verification is required for USD deposit,and USD withdrawal.Please enter your personal information and update the material
        needed for verification.</p>
    </div>
    <div class="unit name">
      <h2>Name</h2>
      <div class="input-row">
        <div class="input-out">
          <label>Family Name</label>
          <div class="input-inner">
            <input type="text" name="familyname" id="familyname" v-validate="'required'" data-vv-delay="500" value="" />
            <i :class="{'bottom-line':true,'to-red':errors.has('form-1.familyname')}"></i>
            <transition name="error-tip" v-if="errors.has('form-1.familyname')">
              <span class="is-danger">{{ errors.first('form-1.familyname') }}</span>
            </transition>
          </div>
        </div>
        <div class="input-out">
          <label>Given Name</label>
          <div class="input-inner">
            <input type="text" name="givenname" id="givenname" v-validate="'required'" data-vv-delay="500" value="" />
            <i :class="{'bottom-line':true,'to-red':errors.has('form-1.givenname')}"></i>
            <transition name="error-tip" v-if="errors.has('form-1.givenname')">
              <span class="is-danger">{{ errors.first('form-1.givenname') }}</span>
            </transition>
          </div>
        </div>
      </div>
      <div class="input-row">
        <div class="input-out">
          <label>Nationality</label>
          <div class="input-inner">
            <input type="text" name="nationality" id="nationality" v-validate="'required'" data-vv-delay="500" value="" />
            <i :class="{'bottom-line':true,'to-red':errors.has('form-1.nationality')}"></i>
            <transition name="error-tip" v-if="errors.has('form-1.nationality')">
              <span class="is-danger">{{ errors.first('form-1.nationality') }}</span>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <div class="unit identity">
      <h2>Identity</h2>
      <div class="input-out radio-wrap">
        <div class="radio-row">
          <span class="radio" :class="{clicked:idcliked}" @click.prevent.stop="idcliked=!idcliked;psclicked=false;"></span><span>National ID card</span>
        </div>
        <div class="radio-row">
          <span class="radio" :class="{clicked:psclicked}" @click.prevent.stop="psclicked=!psclicked;idcliked=false;"></span><span>Passport</span>
        </div>
      </div>
      <div class="input-row">
        <div class="input-out">
          <label>Card Number</label>
          <div class="input-inner">
            <input type="text" name="cardnumber" id="cardnumber" v-validate="'required'" data-vv-delay="500" value="" />
            <i :class="{'bottom-line':true,'to-red':errors.has('form-1.cardnumber')}"></i>
            <transition name="error-tip" v-if="errors.has('form-1.cardnumber')">
              <span class="is-danger">{{ errors.first('form-1.cardnumber') }}</span>
            </transition>
          </div>
        </div>
        <div class="input-out">
          <label>Card Country</label>
          <div class="input-inner">
            <input type="text" name="cardcountry" id="cardcountry" v-validate="'required'" data-vv-delay="500" value="" />
            <i :class="{'bottom-line':true,'to-red':errors.has('form-1.cardcountry')}"></i>
            <transition name="error-tip" v-if="errors.has('form-1.cardcountry')">
              <span class="is-danger">{{ errors.first('form-1.cardcountry') }}</span>
            </transition>
          </div>
        </div>
      </div>
      <div class="input-row">
        <div class="input-out">
          <label>Expiration date</label>
          <div class="input-inner date-out">
            <span class="date-icon"></span>
            <input type="text" name="expiradate" id="expiradate" v-validate="'required'" placeholder="2017-12-20" data-vv-delay="500" value="" />
            <i :class="{'bottom-line':true,'to-red':errors.has('form-1.expiradate')}"></i>
            <transition name="error-tip" v-if="errors.has('form-1.expiradate')">
              <span class="is-danger">{{ errors.first('form-1.expiradate') }}</span>
            </transition>
          </div>
        </div>
      </div>
      <p>Pleasure make sure the photo is complate and clearly visible,photo size cannot exceed 4M,and the passport or Id
        card is in the valid period</p>
      <div class="upload-out">
        <div class="upload" v-if="idcliked">
          <span class="u-out cup">Upload<input type="file" name="nfp" id="nfp"  @change="changeHandler($event,1,'nf')" /></span>
          <div class="png-input">
            <input type="text" class="fg" id="nf"  placeholder="National Id card front" readonly="readonly" />
            <!-- <transition name="error-tip" v-if="nopic1||toobig1">
                 <span class="is-danger" v-if="nopic1">非图片文件</span>
                 <span class="is-danger" v-if="toobig1">图片不能大于4M</span>
             </transition>-->

          </div>
        </div>
        <div class="upload" v-if="idcliked">
          <span class="u-out cup">Upload<input type="file" id="nbp" @change="changeHandler($event,1,'nb')" /></span>
          <input type="text" class="fg" id="nb" placeholder="National Id card back" readonly="readonly" />
        </div>

        <div class="upload" v-if="psclicked">
          <span class="u-out cup">Upload<input type="file" id="psp" @change="changeHandler($event,2,'ps')" /></span>
          <input type="text" class="fg" id="ps" placeholder="National Id card back" readonly="readonly" />
        </div>
      </div>

    </div>
    <div class="unit selfie">
      <h2>Selfie with identity and Note</h2>
      <div class="note-out">
        <div class="left">

        </div>
        <div class="right">
          <p>Pleasure make sure the photo is complate and clearly visible,photo size cannot exceed 4M,and the passport or Id
            card is in the valid period</p>
          <h5>REQUIRED:</h5>
          <ul>
            <li>Face clearly visible1</li>
            <li>Face clearly visible2</li>
            <li>Face clearly visible3</li>
            <li>Face clearly visible4</li>
            <li>Face clearly visible5</li>
          </ul>

        </div>
      </div>
      <div class="upload-out">
        <div class="upload">
          <span class="u-out cup">Upload<input type="file" id="self" @change="changeHandler($event,3,'nop')" /></span>
          <input type="text" id="nop" class="fg" placeholder="Passport BIO page" readonly="readonly" />
        </div>
      </div>
      <div class="sub-mit">
        <button type="submit">Submit</button>
      </div>
    </div>
  </form>
</template>

<script>

  export default {
    name: 'Verification',
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
  }
</script>

<style rel="stylesheet/less" lang="less" >
  @import "../../assets/css/base.less";
  .app{
    background-color: @bgcolor;
  }
  .user-content{
    min-height: 700px;
    .table-set{
      border-collapse: collapse;
      border: none;
      tr{
        margin-bottom: 34px;
        opacity: 0.7;
        font-family: HelveticaNeue;
        font-size: 14px;
        line-height: 16px;
        color: #000000;
        td,th{
          text-align: left;
          height: 40px;
          line-height: 40px;
          overflow:hidden;
          white-space: nowrap;
          text-overflow:ellipsis;
          &:nth-child(1){width:250px}
          &:nth-child(2){width:160px}
          &:nth-child(3){width:95px}
          &:nth-child(4){width:95px}
        }
      }
    }
  }
  @media (max-width: 768px){
    .user-content{
      min-height: 100px;
      .table-set{
        table-layout:fixed;
        width: 100%;
        tr{
          td,th{
            text-align: center;
            &:nth-child(1){width:auto}
            &:nth-child(2){width:auto;}
            &:nth-child(3){width:auto;}
            &:nth-child(4){width:auto;}
          }
        }
      }
      td,th{
        word-wrap:break-word;
        word-break:break-all;
      }
    }

  }


  body,html{
    background-color: @bgcolor;
  }
  .content-wrap{
    margin-top: 20px;
    margin-bottom: 100px;
    .l-panel{
      float: left;
      width: 15%;
      margin-right: 20px;
      background-color: @white;
      >ul{
        margin-left: -15px;
        margin-right: -15px;
        li{
          height: 70px;
          line-height: 70px;
          text-align: center;
          opacity: 0.9;
          font-family: HelveticaNeue;
          font-size: 14px;
          color: #000000;
          &:last-child{
            border-bottom: 0;
          }
          &:hover{
            background: #6C94B0;;
            color: #fff;
            cursor: pointer;
          }
          &.active{
            color: #fff;
            background: #6C94B0;
          }
          &.report{
            ul{
              li{
                height: 50px;
                line-height: 50px;
                font-family: HelveticaNeue;
                font-size: 14px;
                color: #000000;
                letter-spacing: 0;
                background: #f7f8f9;
                &.active,&:hover{
                  border-left:3px solid #6c94b0;
                  color: #6c94b0;
                  background: #fff;
                }
                .arrow{
                  background: #fff;
                }
              }
            }
          }
        }
      }
    }
    .r-tab{
      float: left;
      position: relative;
      width: 83%;
      padding: 0;

    }
  }

  .verification{
    .unit {
      margin-bottom: 10px;
      padding: 21px 40px;
      background: #fff;
      h2 {
        margin-bottom: 32px;
        opacity: 0.9;
        font-family: HelveticaNeue-Bold;
        font-size: 24px;
        color: #000000;
        letter-spacing: 0;
      }
      p{
        position: relative;
        margin-bottom: 10px;
        opacity: 0.7;
        font-family: HelveticaNeue;
        font-size: 14px;
        color: #000000;
        letter-spacing: 0;
        line-height: 24px;
        &:last-child{
          margin-bottom: 0;
        }
        &.big-mb{
          margin-bottom: 18px;
        }
        &.gan{
          &:before{
            margin-right: 14px;
            content: "";
            display: inline-block;
            vertical-align: middle;
            width: 12px;
            height: 12px;
            border-radius: 6px;
            background:#abab21 ;
          }
        }
      }
      >.input-row{
        .clearfix();
        height: 30px;
        margin-bottom: 34px;
        &:last-child{
          margin-bottom: 12px;
        }
        .input-out{
          .clearfix();
          float: left;
          label {
            float: left;
            width: 120px;
            height: 30px;
            line-height: 30px;
          }
          .input-inner{
            position: relative;
            float: left;
            width: 260px;
            height: 30px;
            &.date-out{
              position: relative;
              .date-icon{
                position: absolute;
                right: 8px;
                top: 4px;
                width: 16px;
                height: 18px;
                border: 1px solid blue;
              }
            }
            input{
              padding-left: 12px;
              width: 260px;
              height: 30px;
              line-height: 30px;
              border: 0;
            }
          }

          &:first-child{
            margin-right: 116px;
          }

        }
      }

      .radio-wrap{
        .clearfix();
        .radio-row{
          float: left;
          margin: 39px auto 31px;
          font-family: HelveticaNeue;
          font-size: 18px;
          color: #000000;
          letter-spacing: 0;
          line-height: 23px;
          span{
            display: inline-block;
            vertical-align: middle;
            &.radio{
              margin-right: 18px;
              position: relative;
              width: 22px;
              height: 22px;
              border-radius: 11px;
              border:1px solid #b6b63f;
            }
          }
          &:first-child{
            margin-right: 150px;
          }
        }
      }
      .upload-out{
        .upload{
          .clearfix();
          margin-bottom: 30px;
          >span,input{
            float: left;
          }
          >span{
            margin-right: 30px;
            width: 90px;
            height: 34px;
            line-height: 34px;
            text-align: center;
            color: #fff;
            border-radius: 2px;
            background: #6c94b0;
            cursor: pointer;
            &.u-out{
              cursor: pointer;
              position: relative;
              input{
                left: 0;
                top:0;
                position: absolute;
                z-index: 66;
                width: 100%;
                height: 100%;
                opacity: 0;
                cursor: pointer;

              }
            }
          }
          input{
            width: 260px;
            height: 34px;
            line-height: 34px;
            padding: 0 15px;
            border: 0;
            border-bottom: 1px solid #5e5e5e;
            &.fg{
              text-align: center;
              overflow:hidden;
              text-overflow: ellipsis;
            }
          }
          .red-tip{
            margin-left: 20px;
            height: 34px;
            line-height: 34px;
            float: left;
            font-family: HelveticaNeue;
            font-size: 12px;
            color: #D94242;
            letter-spacing: 0;
          }
        }
      }
      &.identity{
        >p{
          margin-bottom: 22px;
          opacity: 0.7;
          font-family: HelveticaNeue;
          font-size: 14px;
          color: #000000;
          letter-spacing: 0;
        }

      }
      &.selfie{
        .note-out{
          margin-bottom: 42px;
          .clearfix();
          .left{
            margin-right: 20px;
            float: left;
            width: 140px;
            height: 160px;
            background: #e8e8e8;
          }
          .right{
            p{
              opacity: 0.9;
              font-family: HelveticaNeue;
              font-size: 14px;
              color: #000000;
              letter-spacing: 0;
              line-height: 24px;
            }
            h5{
              margin-bottom: 6px;
              opacity: 0.7;
              font-family: HelveticaNeue;
              font-size: 14px;
              color: #000000;
              letter-spacing: 0;
              text-transform: uppercase;
            }
            ul{
              .clearfix();
              li{
                float: left;
                width: 40%;
                line-height: 26px;
              }
            }

          }
        }
        .sub-mit{
          margin-top: 10px;
          text-align:right;
          button{
            width: 120px;
            height: 42px;
            line-height: 42px;
            text-align: center;
            color:#fff;
            background: #1F4764;
            border-radius: 2px;
            cursor: pointer;
          }
        }
      }

    }
  }

  @media screen and (max-width:768px) {
    .verification{
      .unit {
        >.input-row{
          height: auto;
          .input-out{
            float: none;
            &:first-child{
              margin-right: 0;
            }

          }
        }

        .radio-wrap{
          .clearfix();
          .radio-row{
            margin: 18px auto 16px;
            &:first-child{
              margin-right: 150px;
            }
          }
        }
        .upload-out{
          .upload{
            .clearfix();
            margin-bottom: 30px;
            >span,input{
              float: left;
            }
            >span{
              margin-right: 30px;
              width: 90px;
              height: 34px;
              line-height: 34px;
              text-align: center;
              color: #fff;
              border-radius: 2px;
              background: #6c94b0;
            }
            input{
              width: 260px;
              height: 34px;
              line-height: 34px;
              padding: 0 15px;
              border: 0;
              border-bottom: 1px solid #5e5e5e;
            }
            .red-tip{
              margin-left: 20px;
              height: 34px;
              line-height: 34px;
              float: left;
              font-family: HelveticaNeue;
              font-size: 12px;
              color: #D94242;
              letter-spacing: 0;
            }
          }
        }
        &.identity{
          >p{
            margin-bottom: 22px;
            opacity: 0.7;
            font-family: HelveticaNeue;
            font-size: 14px;
            color: #000000;
            letter-spacing: 0;
          }

        }
        &.selfie{
          .note-out{
            display: box;
            display: -webkit-box;
            display: -moz-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            .right{
              -webkit-flex: 1;
              -ms-flex: 1;
              -webkit-box-flex: 1;
              -moz-box-flex: 1;
              flex: 1;
            }
          }
        }

      }
    }
  }

</style>
