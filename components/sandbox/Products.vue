<script setup lang="ts">
  import { ref } from 'vue'
  import type { IProduct } from '~/types';
  import { useProductStore } from '~/stores/productStore';

  const productStore = useProductStore();

  const myProduct = ref<IProduct>(productStore.product);

  const addName = () => {
    myProduct.value.name = "Tomato";
  }
  const addPrice = () => {
    myProduct.value.price = 1.52;
  }
  const addImg = () => {
    myProduct.value.img = "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg";
  }
  const addNameBrand = () => {
    myProduct.value.brand.name = "Roma";
  }
  const addImgBrand = () => {
    myProduct.value.brand.img = "~/assets/img/logo-verger.jgp"
  }
</script>

<template>
  <div>
    <h1>My product is :</h1>
    <p>{{myProduct}}</p>
    <v-btn class="ma-2" @click="addName">Add name</v-btn>
    <v-btn class="ma-2" @click="addPrice">Add price</v-btn>
    <v-btn class="ma-2" @click="addImg">Add img</v-btn>
    <v-btn class="ma-2" @click="addNameBrand">Add brand name</v-btn>
    <v-btn class="ma-2" @click="addImgBrand">Add img brand</v-btn>
  </div>
</template>

<style scoped>

</style>