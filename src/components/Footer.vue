<template>
  <div class="footer-component" v-if="showAdv">
    <i class="iconfont icon-guanbi" @click="$emit('closeAdv')">关闭</i>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Footer extends Vue {

  @Prop(Boolean) showAdv!:boolean;

}
</script>

<style lang="scss" scoped>
.footer-component {
  width: 100vw;
  height: 13vw;
  color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  i {
    margin: 2vw;
    font: {
      size: 5vw;
      weight: bold;
    }
  }
  background: {
    image: url('/images/footer.png');
    size: cover;
    // repeat: no-repeat;
    position: center;
  }
}
</style>