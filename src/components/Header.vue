<template>
  <div class="header-component">
    <span class="back" v-if="back" @click="$router.go(-1)">
      <i class="iconfont icon-icon-test"></i>
      <span>返回</span>
    </span>
    <h4>{{ title }}</h4>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Header extends Vue {

  @Prop(String) title?:string;
  @Prop(Boolean) back?:boolean;

}
</script>

<style lang="scss" scoped>
.header-component {
  width: 100vw;
  height: 13vw;
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: $vue-color;
  color: white;
  @extend .flexCenter;
  h4 {
    font-size: 5vw;
    letter-spacing: .3vw;
  }
  .back {
    @extend .flexCenter;
    width: 20vw;
    height: 13vw;
    left: 0;
    position: absolute;
    font-size: 4.5vw;
    i {
      font-size: 5vw;
    }
  }
}
</style>