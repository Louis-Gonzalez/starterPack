import {defineStore} from 'pinia';
import {ref, computed} from 'vue';
import type {Customer, Login, User} from "~/types";

export const useUserStore = defineStore('user', () => {
    const user = ref();
    const token = useCookie('token', {
        maxAge: 60 * 60 * 8,
    });

    const setToken = (data?: string) => (token.value = data);
    const setUser = (data?: any) => (user.value = data);
    let isAdmin = ref(false);

    const signIn = async (data: Login ) => {
        try {
            const responseAuth = await $fetch<User>('https://dummyjson.com/auth/login', {
                method: 'POST',
                body: data,
            });
            console.log(responseAuth);
            setToken(responseAuth.accessToken);
            console.log(token.value);
            await fetchCustomer();
            // login notification
        } catch (error){
            console.error(error);
            setToken();
            setUser();
            // logout notification
        }
    }

    const fetchCustomer = async () => {
        if (token.value) {
            try {
                const responseCustomer = await $fetch<Customer>('https://dummyjson.com/users/1');
                // here if you need more option in your api just put here with {} inside request api
                setUser(responseCustomer);
                if(responseCustomer.role === 'admin'){
                    isAdmin.value = true;
                }
            } catch (error) {
                console.error(error);
                setUser();
            }
        }
    };

    const logout = () => {
        setUser();
        setToken();
    };

    return {user, token, signIn, logout, fetchCustomer, setUser, setToken, isAdmin};
})