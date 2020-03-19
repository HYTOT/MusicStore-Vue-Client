<template>
  <div class="mine" v-if="getUser">
    <div class="user-info">
      <div class="logout" @click="logOut">
        <i class="iconfont icon-log_out"></i>
      </div>
      <p class="greet-title">{{ greet }}</p>
      <p class="greet-name">{{ getUser.Name }}</p>
      <p class="info-item">
        <span>联系方式：</span><span>{{ getUser.Phone }}</span>
      </p>
      <p class="info-item" @click="$router.push('/address')">
        <span>收货地址：</span>
        <span>{{ getUser.Address || '请选择收货地址' }}</span>
      </p>
      <p class="info-item">
        <span>电子邮箱：</span><span>{{ getUser.Email }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { MessageBox } from 'mint-ui'

@Component
export default class Mine extends Vue {

  private logOut():void {
    MessageBox.confirm('确定退出登录？')
    .then(action => {
      localStorage.removeItem('musicstore_login_id');
      this.$store.dispatch('setUserInfo');
      this.$router.push('/login');
    })
    .catch(() => {});
  }

  private get greet():Greet {
    let str:Greet,
        hours:number = new Date().getHours();
    if (hours >= 5 && hours < 13) {
      str = Greet.MORNING;
    } else if (hours >= 13 && hours < 19) {
      str = Greet.AFTERNOON;
    } else {
      str = Greet.EVENING;
    }
    return str;
  }
  private get getUser():object {
    return this.$store.getters.getUserInfo;
  }

}

enum Greet {
  MORNING = '上午好',
  AFTERNOON = '下午好',
  EVENING = '晚上好'
}
</script>

<style lang="scss" scoped>
.mine {
  width: 100vw;
  height: 91vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to bottom, $vue-color, white);
  .user-info {
    width: 80vw;
    height: 80vw;
    margin: 10vw;
    background-color: #FCFCFC;
    border-radius: 5vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .logout {
      width: 10vw;
      height: 10vw;
      position: absolute;
      top: 11vw;
      left: 79vw;
      @extend .flexCenter;
      i {
        font-size: 5vw;
        color: #555555;
      }
    }
    p {
      width: 100%;
      height: 7vw;
      display: flex;
      align-items: center;
    }
    .greet-title {
      font-size: 4.5vw;
      margin: 1vw;
      @extend .flexCenter;
      color: #3498db;
    }
    .greet-name {
      font-size: 7vw;
      height: 10vw;
      width: 80%;
      border-bottom: 1vw dotted $vue-color;
      margin: 4vw 0 5vw;
      padding-bottom: 10vw;
      @extend .flexCenter;
      color: #555555;
    }
    .info-item {
      font-size: 4.5vw;
      margin: 4vw 2vw;
      padding: 2vw;
      color: #7f8c8d;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        display: block;
        display: flex;
        height: 10vw;
        align-items: center;
        &:nth-child(1) {
          font-size: 3.8vw;
          flex: 1;
        }
        &:nth-child(2) {
          font-size: 4vw;
          width: 70%;
          overflow-x: scroll;
          display: flex;
          white-space: nowrap;
          // justify-content: flex-end;
        }
      }
    }
  }
}
</style>