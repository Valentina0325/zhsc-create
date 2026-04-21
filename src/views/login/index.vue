<template>
  <div class="login">
    <van-nav-bar
  title="会员登录"
  left-arrow
  @click-left="$router.go(-1)"
/>
<div class="container">
    <div class="title">
      <h3>手机号登录</h3>
      <p>未注册手机号登录后将自动注册</p>
    </div>
    <div class="form">
      <div class="form-item">
        <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号" type="text">
      </div>
      <div class="form-item">
        <input v-model="conPic" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
        <img v-if="codePic" :src="codePic" @click="getCodepic" alt="">
      </div>
      <div class="form-item">
        <input v-model="msg" maxlength="6" class="inp" placeholder="请输入短信验证码" type="text">
        <button @click="getCode">{{second===totalSecond?'获取验证码':second+'s后重新发送'}}</button>
      </div>
    </div>
    <div class="login-btn" @click="login">登录</div>
  </div>
</div>
</template>

<script>
import { getCodepic, getCode, login } from '@/api/login'
// import { Toast } from 'vant'

export default {
  name: 'LoginIndex',
  data () {
    return {
      conPic: '',
      codePic: '',
      keyPic: '',
      totalSecond: 60,
      second: 60,
      timer: null,
      mobile: '',
      msg: ''
    }
  },
  created () {
    this.getCodepic()
  },
  methods: {
    async getCodepic () {
      const { data: { base64, key } } = await getCodepic()
      this.codePic = base64
      this.keyPic = key
      // Toast('你好呀')
      this.$toast('获取图片验证码成功')
      // this.$toast.success('成功文案')
    },
    vailFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.conPic)) {
        this.$toast('请输入正确的图片验证码')
        return false
      }
      return true
    },
    async getCode () {
      if (!this.vailFn()) {
        return
      }
      if (!this.timer && this.second === this.totalSecond) {
        this.timer = setInterval(() => {
          this.second--
          if (this.second < 1) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
        await getCode(this.conPic, this.keyPic, this.mobile)
        this.$toast('验证码发送成功，请注意查收')
      }
    },
    async login () {
      if (!this.vailFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msg)) {
        this.$toast('请输入正确的手机验证码')
        return
      }
      const res = await login(this.mobile, this.msg)
      this.$store.commit('user/setUserInfo', res.data)
      this.$router.replace(this.$route.query.backUrl || '/')
      this.$toast('登录成功')
    }

  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scope>
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
      color: var(--primary-color) !important;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    background-color: var(--primary-color) !important;
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
