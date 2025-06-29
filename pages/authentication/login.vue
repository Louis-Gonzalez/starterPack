<script setup lang="ts">
import { ref } from 'vue'
import MyComponent from '../../components/common/MyComponent.vue';
const myComponentProps = ref('This is my props')
const countHtml = ref(0)

const htmlButtonMore = () =>{
  countHtml.value++
}

const htmlButtonLess = () =>{
  countHtml.value--
}
</script>

<template>
  <h1>This is Login Page</h1>
  <p>
    Aliquam blandit urna sit amet magna cursus, et dignissim ipsum molestie.
    Mauris interdum, enim quis gravida lacinia, quam mauris pretium urna, at
    volutpat lectus quam a ex. Pellentesque vel ullamcorper leo. Vivamus a
    lacinia neque, vitae tempor diam. Fusce convallis maximus lectus. Maecenas
    ut lectus sed diam feugiat laoreet vitae eu ligula. Aenean maximus id sapien
    eget luctus. Pellentesque facilisis vel dui id dapibus. Donec eu ex et enim
    tempor sagittis sit amet nec dui. Maecenas efficitur mauris nisl, a tempor
    nisi fringilla ac. Curabitur molestie leo nec nunc gravida auctor.
  </p>
  <p>
    <img src="/favicon.ico" alt="nuxt icon" class="logo-nuxt-icon" />
  </p>
  <MyComponent :my-component-props="myComponentProps" />
  <p>
    <button class="btn" @click='htmlButtonMore'>Click Me +1 (html button)</button>
    <button class="btn" @click='htmlButtonLess'>Click Me -1 (html button)</button>
    {{countHtml}}
  </p>
</template>

<style scoped>
.logo-nuxt-icon{
  width: 10rem;
  height: auto;
}
.btn{
  padding: 1rem;
  text-align: center;
  border: #4caf50 solid 1px;
  border-radius: 1rem;
  margin: 0.5rem;
}
</style>
