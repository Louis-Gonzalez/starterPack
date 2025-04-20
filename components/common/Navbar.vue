<template>
  <nav :class="themeClass" class="navbar">
    <div class="nav-links">
      <div v-for="route in routeList" :key="route.path">
        <NuxtLink :to="route.path">{{ route.name }}</NuxtLink>
      </div>
    </div>
    <div class="nav-button">
      <div v-if="token">
        <p v-if="isAdmin">Admin</p>
        <img class="avatar" :src="avatar" alt="user avatar" />
      </div>
      <div>
        <button @click="toggleTheme" class="toggle-light-dark">
          Switch to {{ theme.global.name.value === 'light' ? 'dark' : 'light' }}
        </button>
      </div>
      <div>
        <LangSwitcher :class="themeClass" />
        <div v-if="token">
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
import LangSwitcher from '~/components/common/LangSwitcher.vue';

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
  await navigateTo('/authentication/profile', { replace: true });
};
const logOut = async () => {
  userStore.logout();
  await navigateTo('/');
};

/////// theme light / dark //////
import { useTheme } from 'vuetify';
const theme = useTheme();

const toggleTheme = () => {
  theme.global.name.value =
    theme.global.name.value === 'light' ? 'dark' : 'light';
};

const themeClass = computed(() => {
  return theme.global.name.value === 'dark' ? 'dark-theme' : 'light-theme';
});
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  background-color: var(--main-color3);
}

.nav-links {
  display: flex;
  gap: 1rem;
  flex-grow: 1;
}

.navbar a {
  text-decoration: none;
  color: var(--main-secondary);
  font-size: large;
}

.nav-button {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  width: 3rem;
  height: auto;
}
p {
  color: whitesmoke;
}

.toggle-light-dark{
  margin: 1rem;
  padding: 0.5rem;
  color: var(--main-success);
  border: 1px solid var(--main-success);
  border-radius: 0.5rem;
}

.dark-theme .toggle-light-dark {
  background-color: #333;
  color: #fff;
}

.light-theme .toggle-light-dark {
  background-color: #fff;
  color: #333;
}
</style>
