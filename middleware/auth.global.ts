import type { Customer } from "~/types";

export default defineNuxtRouteMiddleware((to, from) => {
    const authenticated = useCookie<Customer | null>('currentUser', { default: () => null });
    const user = authenticated.value;

    if (!user && to.path !== '/authentication/login' && to.path !== '/') {
        return navigateTo('/authentication/login');
    }

    if (user && user.role !== 'admin' && to.path.startsWith('/admin')) {
        return navigateTo('/authentication/unauthorized');
    }

    if (user && user.role !== 'user' && to.path.startsWith('/user')) {
        return navigateTo('/authentication/unauthorized');
    }

    if (user && to.path === '/authentication/login') {
        const roleDashboardMap = {
            admin: '/admin/admin',
            user: '/authentication/profile',
        };
        return navigateTo(roleDashboardMap[user.role as 'admin'|'user'] || '/');
    }
});

