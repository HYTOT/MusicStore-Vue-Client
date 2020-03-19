<template>
  <div class="register" :style="{height: getHeight}">
    <Header title="注册新用户" :back="true"/>
    <div class="logo"></div>
    <div class="first" v-if="first">
      <InputGroup v-model="userName" placeholder="登录用户名" :error="error.userName"/>
      <InputGroup v-model="password1" placeholder="登录密码" :error="error.password1" type="password"/>
      <InputGroup v-model="password2" placeholder="确认密码" :error="error.password2" type="password"/>
    </div>
    <div class="second" v-else>
      <InputGroup v-model="name" placeholder="起个好听的昵称" :error="error.name"/>
      <InputGroup v-model="phone" placeholder="留个联系手机号" :error="error.phone" type="number"/>
      <InputGroup v-model="email" placeholder="留个联系邮箱" :error="error.email"/>
    </div>
    <button @click="nextStep" v-if="first" class="register-btn">下一步</button>
    <button @click="first = true" v-else class="register-btn">返回上一步</button>
    <button @click="submitForm" class="register-btn" v-if="!first">完成注册</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Toast } from 'mint-ui'
import Header from '../components/Header.vue'
import InputGroup from '../components/InputGroup.vue'

@Component({
  components: {
    Header,
    InputGroup
  }
})
export default class Register extends Vue {

  private first:boolean = true;
  private userName:string = '';
  private password1:string = '';
  private password2:string = '';
  private name:string = '';
  private phone:string = '';
  private email:string = '';
  private error:RegisterForm = {
    userName: '',
    password1: '',
    password2: '',
    name: '',
    phone: '',
    email: ''
  };

  private get getHeight():string {
    return `${document.body.clientHeight}px`;
  }

  private nextStep():void {
    if (!this.userName || !this.password1 || !this.password2) {
      if (!this.userName.trim()) {
        this.error.userName = '请填写登录用户名';
      }
      if (!this.password1) {
        this.error.password1 = '请填写登录密码';
      }
      if (!this.password2) {
        this.error.password2 = '请再次填写登录密码';
      }
      return;
    }
    if (this.password1 !== this.password2) {
      this.error.password2 = '两次填写密码须一致';
      return;
    }
    if (!this.error.userName) {
      this.first = false;
    }
  }
  private submitForm():void {
    if (!this.name || !this.phone || !this.email) {
      if (!this.name.trim()) {
        this.error.name = '请填写昵称';
      }
      if (!this.phone) {
        this.error.phone = '请填写手机';
      }
      if (!this.email.trim()) {
        this.error.email = '请填写邮箱';
      }
      return;
    } else {
      if (!/^1\d{10}$/.test(this.phone)) {
        this.error.phone = '手机号须为1开头的11位数字';
        return;
      }
      let emailReg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
      if (!emailReg.test(this.email)) {
        this.error.email = '邮箱格式有误';
        return;
      }
    }
    let formData:RegisterForm = {
      userName: this.userName,
      password1: this.password1,
      password2: this.password2,
      name: this.name,
      phone: this.phone,
      email: this.email
    };
    let params = new URLSearchParams();
    params.append('formData', JSON.stringify(formData));
    this.$axios.post('/api/register', params)
    .then(res => {
      Toast({
        message: '注册成功',
        duration: 1000
      });
      setTimeout(() => {
        this.$router.push('/login');
      }, 2000);
    })
    .catch(err => {
      console.error(err); 
    });
  }
  private checkUserName():void {
    this.$axios.get(`/api/checkUserName/${this.userName.trim()}`)
    .then(res => {
      res.data.length && (this.error.userName = '该用户名已被使用');
    })
    .catch(err => {
      console.error(err);
    });
  }

  @Watch('userName')
  refreshUserName() {
    this.error.userName = '';
    this.userName && this.checkUserName();
  }
  @Watch('password1')
  refreshPassword1() {
    this.error.password1 = '';
    this.error.password2 = '';
  }
  @Watch('password2')
  refreshPassword2() {
    this.error.password2 = '';
  }
  @Watch('name')
  refreshName() {
    this.error.name = '';
  }
  @Watch('phone')
  refreshPhone() {
    this.error.phone = '';
  }
  @Watch('email')
  refreshEmail() {
    this.error.email = '';
  }

  private beforeRouteLeave(to, from, next):void {
    this.first = true;
    this.userName = '';
    this.password1 = '';
    this.password2 = '';
    this.name = '';
    this.phone = '';
    this.email = '';
    for (let key in this.error) {
      if (this.error.hasOwnProperty(key)) {
        this.error[key] = '';
      }
    }
    next();
  }

}

interface RegisterForm {
  userName:string;
  password1:string;
  password2:string;
  name:string;
  phone:string;
  email:string;
}
</script>

<style lang="scss" scoped>
.register {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  .logo {
    width: 80vw;
    height: 25vw;
    background: {
      image: url('/images/logo.png');
      size: contain;
      repeat: no-repeat;
      position: center;
    }
  }
  .register-btn {
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
}
</style>