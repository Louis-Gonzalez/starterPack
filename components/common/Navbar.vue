<template>
  <nav class="navbar">
    <div v-for="route in routeList" :key="route.path">
      <NuxtLink :to="route.path">{{ route.name }}</NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
const routeList = [
  {
  name: 'Home',
  path: '/'},
  {
    name: 'User',
    path: '/user'},
  {
    name: 'Admin',
    path: '/admin'
  },
  {
    name: 'Login',
    path: '/authentication/login'
  },
  {
    name: 'Logout',
    path: '/authentication/login'
  }
]
</script>

<style scoped>
.navbar{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 0;
  gap: 1rem;
  padding: 0.5rem;
  background-color: black;
}
.navbar a{
  text-decoration: none;
  color: whitesmoke;
  font-size: large;
}
</style>