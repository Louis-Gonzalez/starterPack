import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {

  const defaultProduct = () => ({
    id: null,
    name: null,
    price: null,
    img: null,
    brand : {
      id: null,
      name: null,
      img: null
    }
  })

  const product = ref(defaultProduct())

  function clearProduct() {
    product.value = defaultProduct()
    return product.value
  }

  return {
    product,
    clearProduct
  }
})
