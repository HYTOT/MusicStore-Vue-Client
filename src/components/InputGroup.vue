<template>
  <div class="text_group">
    <div class="input_group"
      :style="{
        borderColor: (!error ? borderColor : '#e74c3c')
      }">
      <input
        :type="type || 'text'"
        :value="value"
        :placeholder="placeholder"
        @focus="borderColor='#42b983'"
        @blur="borderColor='#95a5a6'"
        @input="$emit('input', $event.target.value)">
    </div>
    <div class="error" v-if="error">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class InputGroup extends Vue {

  private borderColor:string = '#95a5a6';

  @Prop(String) type!:string;
  @Prop(String) value!:string;
  @Prop(String) placeholder!:string;
  @Prop(String) error!:string;

}
</script>

<style lang="scss" scoped>
.text_group {
  height: 20vw;
  .input_group {
    transition: all .3s;
    display: flex;
    width: 70vw;
    margin: 3vw;
    border: .4vw solid;
    border-radius: .8vw;
    input {
      border: none;
      outline: none;
      font: {
        size: 4vw;
      }
      padding: 3vw;
      width: 30vw;
      flex: 1;
      letter-spacing: .5vw;
      &[disabled] {
        background-color: white;
      }
    }
  }
  .error {
    width: 70vw;
    height: 5vw;
    margin: -2vw 0 0 4vw;
    color: #e74c3c;
    transition: all 1s;
    font: {
      size: 3vw;
    }
  }
}
</style>
