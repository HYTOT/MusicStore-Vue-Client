<template>
  <div class="address">
    <Header title="选择收货地址" :back="true"/>
    <div class="search-box">
      <InputGroup v-model="search_val" placeholder="搜索地区/街道等"/>
    </div>
    <div class="result-list">
      <ul class="address-result">
        <li v-for="(address, i) in addressResult" :key="i"
          @click="selectAddress(address)">
          <span v-if="address.name.length<15">{{ address.name }}</span>
          <span v-else><marquee>{{ address.name }}</marquee></span>
          <span>{{ address.district.slice(address.district.indexOf('省')+1) }}</span>
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
export default class Address extends Vue {

  private search_val:string = '';
  private addressResult:Array<any> = [];

  private searchAddress(value):void {
    AMap.plugin('AMap.Autocomplete', () => {
      let autoOptions = {
        city: '广州',
        datatype: 'poi'
      };
      let autoComplete= new AMap.Autocomplete(autoOptions);
      autoComplete.search(value, (status, result) => {
        this.addressResult = result.tips;
      });
    });
  }
  private selectAddress(address):void {
    console.log(address);
    let user = this.$store.getters.getUserInfo;
    user.Address = `${address.district}${address.name}`;
    let params = new URLSearchParams();
    params.append('user', JSON.stringify(user));
    this.$axios.post('/api/updateAddress', params)
    .then(res => {
      console.log(res.data);
      this.$router.go(-1);
    })
    .catch(err => {
      console.error(err); 
    });
  }

  @Watch('search_val')
  watchSearch(value):void {
    value = value.replace(/'/, '');
    this.searchAddress(value.trim());
  }

  private beforeRouteLeave(to, from, next):void {
    this.search_val = '';
    this.addressResult = [];
    next();
  }

}

declare let AMap:any;
</script>

<style lang="scss" scoped>
.address {
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
          &:nth-child(1) {
            font-size: 4.2vw;
            color: #555555;
            width: 65%;
            overflow-x: scroll;
            display: flex;
            white-space: nowrap;
          }
          &:nth-child(2) {
            font-size: 3vw;
            color: #7f8c8d;
            overflow-x: scroll;
            display: flex;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>