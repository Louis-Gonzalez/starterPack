import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Customer, Login, User } from "~/types";

export const useUserStore = defineStore('user', () => {
    const user = ref<Customer | null>(null);
    const token = useCookie('token', {
        maxAge: 60 * 60 * 8,
    });
    const currentUser = useCookie<Customer | null>('currentUser', {
        maxAge: 60 * 60 * 8,
    });

    const setToken = (data?: string) => (token.value = data);
    const setUser = (data?: Customer) => (user.value = data);
    const setCurrentUser = (data?: Customer) => {
        currentUser.value = data || null; // Set currentUser properly or null if no data
    };

    const isAdmin = ref(false);

    const signIn = async (data: Login) => {
        try {
            const responseAuth = await $fetch<User>('https://dummyjson.com/auth/login', {
                method: 'POST',
                body: data,
            });
            setToken(responseAuth.accessToken);
            await fetchCustomer();
            // login notification
        } catch (error) {
            console.error(error);
            setToken();
            setUser();
            setCurrentUser(null); // Clear currentUser on error
            isAdmin.value = false;
            // logout notification
        }
    };

    const fetchCustomer = async () => {
        if (token.value) {
            try {
                const responseCustomer = await $fetch<Customer>('https://dummyjson.com/users/12');
                setUser(responseCustomer);
                setCurrentUser(responseCustomer); // Set the currentUser properly
                if (responseCustomer.role === 'admin') {
                    isAdmin.value = true;
                }
            } catch (error) {
                console.error(error);
                setUser();
                setCurrentUser(null); // Clear currentUser on error
            }
        }
    };

    const logout = () => {
        setUser(null);
        setToken();
        setCurrentUser(null); // Clear the currentUser cookie on logout
    };

    return {
        user,
        token,
        signIn,
        logout,
        fetchCustomer,
        setUser,
        setToken,
        setCurrentUser,
        isAdmin,
    };
});
