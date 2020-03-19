<template>
  <div class="genre-list" v-if="genre">
    <Header :title="`类别：${genre.Name}`" :back="true"/>
    <div class="genre-block-container">
      <div class="genre-block">
        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
          <li v-for="(item, i) in albums" :key="i">
            <AlbumBlock
              @selectAlbum="$router.push({
                name: 'AlbumDetails',
                params: {album: item}
              })"
              @addToCart="addToCart(item)"
              :album="item"/>
          </li>
        </ul>
      </div>
    </div>
    <div class="loading">
      <span>{{ loadMsg }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Header from '../components/Header.vue'
import AlbumBlock from '../components/AlbumBlock.vue'
import { Toast, InfiniteScroll } from 'mint-ui'
Vue.use(InfiniteScroll)

@Component({
  components: {
    Header,
    AlbumBlock
  }
})
export default class Genre extends Vue {

  private genre:any = null;
  private albums:Array<object> = [];
  private page:number = 0;
  private allLoaded:boolean = false;
  private loadMsg:string = '上拉加载更多';
  // 页面首次创建
  private init:boolean = true;

  private loadMore():void {
    !this.allLoaded && this.getAlbums();
  }
  private getAlbums():void {
    this.loadMsg = '拼命加载中...';
    this.$axios.get(`/api/getAlbumsByGenreId/${this.genre.Id}/${this.page}`)
    .then(res => {
      if (!res.data.length) {
        this.allLoaded = true;
        this.loadMsg = '没有更多数据了';
      } else {
        this.albums.push(...res.data);
        this.page++;
        if (res.data.length < 5) {
          this.allLoaded = true;
          this.loadMsg = '没有更多数据了';
        } else {
          this.loadMsg = '上拉加载更多';
        }
      }
      this.albums.length || (this.loadMsg = '该类别暂无数据');
    })
    .catch(err => {
      console.error(err); 
    })
  }
  private addToCart(album):void {
    this.$store.dispatch('addToCart', album);
    setTimeout(() => {
      Toast({
        message: '已加入购物车',
        duration: 1000
      });
    }, 900);
  }

  private beforeRouteEnter(to, from, next):void {
    next(vm => {
      vm.$route.params.genre && (vm.genre = vm.$route.params.genre);
      if (vm.genre) {
        !vm.init && vm.getAlbums();
        vm.init = false;
      } else {
        vm.$router.push('/home');
      }
    });
  }
  private beforeRouteLeave(to, from, next):void {
    this.albums = [];
    this.page = 0;
    this.allLoaded = false;
    next();
  }

}
</script>

<style lang="scss" scoped>
.genre-list {
  width: 100vw;
  height: 91vh;
  background-color: #EAEAEA;
  overflow: scroll;
  .genre-block-container {
    width: 100vw;
    display: flex;
    justify-content: center;
    .genre-block {
      width: 96vw;
      ul {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
    }
  }
  .loading {
    width: 100vw;
    height: 10vw;
    font-size: 4vw;
    color: #7f8c8d;
    display: flex;
    justify-content: center;
  }
}
</style>