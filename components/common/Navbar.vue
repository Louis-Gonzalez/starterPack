<template>
  <nav class="navbar">
    <div class="nav-links">
      <div v-for="route in routeList" :key="route.path">
        <NuxtLink :to="route.path">{{ route.name }}</NuxtLink>
      </div>
    </div>
    <div class="nav-button">
      <div v-if='token'>
        <p v-if="isAdmin">Admin</p>
        <img class="avatar" :src="avatar" alt="user avatar">
      </div>
      <div>
        <div v-if='token'>
          <v-btn color="error" outlined @click="logOut"> Logout</v-btn>
        </div>
        <div v-else>
          <v-btn color="secondary" outlined @click="signIn">Login</v-btn>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useCookie } from '#app';

const routeList = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'User',
    path: '/user/user',
  },
  {
    name: 'Admin',
    path: '/admin/admin',
  },
  {
    name: 'Login',
    path: '/authentication/login',
  },
];
const userStore = useUserStore();

const token = useCookie('token');
const isAdmin = userStore.isAdmin;
const currentUser = useCookie('currentUser');
let avatar = ref('');

onMounted(() => {
  if (currentUser.value) {
    avatar.value = currentUser.value.image;
  }
});

const signIn = async () => {
  await userStore.signIn({
    username: 'emilys',
    password: 'emilyspass',
  });
  await navigateTo('/authentication/profile', {replace: true});
}
const logOut = async () => {
  userStore.logout();
  await navigateTo('/');
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: black;
}

.nav-links {
  display: flex;
  gap: 1rem;
  flex-grow: 1;
}

.navbar a {
  text-decoration: none;
  color: whitesmoke;
  font-size: large;
}

.nav-button {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar{
  width: 3rem;
  height: auto;
}
p{
  color: whitesmoke;
}
</style>

