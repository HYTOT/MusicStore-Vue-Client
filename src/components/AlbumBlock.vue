<template>
  <div class="album-block" @click="$emit('selectAlbum', album)" v-if="album">
    <img class="album-image" :src="`/images/albums/${album.Id}.jpg`">
    <p class="album-title">{{ album.Title }}</p>
    <p class="album-price">
      <span><span class="yuan">￥</span>{{ album.Price.toFixed(2) }}</span>
      <i class="iconfont icon-add" @click.stop="addToCart"></i>
    </p>
    <div class="animate-box"
      v-if="boxPos.show"
      :style="{
        top: boxPos.y,
        left: boxPos.x
      }"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class AlbumBlock extends Vue {

  @Prop(Object) album?:object;

  private boxPos:BoxConfig = {
    x: '0',
    y: '0',
    show: false
  };

  private addToCart(event):void {
    this.$emit('addToCart', this.album);
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
      }, 700);
    }, 200);
  }

}

interface BoxConfig {
  x:string;
  y:string;
  show:boolean;
}
</script>

<style lang="scss" scoped>
.album-block {
  width: 46vw;
  height: 64vw;
  margin: 2vw 1vw;
  color: #555555;
  background-color: white;
  border-radius: 2vw;
  overflow: hidden;
  .album-image {
    width: 46vw;
    height: 46vw;
  }
  .album-title {
    font-size: 4vw;
    height: 8.5vw;
    display: flex;
    align-items: center;
    padding: 0 2.5vw;
  }
  .album-price {
    padding: 0 2.5vw;
    color: #e67e22;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      .yuan {
        font-size: 3.3vw;
      }
      font: {
        size: 5.2vw;
        weight: 500;
      }
    }
    height: 7vw;
    i {
      text-align: right;
      font-size: 5vw;
      opacity: .9;
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