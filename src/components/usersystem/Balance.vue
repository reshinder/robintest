<template>

  <div class="reports-out">
    <div class="report-unit">
      <div class="title">
        <div class="u-out">
          <span class="u-title">Balance</span>
          <span class="executed">
                   <span class="mo-choose"></span>
                   <span>(Partially) Executed</span>
                </span>
        </div>

        <div class="sub-right">
          <div class="right-unit ok">OK</div>
          <div class="right-unit">
            <span class="title-c">10.12-11.12</span>
            <span class="box-arrow"><i class="down_gray_arrow"></i></span>
          </div>
          <div class="right-unit">
            <span class="title-c">BTC/USD</span>
            <span class="box-arrow"><i class="down_gray_arrow"></i></span>
          </div>
        </div>
      </div>
      <div class="table-out">
        <table>
          <thead>
          <tr>
            <td><span class="clear-arrow">PAIR</span></td>
            <td><span>CONTEXT</span></td>
            <td><span>ORDER TYPE</span></td>
            <td><span>TYPE</span></td>
            <td><span>AMOUNT</span></td>
            <td><span>PRICE</span></td>
            <td><span>STATUS</span></td>
            <td><span>PLACES</span></td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><span>BTC/USD</span></td>
            <td><span>Exchange</span></td>
            <td><span>Limit</span></td>
            <td><span>Buy</span></td>
            <td><span>500.<span class="gy">0000</span></span><span>/</span><span>700.2<span class="gy"></span></span></td>
            <td><span>7,121.51</span></td>
            <td><span>Executed</span></td>
            <td><span>21-11-2017 10:45:32</span></td>
          </tr>
          <tr>
            <td><span>BTC/USD</span></td>
            <td><span>Exchange</span></td>
            <td><span>Limit</span></td>
            <td><span>Buy</span></td>
            <td><span>500.<span class="gy">0000</span></span><span>/</span><span>700.2<span class="gy"></span></span></td>
            <td><span>7,121.51</span></td>
            <td><span class="bc">Partially Executed</span></td>
            <td><span>21-11-2017 10:45:32</span></td>
          </tr>
          <tr>
            <td><span>BTC/USD</span></td>
            <td><span>Exchange</span></td>
            <td><span>Limit</span></td>
            <td><span>Buy</span></td>
            <td><span>500.<span class="gy">0000</span></span><span>/</span><span>700.2<span class="gy"></span></span></td>
            <td><span>7,121.51</span></td>
            <td><span class="bc">Partially Executed</span></td>
            <td><span>21-11-2017 10:45:32</span></td>
          </tr>
          <tr>
            <td><span>BTC/USD</span></td>
            <td><span>Exchange</span></td>
            <td><span>Limit</span></td>
            <td><span>Buy</span></td>
            <td><span>500.<span class="gy">0000</span></span><span>/</span><span>700.2<span class="gy"></span></span></td>
            <td><span>7,121.51</span></td>
            <td><span class="bc">Partially Executed</span></td>
            <td><span>21-11-2017 10:45:32</span></td>
          </tr>
          <tr>
            <td><span>BTC/USD</span></td>
            <td><span>Exchange</span></td>
            <td><span>Limit</span></td>
            <td><span>Buy</span></td>
            <td><span>500.<span class="gy">0000</span></span><span>/</span><span>700.2<span class="gy"></span></span></td>
            <td><span>7,121.51</span></td>
            <td><span class="bc">Partially Executed</span></td>
            <td><span>21-11-2017 10:45:32</span></td>
          </tr>
          <tr>
            <td><span>BTC/USD</span></td>
            <td><span>Exchange</span></td>
            <td><span>Limit</span></td>
            <td><span>Buy</span></td>
            <td><span>500.<span class="gy">0000</span></span><span>/</span><span>700.2<span class="gy"></span></span></td>
            <td><span>7,121.51</span></td>
            <td><span>Executed</span></td>
            <td><span>21-11-2017 10:45:32</span></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Balance',
    data () {
      return {
        msg: ''
      }
    }
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
  .reports-out{
    background: @white;
    padding: 0 30px;
    .report-unit{
      .title{
        height: 72px;
        line-height: 72px;
        padding-left:9px;
        >div{
          float:left;
          span{
            display: inline-block;
            vertical-align: middle;
            &.u-title{
              opacity: 0.9;
              font-family: HelveticaNeue-Bold;
              font-size: 24px;
              color: #000000;
              letter-spacing: 0;
            }
            &.executed{
              font-family: HelveticaNeue;
              font-size: 14px;
              color: #000000;
              letter-spacing: 0;
              .mo-choose{
                margin-left: 25px;
                margin-right: 10px;
              }
            }
          }
          &.sub-right{
            margin-top: 19px;
            float: right;
            >div{
              float: right;
              &.right-unit{
                margin-left: 20px;
                width: 124px;
                height: 32px;
                border:1px solid #b2b2b2;
                >span{
                  float:left;
                  .clearfix();
                  &.title-c{
                    float:left;
                    width: 100px;
                    height: 32px;
                    line-height: 32px;
                    text-align: center;
                    font-family: HelveticaNeue;
                    font-size: 14px;
                    color: #000000;
                    letter-spacing: 0;
                  }
                  &.box-arrow{
                    float: left;
                    position: relative;
                    width: 22px;
                    height: 32px;
                    line-height: 32px;
                    border-left:1px solid #b2b2b2;
                    &:after{
                      content: "";
                      position: absolute;
                      right: 6px;
                      top: 15px;
                      width: 0;
                      height: 0;
                      border: 4px solid transparent;
                      border-top-color: #1f4764;
                    }
                  }
                }
                &.ok{
                  width: 50px;
                  text-align: center;
                  border-radius: 2px;
                  height: 32px;
                  line-height: 32px;
                  color: #fff;
                  background: #1f4764;
                }

              }

            }
          }
        }

      }
      .table-out{
        table{
          width: 100%;
          border-collapse: collapse;
          border: none;
          text-align: center;
          thead{
            background: #f0f4f7;
            color: #b2b5b8;
            height: 50px;
            line-height: 50px;
            tr{
              background: #f0f4f7;
              td{
                text-align: center;
                font-family: HelveticaNeue;
                font-size: 12px;
                color: #a7aaac;
                letter-spacing: 0;
              }
            }
          }
          tbody{
            tr{
              height: 70px;
              line-height: 70px;
              td{
                opacity: 0.7;
                font-family: HelveticaNeue;
                font-size: 12px;
                color: #000000;
                letter-spacing: 0;
              }
              &:nth-child(even){
                background: #f0f4f7;
              }
              &:nth-child(odd){
                background: #e2eaef;
              }
            }
          }
        }
      }
    }
  }

</style>
