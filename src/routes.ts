import { dashboard } from "./pages/dashboard";
import { home } from "./pages/home";
import { notFound } from "./pages/not-Found";

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
        }
    ]
}