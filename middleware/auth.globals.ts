import type { Customer } from "~/types";

export default defineNuxtRouteMiddleware((to, from) => {
    const authenticated = useCookie<Customer | null>('currentUser', { default: () => null });

    console.log("Middleware auth-globals → currentUser:", authenticated.value);

    // Si l'utilisateur n'est pas authentifié et tente d'accéder à une page protégée, rediriger vers /login
    if (!authenticated.value && to.path !== '/authentication/login' && to.path !== '/') {
        return navigateTo('/authentication/login');
    }

    // Si l'utilisateur est authentifié et tente d'accéder à /login, rediriger vers /
    if (authenticated.value && to.path === '/authentication/login') {
        return navigateTo('/');
    }
});
