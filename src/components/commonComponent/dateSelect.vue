<template>
  <div
      style="position: absolute; width: 50%; left: 0; right: 0; top: 115px; margin: auto;z-index:999"
  >
      <el-form
          :inline="true"
          :model="queryForm"
          class="filter-form"
          label-position="left"
      >
          <!-- @mouseover.native="handleOver"
          @mouseleave.native="handleLeave" -->
          <div class="filter-box">
              <!-- v-show="show" -->
              <!-- <div class="filter-item">
                  <el-form-item label="校区:">
                      <el-select v-model="queryForm.campusCode">
                          <el-option
                              v-for="item in campusList"
                              :label="item.name"
                              :value="item.id"
                              :key="item.id"
                          ></el-option>
                      </el-select>
                  </el-form-item>
              </div> -->
              <div class="filter-item filter-item1" style="flex:2;">
                  <el-form-item label="时间:">
                      <el-date-picker
                          value-format="yyyy-MM-dd HH:mm:ss"
                          format="yyyy-MM-dd HH:mm:ss"
                          v-model="queryForm.statisticDate"
                          type="datetimerange"
                          range-separator="至"
                          start-placeholder="开始"
                          end-placeholder="结束"
                          prefix-icon="el-icon-date"
                      >
                      </el-date-picker>
                      <!-- <el-date-picker
                          value-format="yyyy-MM-dd"
                          format="yyyy-MM-dd"
                          v-model="queryForm.statisticDate"
                          type="date"
                          placeholder="选择日期">
                      </el-date-picker> -->
                  </el-form-item>
              </div>
              <div class="filter-item granBox">
                  <el-form-item label="粒度:">
                      <el-select v-model="queryForm.granularity">
                          <el-option
                              label="半小时"
                              :value="1"
                          ></el-option>
                          <el-option
                              label="一小时"
                              :value="2"
                          ></el-option>
                          <el-option
                              label="两小时"
                              :value="3"
                          ></el-option>
                      </el-select>
                  </el-form-item>
              </div>
              <div class="btn-search">
                  <el-button
                      type="search"
                      icon="el-icon-search"
                      @click="handlerSearch"
                      >查询
                  </el-button>
              </div>
          </div>
      </el-form>
      <div class="bottom-time-box" v-if="staticTime.length">
          <div class="bottom-time-top">
              <swiper
                  :options="{
                      slidesPerView: 9,
                      centeredSlides: true,
                      allowTouchMove: false
                  }"
                  ref="time-swiper"
              >
                  <!--  判断重复播放   -->
                  <swiper-slide
                      class="swiper-slide"
                      v-for="(item, index) in (staticTime[dateIndex]?staticTime[dateIndex]:staticTime[staticTime.length-1])
                          .times"
                      :key="index"
                  >
                      {{ item.times }}
                  </swiper-slide>
                  <!-- 左右箭头 -->
                  <div
                      @click="handlerPre('time-swiper')"
                      class="swiper-button-prev"
                      slot="button-prev"
                  ></div>
                  <div
                      @click="handlerNext('time-swiper')"
                      class="swiper-button-next"
                      slot="button-next"
                  ></div>
              </swiper>
          </div>
          <div class="bottom-time-z">
              <img src="../../assets/img/pointer.png" width="12" />
          </div>
          <div class="bottom-time-bottom">
              <swiper
                  :options="{
                      slidesPerView: 5,
                      centeredSlides: true,
                      allowTouchMove: false,
                  }"
                  ref="date-swiper"
              >
                  <swiper-slide
                      class="swiper-slide"
                      v-for="(item, index) in staticTime"
                      :key="index"
                  >
                      {{ item.date }}
                  </swiper-slide>
                  <!-- 左右箭头 -->
                  <div
                        @click="handlerPre('date-swiper')"
                      class="swiper-button-prev"
                      slot="button-prev"
                  ></div>
                  <div
                      @click="handlerNext('date-swiper')"
                      class="swiper-button-next"
                      slot="button-next"
                  ></div>
              </swiper>
          </div>
      </div>
  </div>
</template>

