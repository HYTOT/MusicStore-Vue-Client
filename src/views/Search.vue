<template>
  <div class="search-view">
    <Header title="搜索" :back="true"/>
    <div class="search-box">
      <InputGroup v-model="search_val" placeholder="搜索唱片/歌手/唱片类别"/>
    </div>
    <div class="result-list">
      <ul class="album-result">
        <li v-for="album in albumResults" :key="album.Id"
          @click="$router.push({
            name: 'AlbumDetails',
            params: {album}
          })">
          <span>{{ album.Title }}</span><span>唱片</span>
        </li>
      </ul>
      <ul class="artist-result">
        <li v-for="(album, i) in artistResults" :key="i">
          <span>{{ album.Artist }}</span><span>歌手</span>
        </li>
      </ul>
      <ul class="genre-result">
        <li v-for="genre in genreResults" :key="genre.Id"
          @click="$router.push({
            name: 'Genre',
            params: {genre}
          })">
          <span>{{ genre.Name }}</span><span>类别</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import Header from '../components/Header.vue'
import InputGroup from '../components/InputGroup.vue'

@Component({
  components: {
    Header,
    InputGroup
  }
})
export default class Search extends Vue {

  private search_val:string = '';
  private albumResults:Array<any> = [];
  private artistResults:Array<any> = [];
  private genreResults:Array<any> = [];

  private searchAlbums(value):void {
    value && this.$axios.get(`/api/searchAlbums/${value}`)
    .then(res => {
      this.albumResults = res.data;
    })
    .catch(err => {
      console.error(err); 
    });
  }
  private searchArtists(value):void {
    value && this.$axios.get(`/api/searchArtists/${value}`)
    .then(res => {
      this.artistResults = res.data;
    })
    .catch(err => {
      console.error(err); 
    });
  }
  private searchGenres(value):void {
    value && this.$axios.get(`/api/searchGenres/${value}`)
    .then(res => {
      this.genreResults = res.data;
    })
    .catch(err => {
      console.error(err); 
    });
  }

  @Watch('search_val')
  watchSearch(value):void {
    value = value.replace(/'/, '');
    this.searchAlbums(value.trim());
    this.searchArtists(value.trim());
    this.searchGenres(value.trim());
  }

  private beforeRouteLeave(to, from, next):void {
    this.search_val = '';
    this.albumResults = [];
    this.artistResults = [];
    this.genreResults = [];
    next();
  }

}
</script>

<style lang="scss" scoped>
.search-view {
  .search-box {
    width: 95vw;
    height: 22vw;
    margin: 0 auto;
    padding-top: 2vw;
    @extend .flexCenter;
    border-bottom: .2vw solid $vue-color;
    border-radius: 5vw;
    position: sticky;
    top: 13vw;
    background-color: white;
  }
  .result-list {
    width: 90vw;
    margin: 0 auto;
    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      li {
        display: flex;
        width: 88vw;
        height: 10vw;
        margin: 2vw;
        justify-content: space-between;
        align-items: center;
        border-bottom: .2vw solid $vue-color;
        border-radius: 5vw;
        span {
          margin: 2vw;
          font-size: 4.3vw;
          color: #555555;
          &:nth-child(2) {
            font-size: 3.5vw;
            color: #7f8c8d;
          }
        }
      }
    }
  }
}
</style>