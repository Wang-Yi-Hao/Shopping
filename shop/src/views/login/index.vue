<template>
  <div id="login">
    <!-- 头部 -->
    <van-nav-bar
      title="会员登录"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 登录主体 -->
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input class="inp" v-model="mobile" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="this.picUrl" :src="this.picUrl" @click="getPicCode" alt="">
        </div>
        <div class="form-item">
          <input class="inp" v-model="smsCode" placeholder="请输入短信验证码" type="text">
          <button @click="getCode()">
            {{ second === totalSecomd ? '获取短信验证码' : second + '秒后重新发送' }}
          </button>
        </div>
      </div>

      <div class="login-btn" @click="login()">登录</div>
    </div>
  </div>
</template>

<script>
import { getMsgCode, getPicCode, codeLogin } from '@/api/login'

export default {
  name: 'LoginIndex',
  data () {
    return {
      picCode: '', // 用户输入的验证码
      mobile: '', // 用户输入的手机号
      pickey: '', // 验证码标识
      picUrl: '', // 图片地址
      totalSecomd: 60, // 总秒数
      second: 60, // 当前秒数
      timer: null, // 定时器id
      smsCode: ''
    }
  },
  created () {
    this.getPicCode()
  },
  methods: {
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64
      this.pickey = key
    },
    // 获取短信验证码
    async getCode () {
      if (!this.validFn()) {
        return
      }
      // 开启倒计时
      if (!this.timer && this.second === this.totalSecomd) {
        await getMsgCode(this.picCode, this.pickey, this.mobile)
        this.$toast('短信发送成功，请注意查收')
        this.second--
        this.timer = setInterval(() => {
          this.second--

          // 清除定时器并归位
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.second = this.totalSecomd
            this.timer = null
          }
        }, 1000)
      }
    },
    // 校验手机号和验证码
    validFn () {
      if (!/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.smsCode)) {
        this.$toast('请输入正确的短信验证码')
        return
      }
      const res = await codeLogin(this.mobile, this.smsCode)
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast('登陆成功')
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
    }
  },
  // 离开页面清除定时器
  directives () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