<script>
import {
  Form,
  FormItem,
  DatePicker,
  Button,
  Select,
  Option
} from 'element-ui'
export default {
  components: {
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [DatePicker.name]: DatePicker,
    [Button.name]: Button,
    [Select.name]: Select,
    [Option.name]: Option,
  },
  data(){
    return {
      queryForm: {
          // 提交表单数据
          statisticType: 2,
          campusCode: "",
          statisticDate: [],
          // granularity: 1
      },
      staticTime: [{
        date: '2021-11-15',
        times: [{times: "00:00", recordId: 10506},
        {recordId: 10509, times: "07:00"},
        {recordId: 10512, times: "08:00"},
        {recordId: 10515, times: "09:00"},
        {times: "10:00", recordId: 10518},
        {times: "11:00", recordId: 10521},
        {times: "12:00", recordId: 10524},
        {times: "13:00", recordId: 10527},
        {recordId: 10530, times: "14:00"},
        {recordId: 10533, times: "15:00"},
        {recordId: 10536, times: "16:00"},
        {times: "17:00", recordId: 10539},
        {times: "18:00", recordId: 10542},
        {recordId: 10545, times: "19:00"},
        {recordId: 10548, times: "20:00"},
        {recordId: 10551, times: "21:00"},
        {times: "22:00", recordId: 10554},
        {times: "23:00", recordId: 10557}]
      }],
      dateIndex: 0,
      playTimer: null,
      timeIndex: 0,
    }
  },
  methods: {
    // 搜索
    handlerSearch() {
        // this.playTimer && clearTimeout(this.playTimer);
        // this.getStaticTime().then(() => {
        //     this.dateIndex = 0;
        //     this.timeIndex = 0;
        //     this.play();
        // });
    },
    handlerPre(ref) {
        this.playTimer && clearTimeout(this.playTimer);
        if(/date/.test(ref)) {
            if(this.dateIndex > 0){
                this.dateIndex --
            }
        } else {
            if(this.timeIndex > 0) {
                this.timeIndex --
            }
        }
        this.play()
    },

    handlerNext(ref) {
        this.playTimer && clearTimeout(this.playTimer);
        if(/date/.test(ref)) {
            this.dateIndex ++
        } else {
            this.timeIndex ++
        }
        this.play()
    },
    // 播放
        play() {
          if (!this.staticTime.length) {
              console.log(
                  `${new Date().toLocaleString()} [error]: 时间轴长度为0`
              );
              return;
          }
          if (this.timeIndex >= this.staticTime[this.dateIndex].times.length) {
              this.timeIndex = 0;
              this.dateIndex++;
              // if (this.dateIndex >= this.staticTime.length){
              //     this.playTimer && clearTimeout(this.playTimer);
              //     this.playTimer = setTimeout(()=>{
              //         //实时获取时间，调用时间段接口
              //         // this.queryForm.statisticDate[0]=etLastOrNextFewDateBy();
              //         // this.queryForm.statisticDate[1]=parseTime(new Date())
              //         this.getStaticTime().then(()=>{
              //             this.dateIndex = 0;
              //             this.timeIndex = 0;
              //             this.play();
              //         });
              //     },15000);
              //     return;
              // }
          }
          this.$refs["time-swiper"].$swiper.slideTo(this.timeIndex);
          this.$refs["date-swiper"].$swiper.slideTo(this.dateIndex);

          console.log(`${new Date().toLocaleString()} [info] dateIndex:${this.dateIndex} timeIndex:${this.timeIndex}`);

          // this.getStatisticByRecordId().then(() => {
          //     this.playTimer = setTimeout(() => {
          //         this.timeIndex++
          //         // this.dateIndex = 0;
          //         // 递归播放
          //         this.play();
          //     }, 15000);
          // });
      },
  }
}
</script>

