import { routes } from "./routes";

export function Router(){
    const path = window.location.pathname;

    const publicRoutes = routes.Public.find(route => route.path === path);

    if(publicRoutes){
        if(publicRoutes.path === '/dashboard' && !localStorage.getItem('token')){
            navigateTo('/');
            return;
        }
        publicRoutes.page();
        return;
    }

    navigateTo('/not-found');
}

export function navigateTo(path: string){
    window.history.pushState({},"", window.location.origin+path);
    Router();
}