<template>
  <div class="login">
    <div class="login_box">
      <div
        style="width:100%;height:20%;line-height:0.5rem;font-size:0.1rem;text-align: center;"
      >
        用户登录
      </div>
      <div class="login_name">
        <img src="../assets/img/user_name.png" alt="" />
        <label for="" style="line-height:0.25rem;margin-left:5%;width:18%"
          >用户名</label
        >
        <input
          type="text"
          class="username"
          v-model="username"
          placeholder="请输入用户名"
        />
      </div>
      <div class="login_name">
        <img src="../assets/img/password.png" alt="" />
        <label for="" style="line-height:0.25rem;margin-left:5%;width:18%"
          >密码</label
        >
        <input
          type="password"
          class="username"
          v-model="passWord"
          placeholder="请输入密码"
          @keyup.enter="log()"
        />
      </div>
      <div class="pass">
        <van-checkbox v-model="checked" shape="square" icon-size="16px"
          >记住密码</van-checkbox
        >
      </div>
      <van-button type="info" size="normal" @click="log">登录</van-button>
    </div>
  </div>
</template>
<script>
import { Toast, Button, Checkbox } from "vant";
import md5 from "js-md5";
import { localSetItem } from "@/utils/storage";
export default {
  name: "material",
  components: {
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
  },
  data() {
    return {
      checked: true,
      username: "",
      passWord: "",
    };
  },
  created() {
    this.getCookie();
  },

  methods: {
    // 登录
    log() {
      //记住密码
      if (this.checked) {
        this.setCookie(this.username, this.passWord, 7);
      } else {
        this.clearCookie();
      }
      //判断登录
      if (this.username == "admin" && this.passWord == "Ioc!@#456") {
        localSetItem("username", this.username);
        this.$router.push("/");
      } else {
        Toast.fail("账号或密码错误");
      }
      // var qs = require('qs');
      // this.$http.post(hostURL+'user/validate',
      //   qs.stringify({ 'userCode': this.username,'password':md5(this.passWord)})
      // ).then(res=>{
      //   if(res.data.code == 200){
      //     localSetItem("username",this.username)
      //     this.$router.push('/')
      //   }else{
      //       Toast.fail('账号或密码错误');
      //   }
      // });
    },
    //设置cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        // console.log(arr)
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //   console.log(arr2);
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.username = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.passWord = arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    },
    //调试
  },
};
</script>
<style lang="less">
.login {
  width: 100%;
  height: 56.25vw;
  background: url("../assets/img/loginbg.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  .login_box {
    width: 2.2rem;
    height: 35%;
    position: absolute;
    left: 60%;
    top: 30%;
    background: url("../assets/img/login_box.png") no-repeat;
    background-size: 100% 100%;
    color: #fff;
    .login_name {
      display: flex;
      width: 80%;
      height: 13%;
      border: 1px solid #0c4271;
      border-radius: 0.05rem;
      margin: 0 auto;
      background-color: rgba(14, 17, 55, 0.7);
      font-size: 0.08rem;
      margin-top: 5%;
      > img {
        width: 8%;
        height: 60%;
        margin: 3% 0 0 5%;
      }
      .username {
        width: 53%;
        margin-left: 5%;
        border: none;
        background-color: rgba(14, 17, 55, 0.7);
        padding-left: 5%;
      }
    }
    .pass {
      margin: 3% 0 0 12%;
      .van-checkbox {
        .van-checkbox__label {
          color: #fff;
        }
      }
    }
    .van-button {
      width: 80%;
      font-size: 0.09rem;
      margin-top: 8%;
      height: 10%;
    }
  }
}
</style>