<style lang="less" scoped>
.filter-form {
    z-index: 1;
    // width: 60%;
    margin: 0 auto 15px;
    padding: 10px 20px;
    background-image: url("../../assets/img/biankuang4.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .filter-box {
        display: flex;
        align-items: center;
        padding: 0 16px;
        background: rgba(1, 18, 45, 0.4);
        position: relative;
        z-index: 9999;
    }
    .filter-item {
        /*flex: 1;*/
        padding: 0 10px;
        .el-form-item {
            display: flex;
            margin: 0;
            /deep/.el-form-item__label{
              color: rgba(255, 255, 255, 0.8);
            }
            /deep/ .el-select .el-input .el-select__caret {
                color: #19f2fa;
            }

            /deep/ .el-input .el-input__inner,
            .el-select .el-input__inner {
                border: none;
                color: #19f2fa;
                background-color: transparent;
                background-image: url("../../assets/img/biankuang1.png");
                background-size: 100% 100%;
                background-repeat: no-repeat;
                height: 30px;
                line-height: 30px;
            }

            /deep/ .el-select .el-input__inner::placeholder,
            .el-input .el-input__inner::placeholder {
                color: #19f2fa;
            }

            /deep/ .el-icon-date {
                color: #19f2fa;
                line-height: 24px;
            }

            /deep/ .el-form-item__content {
                flex: 1;
                max-width: 180px;
            }

            /deep/ .el-date-editor--datetimerange {
                border: none;
                color: #19f2fa;
                background-color: transparent;
                background-image: url("../../assets/img/biankuang3.png");
                background-size: 100% 100%;
                background-repeat: no-repeat;
                width: 100%;
                height: 30px;
                line-height: 30px;
            }

            /deep/ .el-range-input {
                color: #19f2fa;
                background-color: transparent;
            }

            /deep/ .el-range-separator {
                color: #19f2fa;
                line-height: 24px;
            }
        }
    }

    .filter-item1 {
        flex: 1;

        /deep/ .el-form-item__content {
            flex: 1;
            max-width: 900px !important;
        }
    }

    .btn-search {
        width: 80px;
        height: 30px;
        text-align: center;

        /deep/ .el-button--search {
            width: 100%;
            height: 100%;
            border: none;
            color: #19f2fa;
            background-color: transparent;
            background-image: url("../../assets/img/biankuang1.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            padding: 0;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            span{
                margin: 0;
            }
        }
    }
}
.bottom-time-box {
    z-index: 1;
    padding: 14px 0;
    height: 70px;
    // width: 60%;
    margin: 0 auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #fff;
    background-image: url("../../assets/img/biankuang4.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .bottom-time-top {
        width: 100%;
        height: 20px;
    }

    .bottom-time-z {
        font-size: 14px;
        color: #fff;
        display: flex;
        justify-content: center;
        img{
            display: block;
        }
    }

    .bottom-time-bottom {
        font-size: 14px;
    }
    /deep/ .swiper-slide {
        font-size: 14px;
        text-align: center;
        user-select: none;
    }

    /deep/ .swiper-slide-active {
        color: turquoise;
        font-weight: bold;
    }

    /deep/ .swiper-button-next:after,
    .swiper-button-prev:after {
        font-size: 14px;
    }
}
</style>
<style lang="less">
.el-select-dropdown{
    background-color: rgba(10, 25, 46, 0.85) !important;
    border-color: #3F97CF !important;
    .el-select-dropdown__item{
        color: #25B5C2;
        &:hover{
            background-color: rgba(24, 59, 98, 0.8) !important;
        }
    }
    .hover{
        background-color: rgba(24, 59, 98, 0.8) !important;
    }
    .popper__arrow{
       border-bottom-color: #6AB0FF !important;
       &::after{
           border-bottom-color: #6AB0FF !important;
       }
    }
}
.el-popper{
    .el-date-range-picker__editor{
        background: url("../../assets/img/bg-date.png") no-repeat;
        background-size: 100% 100%;
    }
    .el-input__inner{
        background-color: transparent !important;
        color: #25B5C2 !important;
        border: none;
        &::placeholder{
            color: #25B5C2;
        }
    }
    .el-time-panel{
        background-color: rgba(24, 59, 98, 0.9) !important;
        border-color: rgba(106, 176, 255, 0.4) !important;
        .el-time-panel__content::after, .el-time-panel__content::before{
            border-color: rgba(106, 176, 255, 0.4) !important;
        }
        .el-time-spinner__item{
            color: rgba(255,255,255,0.8);
        }
        .el-time-spinner__item.active:not(.disabled){
            color: #25b5c2;
        }
        .el-time-spinner__item:hover:not(.disabled):not(.active){
            background-color: rgba(37, 181, 194,0.5);
        }
        .el-time-panel__footer{
            border-color: rgba(106, 176, 255, 0.4) !important;
            .cancel{
                color: rgba(255,255,255,0.8);
            }
        }
    }
    .el-date-range-picker__time-header,.el-date-range-picker__content{
        border-color: rgba(106, 176, 255, 0.4) !important;
    }
    .el-picker-panel__footer{
        border-color: rgba(106, 176, 255, 0.4) !important;
        background-color: rgba(24, 59, 98, 0.8) !important;
    }
    .el-picker-panel__link-btn{
        padding: 7px 15px;
        border-radius: 3px;
    }
    .el-button--text{
        border: 1px solid #25B5C2;
        color: #25B5C2;
    }
    .el-button--default{
        border-color: #25B5C2 !important;
        background: #25B5C2 !important;
        color: #fff !important;
    }
    .popper__arrow{
       border-bottom-color: #6AB0FF !important;
       &::after{
           border-bottom-color: #6AB0FF !important;
       }
    }
}
</style>