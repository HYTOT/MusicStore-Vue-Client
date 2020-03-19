<template>
  <div class="login" :style="{height: getHeight}">
    <div class="logo"></div>
    <InputGroup v-model="userName" placeholder="用户名" :error="error.userName"/>
    <InputGroup v-model="password" placeholder="密码" :error="error.password" type="password"/>
    <button @click="handleLogin" class="login-btn">登录</button>
    <button @click="$router.push('/register')" class="register-btn">注册</button>
    <div class="copyright">
      <p>Designed By HeYang</p>
      <p>HeYang©2020</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import InputGroup from '../components/InputGroup.vue'
import { Toast } from 'mint-ui'

@Component({
  components: {
    InputGroup
  }
})
export default class Login extends Vue {

  private userName:string = '';
  private password:string = '';
  private error:LoginForm = {
    userName: '',
    password: ''
  };

  private handleLogin():void {
    if (!this.userName || !this.password) {
      if (!this.userName.trim()) {
        this.error.userName = '请填写用户名';
      }
      if (!this.password.trim()) {
        this.error.password = '请填写密码';
      }
      return;
    }
    this.checkLogin();
  }
  private checkLogin():void {
    let params = new URLSearchParams();
    params.append('userName', this.userName);
    params.append('password', this.password);
    this.$axios.post('/api/checkLogin', params)
    .then(res => {
      if (res.data.length) {
        this.$store.dispatch('setUserInfo', res.data[0]);
        localStorage.setItem('musicstore_login_id', res.data[0].Id);
        Toast(`欢迎回来，${this.$store.getters.getUserInfo.Name}`);
        this.$router.push('/home');
      } else {
        Toast({
          message: '用户名或密码错误',
          duration: 1000
        });
        this.password = '';
      }
    })
    .catch(err => {
      console.error(err); 
    });
  }

  private get getHeight():string {
    return `${document.body.clientHeight}px`;
  }

  @Watch('userName')
  refreshUserName() {
    this.error.userName = '';
  }
  @Watch('password')
  refreshPassword() {
    this.error.password = '';
  }

  private beforeRouteLeave(to, from, next):void {
    this.userName = '';
    this.password = '';
    this.error.userName = '';
    this.error.password = '';
    next();
  }

}

interface LoginForm {
  userName:string;
  password:string;
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  // height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .logo {
    width: 80vw;
    height: 40vw;
    background: {
      image: url('/images/logo.png');
      size: contain;
      repeat: no-repeat;
      position: center;
    }
  }
  .login-btn, .register-btn {
    font-size: 4.5vw;
    width: 70vw;
    height: 12vw;
    margin: 5vw;
    border: none;
    outline: none;
    border-radius: 1vw;
    background-color: $vue-color;
    color: white;
    transition: all .3s;
    &:active {
      filter: brightness(90%);
    }
    &:disabled {
      opacity: .5;
    }
  }
  .register-btn {
    background-color: #3498db;
  }
  .copyright {
    @extend .flexCenter;
    flex-direction: column;
    font-size: 3.5vw;
    position: sticky;
    top: 90vh;
    color: #7f8c8d;
    p {
      margin: .5vw;
    }
  }
}
</style>