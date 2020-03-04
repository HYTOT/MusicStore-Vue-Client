<template>
  <div class="home">
    <header class="home-header">
      <div class="header-left">
        <div class="home-search" @click="$router.push('/search')">
          <i class="iconfont icon-sousuo"></i>
          <span>搜索唱片/歌手/唱片类别</span>
        </div>
      </div>
      <div class="header-right">
        <i class="iconfont icon-icon_message"></i>
      </div>
    </header>
    <div class="linear"></div>
    <div class="home-swiper" v-if="loadFinish">
      <div class="home-swiper-inner">
        <mt-swipe :auto="5000" :speed="600">
          <mt-swipe-item v-for="i in 5" :key="i">
            <img :src="`/images/lun${i-1}.jpg`">
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </div>
    <nav class="genres">
      <ul>
        <li class="genre-item" v-for="(item, i) in genres" :key="i"
          @click="$router.push({
            name: 'Genre',
            params: {genre: item}
          })"
          :style="{
            color: `hsl(${i*45}, 50%, 50%)`
          }">
          <i 
            class="iconfont icon-changpian"
            :style="{
              transform: `rotate(${i*40}deg)`
            }"></i>
          <span>{{ item.Name }}</span>
        </li>
      </ul>
    </nav>
    <div class="hot-block" v-if="loadFinish">
      <h1 class="hot-title" v-if="loadFinish">最新热销</h1>
      <div class="hot-container">
        <AlbumBlock
          @selectAlbum="$router.push({
            name: 'AlbumDetails',
            params: {album: item}
          })"
          @addToCart="addToCart(item)"
          v-for="(item, i) in newAlbums"
          :key="i" :album="item"/>
      </div>
    </div>
    <Footer :showAdv="showAdv" @closeAdv="showAdv = false"/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AlbumBlock from '../components/AlbumBlock.vue'
import Footer from '../components/Footer.vue'
import { Swipe, SwipeItem, Toast } from 'mint-ui'
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

@Component({
  components: {
    AlbumBlock,
    Footer
  }
})
export default class Home extends Vue {

  private genres:Array<object> = [];
  private newAlbums:Array<object> = [];
  private showAdv:boolean = true;

  private getGenres():void {
    this.$axios.get('/api/getAllGenres')
    .then(res => {
      this.genres = res.data;
    })
    .catch(err => {
      console.error(err);
    });
  }
  private getNewAlbums():void {
    this.$axios.get('/api/getNewAlbums')
    .then(res => {
      this.newAlbums = res.data;
    })
    .catch(err => {
      console.error(err);
    });
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

  private get loadFinish():boolean {
    return (!!this.genres && !!this.newAlbums);
  }

  private created():void {
    this.getGenres();
    this.getNewAlbums();
  }

}
</script>

<style lang="scss" scoped>
.home {
  height: 91vh;
  overflow: scroll;
  .home-header {
    width: 100vw;
    height: 15vw;
    position: sticky;
    top: 0;
    z-index: 3;
    background-color: $vue-color;
    display: flex;
    align-items: center;
    .header-left {
      width: 85vw;
      height: inherit;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      .home-search {
        width: 76vw;
        height: 9vw;
        margin: 3vw;
        background-color: white;
        border-radius: 10vw;
        display: flex;
        align-items: center;
        font-size: 3.6vw;
        color: #7f8c8d;
        letter-spacing: .1vw;
        opacity: .95;
        i {
          margin: 3vw;
          font-size: 4vw;
        }
      }
    }
    .header-right {
      flex: 1;
      display: flex;
      align-items: center;
      margin: 0 2vw;
      height: inherit;
      i {
        font-size: 7vw;
      }
      color: white;
    }
  }
  .linear {
    width: 100vw;
    height: 50vw;
    background: linear-gradient(to bottom, $vue-color, white);
  }
  .home-swiper {
    width: 100vw;
    height: 90vw;
    margin-top: -50vw;
    .home-swiper-inner {
      width: 90vw;
      height: inherit;
      margin: 0 auto;
      border-radius: 3vw;
      overflow: hidden;
      img {
        width: 90vw;
        height: 90vw;
      }
    }
  }
  .genres {
    height: 24vw;
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: white;
    box-shadow: 0 3vw 5vw rgba(222, 222, 222, .5);
    ul {
      display: flex;
      list-style: none;
      overflow-x: scroll;
      .genre-item {
        width: 18vw;
        height: 24vw;
        flex-shrink: 0;
        flex-direction: column;
        @extend .flexCenter;
        i {
          font-size: 12vw;
        }
        font-size: 4vw;
      }
    }
  }
  .hot-block {
    width: 100vw;
    padding-bottom: 3vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #EAEAEA;
    .hot-title {
      color: #555555;
      border-bottom: 1vw dotted $vue-color;
      width: 35vw;
      margin: 3vw;
      padding: 2vw;
      font-size: 6vw;
      text-align: center;
    }
    .hot-container {
      display: flex;
      flex-wrap: wrap;
      width: 96vw;
    }
  }
}
</style>