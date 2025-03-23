import type {Customer} from '~~/types'

export default defineNuxtRouteMiddleware((to, from) => {
    const user = useCookie<Customer>('currentUser');
    if(user.value.role !== 'admin') {
        // throw showError({
        //     statusCode: 403,
        //     statusMessage: 'Access denied'
        // })
        return navigateTo('/')
    }
});