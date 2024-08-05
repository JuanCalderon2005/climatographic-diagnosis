import { dashboard } from "./pages/dashboard";
import { home } from "./pages/home";
import { notFound } from "./pages/not-Found";
import { register } from "./pages/regsiter";

export const routes = {
    Public:[
        {
            path: '/not-found', page: notFound
        },
        {
            path: '/', page: home
        },
        {
            path: '/dashboard', page: dashboard
        },
        {
            path: '/register', page: register
        }

    ]
}