<template>
  <div class="tabbar">
    <ul>
      <li
        v-for="(item, i) in tabBarList"
        :key="i"
        :class="{'active': $route.path === item.path}"
        @click="($route.path !== item.path) && $router.push(item.path)">
        <div
          v-if="item.path === '/cart' && goodsCount !== '0'"
          class="goods-count"
          :style="{
            fontSize: countFontSize
          }">
          {{ goodsCount }}
        </div>
        <i class="iconfont" :class="item.icon"></i>
        <span>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class TabBar extends Vue {

  @Prop(Array) tabBarList?:Array<any>;

  private get goodsCount():string {
    return `${this.$store.getters.getCart.length}`;
  }
  private get countFontSize():string {
    let length = this.goodsCount.length;
    let result = `${22 - length*2}`.split('');
    return `${result[0]}.${result[1]}vh`;
  }

}
</script>

<style lang="scss" scoped>
.tabbar {
  width: 100vw;
  height: 9vh;
  position: fixed;
  top: 91vh;
  ul {
    display: flex;
    list-style: none;
    li {
      background-color: $vue-color;
      display: block;
      height: 9vh;
      flex: 1;
      color: #bdc3c7 + 10;
      font-size: 2.4vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: all .3s;
      &.active {
        color: white;
        text-shadow: 0 0 10vw white;
        background-color: $vue-color + 10;
      }
      i {
        font-size: 3vh;
      }
      .goods-count {
        width: 2.5vh;
        height: 2.4vh;
        position: absolute;
        left: 50vw;
        bottom: 6.5vh;
        background-color: #e74c3c;
        color: white;
        text-align: center;
        line-height: 3vh;
        border-radius: 2.4vh;
      }
    }
  }
}
</style>