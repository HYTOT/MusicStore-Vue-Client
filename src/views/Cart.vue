<template>
  <div class="cart">
    <Header title="购物车"/>
    <div class="linear"></div>
    <div class="goods-list" v-if="getCart.length">
      <div class="clearCart">
        <span @click="clearCart"><i class="iconfont icon-shanchu"></i>清空购物车</span>
      </div>
      <ul>
        <li v-for="(item, i) in getCart" :key="i"
          @click="$router.push({
            name: 'AlbumDetails',
            params: {album: item.goods}
          })">
          <img :src="`/images/albums/${item.goods.Id}.jpg`">
          <div class="goods-info">
            <p class="goods-title">《{{ item.goods.Title }}》</p>
            <p class="goods-artist">{{ item.goods.Artist }}</p>
            <div class="counter-container">
              <p class="price"><span>￥</span>{{ item.goods.Price.toFixed(2) }}</p>
              <div class="counter">
                <span @click.stop="subCount(item)">-</span>
                <span @click.stop>{{ item.count }}</span>
                <span @click.stop="addCount(item.goods)">+</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="empty" v-else>
      <h1>购物车竟然是空的</h1>
      <h3>“ 再忙，也要记得买点唱片犒赏自己~ ”</h3>
    </div>
    <div class="totalPrice" v-if="getCart.length">
      <p><span>合计：￥</span><span>{{ getTotal.toFixed(2) }}</span></p>
      <div class="buy" @click="generateOrder">去结算</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Header from '../components/Header.vue'
import { MessageBox, Toast } from 'mint-ui'

@Component({
  components: {
    Header
  }
})
export default class Cart extends Vue {

  private clearCart():void {
    MessageBox.confirm('确定清空购物车？')
    .then(action => {
      this.$store.dispatch('clearCart');
    })
    .catch(() => {});
  }
  private subCount(album):void {
    if (album.count === 1) {
      MessageBox.confirm('是否将该唱片移出购物车？')
      .then(action => {
        this.$store.dispatch('removeFromCart', album.goods.Id);
      })
      .catch(() => {});
    } else {
      this.$store.dispatch('removeFromCart', album.goods.Id);
    }
  }
  private addCount(album):void {
    this.$store.dispatch('addToCartImmediately', album);
  }
  private generateOrder():void {
    if (!this.$store.getters.getUserInfo.Address) {
      MessageBox.confirm('请先选择收货地址！')
      .then(action => {
        this.$router.push('/address');
      })
      .catch(() => {});
      return;
    }
    MessageBox.confirm(`确认支付${this.getTotal.toFixed(2)}元？`, '微信支付')
    .then(action => {
      let params = new URLSearchParams();
      params.append('cart', JSON.stringify(this.getCart));
      params.append('user', JSON.stringify(this.$store.getters.getUserInfo));
      params.append('total', `${this.getTotal}`);
      this.$axios.post('/api/generateOrder', params)
      .then(res => {
        setTimeout(() => {
          Toast({
            message: '交易成功',
            iconClass: 'iconfont icon-success',
            duration: 2000
          });
          this.$store.dispatch('clearCart');
        }, 500);
      })
      .catch(err => {
        MessageBox.alert('交易失败');
      })
    })
    .catch(() => {});
  }

  private get getCart():Array<any> {
    let storeCart:Array<any> = this.$store.getters.getCart;
    let cart:Array<CartGoods> = [];
    for (let i = 0; i < storeCart.length; i++) {
      let exist = false;
      for (let j = 0; j < cart.length; j++) {
        if (storeCart[i].Id === cart[j].goods.Id) {
          exist = true;
          cart[j].count++;
        }
      }
      exist || cart.push({
        goods: storeCart[i],
        count: 1
      });
    }
    return cart;
  }
  private get getTotal():number {
    let cart = this.getCart,
        sum = 0;
    cart.forEach(item => {
      sum += (item.goods.Price * item.count);
    });
    return sum;
  }

}

interface CartGoods {
  goods: any;
  count: number;
}
</script>

<style lang="scss" scoped>
.cart {
  width: 100vw;
  height: 85vh;
  overflow: scroll;
  .linear {
    width: 100vw;
    height: 50vw;
    position: sticky;
    top: 12.5vw;
    z-index: 0;
    background: linear-gradient(to bottom, $vue-color, white);
  }
  .goods-list {
    width: 90vw;
    margin: -50vw auto;
    padding-bottom: 10vw;
    position: sticky;
    z-index: 0;
    border-radius: 3vw;
    .clearCart {
      width: 100%;
      height: 10vw;
      background: linear-gradient(to right, #16a085, white);
      border-radius: 3vw;
      border: .3vw solid $vue-color;
      font-size: 4vw;
      i {
        font-size: 4vw;
      }
      color: #555555;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 3vw;
    }
    ul {
      list-style: none;
      li {
        width: 90vw;
        height: 30vw;
        display: flex;
        border-radius: 3vw;
        border-bottom: .3vw solid $vue-color;
        background-color: white;
        color: #555555;
        img {
          width: 28vw;
          margin: 1vw;
          border-radius: 3vw;
        }
        .goods-info {
          flex: 1;
          .goods-title {
            font-size: 4vw;
            padding: 2vw 0;
            height: 10vw;
          }
          .goods-artist {
            font-size: 4vw;
            padding-left: 3vw;
            height: 10vw;
          }
          .counter-container {
            display: flex;
            height: 10vw;
            justify-content: space-between;
            align-items: center;
            .price {
              color: #e67e22;
              margin: 1vw;
              font-size: 6vw;
              span {
                font-size: 3vw;
              }
            }
            .counter {
              width: 30vw;
              height: 8vw;
              border: .2vw solid #bdc3c7;
              border-radius: 2vw;
              display: flex;
              align-items: center;
              text-align: center;
              margin: 1vw;
              span {
                font-size: 6vw;
                display: block;
                width: 31%;
                &:nth-child(2) {
                  width: 38%;
                  border: {
                    left: .1vw solid #bdc3c7;
                    right: .1vw solid #bdc3c7;
                  }
                  font-size: 5vw;
                }
              }
            }
          }
        }
      }
    }
  }
  .empty {
    width: 90vw;
    height: 45vw;
    margin: -20vw auto;
    position: sticky;
    z-index: 1;
    border-radius: 10vw;
    color: #7f8c8d;
    font-size: 3.5vw;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    letter-spacing: .5vw;
    h3 {
      color: #95a5a6;
    }
  }
  .totalPrice {
    position: fixed;
    z-index: 2;
    width: 100vw;
    height: 8vh;
    top: 83vh;
    display: flex;
    background-color: #16a085;
    p {
      flex: 1;
      background-color: #ecf0f1;
      border-top-right-radius: 8vh;
      border-bottom-right-radius: 8vh;
      display: flex;
      align-items: center;
      color: #e67e22;
      border: .2vh solid #16a085;
      font-size: 5vh;
      padding: 2vw;
      span:nth-child(1) {
        font-size: 2.2vh;
      }
    }
    .buy {
      @extend .flexCenter;
      width: 30vw;
      color: white;
      font-size: 3vh;
      background-color: #16a085;
    }
  }
}
</style>