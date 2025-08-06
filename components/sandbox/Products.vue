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
    myProduct.value.brand.img = "/img/logo-verger.jpg"
  }

  const resetProduct = () => {
    myProduct.value = productStore.clearProduct()
  }

</script>

<template>
  <div>
    <h1>My product is:</h1>
    <ul>
      <li><strong>Name:</strong> {{ myProduct.name }}</li>
      <li><strong>Price:</strong> {{ myProduct.price }}</li>
      <li><strong>Image:</strong>
        <img :src="myProduct.img" width="100" v-if="myProduct.img" :alt="myProduct.name"/>
      </li>
      <li><strong>Brand Name:</strong> {{ myProduct.brand.name }}</li>
      <li><strong>Brand Img:</strong>
        <img :src="myProduct.brand.img" width="100" v-if="myProduct.brand.img" :alt="myProduct.name"/>
      </li>
    </ul>
    <div>
      <v-btn class="ma-2" @click="addName">Add name</v-btn>
      <v-btn class="ma-2" @click="addPrice">Add price</v-btn>
      <v-btn class="ma-2" @click="addImg">Add img</v-btn>
      <v-btn class="ma-2" @click="addNameBrand">Add brand name</v-btn>
      <v-btn class="ma-2" @click="addImgBrand">Add img brand</v-btn>
    </div>
    <div>
      <v-btn color="error" class="ma-2" @click="resetProduct">Reset Product</v-btn>
    </div>

  </div>
</template>

<style scoped>

</style>