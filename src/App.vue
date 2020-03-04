<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'


@Component
export default class App extends Vue {

  private created():void {
    if (!this.$store.getters.getUserInfo) {
      let userId = localStorage.getItem('musicstore_login_id');
      if (userId) {
        this.$axios.get(`/api/getUserById/${userId}`)
        .then(res => {
          this.$store.dispatch('setUserInfo', res.data[0]);
        })
        .catch(err => {
          console.error(err); 
        });
      }
    }
  }

}
</script>

<style lang="scss">
#app {
  background-color: white;
}
</style>