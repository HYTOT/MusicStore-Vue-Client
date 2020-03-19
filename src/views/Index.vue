<template>
  <div class="index">
    <keep-alive>
      <router-view/>
    </keep-alive>
    <TabBar :tabBarList="tabBarList"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TabBar from '../components/TabBar.vue'
import { Toast } from 'mint-ui'

@Component({
  components: {
    TabBar
  }
})
export default class Index extends Vue {

  private tabBarList:Array<TabBarItem> = [
    {id: 1, title: '首页', path: '/home', icon: 'icon-shouye'},
    {id: 2, title: '购物车', path: '/cart', icon: 'icon-gouwuche'},
    {id: 3, title: '我的', path: '/mine', icon: 'icon-wodejuhuasuan'}
  ];

  created() {
    Toast(`欢迎回来，${this.$store.getters.getUserInfo.Name}`);
  }

}

interface TabBarItem {
  id:number;
  title:string;
  path:string;
  icon:string;
}
</script>

<style lang="scss" scoped>

</style>