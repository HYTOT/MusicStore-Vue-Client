<template>
  <div class="album-details" v-if="album">
    <Header title="唱片详情" :back="true"/>
    <div class="linear"></div>
    <div class="details-container">
      <img class="details-img" :src="`/images/albums/${album.Id}.jpg`">
      <p class="details-price">
        <span><span class="yuan">￥</span>{{ album.Price.toFixed(2) }}</span>
        <i class="iconfont icon-add" @click="addToCart"></i>
      </p>
      <p class="details-title">《{{ album.Title }}》</p>
      <p class="details-artist">—— {{ album.Artist }}</p>
      <p class="details-time">发行时间：{{ dateFormat }}</p>
      <p class="details-description">{{ album.Description }}</p>
    </div>
    <div class="animate-box"
      v-if="boxPos.show"
      :style="{
        top: boxPos.y,
        left: boxPos.x
      }"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Header from '../components/Header.vue'
import { Toast, Indicator } from 'mint-ui'

@Component({
  components: {
    Header
  }
})
export default class AlbumDetails extends Vue {

  private album:any = null;
  private boxPos:BoxConfig = {
    x: '0',
    y: '0',
    show: false
  };

  private addToCart(event):void {
    this.$store.dispatch('addToCart', this.album);
    this.boxPos = {
      x: `${event.clientX - 10}px`,
      y: `${event.clientY - 10}px`,
      show: true
    };
    setTimeout(() => {
      this.boxPos = {
        x: `50vw`,
        y: `91vh`,
        show: true
      };
      setTimeout(() => {
        this.boxPos = {
          x: `0`,
          y: `0`,
          show: false
        };
        Toast({
          message: '已加入购物车',
          duration: 1000
        });
      }, 700);
    }, 200);
  }

  private get dateFormat():string {
    let date = this.album.DateReleased.split(/[T\.]/);
    return `${date[0]} ${date[1]}`;
  }

  private beforeRouteEnter(to, from, next):void {
    next(vm => {
      !vm.$route.params.album && vm.$router.push('/home');
      Indicator.open();
      setTimeout(() => {
        vm.album = vm.$route.params.album;
        Indicator.close();
      }, 500);
    });
  }
  private beforeRouteLeave(to, from, next):void {
    this.album = null;
    next();
  }

}

interface BoxConfig {
  x:string;
  y:string;
  show:boolean;
}
</script>

<style lang="scss" scoped>
.album-details {
  width: 100vw;
  height: 91vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  .linear {
    width: 100vw;
    height: 50vw;
    position: sticky;
    top: 12.5vw;
    z-index: 0;
    background: linear-gradient(to bottom, $vue-color, white);
  }
  .details-container {
    width: 68vw;
    height: 100vw;
    position: sticky;
    z-index: 1;
    margin-top: -45vw;
    .details-img {
      width: inherit;
      // box-shadow: 0 0 10vw gray;
      border-radius: 3vw;
    }
    .details-price {
      padding: 2vw;
      color: #e67e22;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        display: flex;
        align-items: center;
        .yuan {
          font-size: 4vw;
          padding: 1vw;
        }
        font: {
          size: 7vw;
          weight: 500;
        }
      }
      i {
        font-size: 6vw;
      }
    }
    .details-title {
      font-size: 5vw;
    }
    .details-artist {
      font-size: 4.5vw;
      padding: 1vw 3vw;
    }
    .details-time {
      padding: 1vw 3vw;
      font-size: 3.6vw;
      color: #95a5a6;
      text-align: right;
    }
    .details-description {
      margin: 2vw 0;
      text-indent: 2rem;
      font-size: 3.5vw;
      color: #555555;
    }
  }
  .animate-box {
    position: absolute;
    width: 5vw;
    height: 5vw;
    border-radius: 50%;
    background-color: #e74c3c;
    box-shadow: 0 0 1vw #e74c3c;
    z-index: 5;
    transition: .6s;
  }
}
</style>