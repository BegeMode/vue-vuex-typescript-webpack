import { AsyncComponent } from 'vue';
import { RouteConfig } from 'vue-router'; // Location, Route,
import store from '../store/index';
import { makeHot, reload } from '../util/hot-reload';

const homeComponent = () => import('../components/home').then(({ HomeComponent }) => HomeComponent);
const aboutComponent = () => import('../components/about').then(({ AboutComponent }) => AboutComponent);
const listComponent = () => import('../components/list').then(({ ListComponent }) => ListComponent);
const loginComponent = () => import('../components/login').then(({ LoginComponent }) => LoginComponent);
// const homeComponent = () => import(/* webpackChunkName: 'home' */'../components/home').then(({ HomeComponent }) => HomeComponent);
// const aboutComponent = () => import(/* webpackChunkName: 'about' */'../components/about').then(({ AboutComponent }) => AboutComponent);
// const listComponent = () => import(/* webpackChunkName: 'list' */'../components/list').then(({ ListComponent }) => ListComponent);
if (process.env.ENV === 'development' && module.hot) {
  const loginModuleId = '../components/login';
  const homeModuleId = '../components/home';
  const aboutModuleId = '../components/about';
  const listModuleId = '../components/list';

  // first arguments for `module.hot.accept` and `require` methods have to be static strings
  // see https://github.com/webpack/webpack/issues/5668
  makeHot(loginModuleId, loginComponent,
    module.hot.accept('../components/login', () => reload(loginModuleId, (require('../components/login') as any).LoginComponent)));

  makeHot(homeModuleId, homeComponent,
    module.hot.accept('../components/home', () => reload(homeModuleId, (require('../components/home') as any).HomeComponent)));

  makeHot(aboutModuleId, aboutComponent,
    module.hot.accept('../components/about', () => reload(aboutModuleId, (require('../components/about') as any).AboutComponent)));

  makeHot(listModuleId, listComponent,
    module.hot.accept('../components/list', () => reload(listModuleId, (require('../components/list') as any).ListComponent)));
}

export const createRoutes: () => RouteConfig[] = () => [
  {
    path: '/',
    name: 'home',
    component: homeComponent as AsyncComponent
  },
  {
    name: 'login',
    path: '/login',
    component: loginComponent as AsyncComponent,
    beforeEnter(to, from, next) {
        // If the user is already logged in
      if (store.getters['auth/isAuthentificated']) {
          // Redirect to the home page instead
        next({ name: 'home' });
      } else {
          // Continue to the login page
        next();
      }
    },
  },
  {
    path: '/logout',
    name: 'logout',
    meta: {
      authRequired: true,
    },
    beforeEnter(routeTo, routeFrom, next) {
      store.dispatch('auth/logOut');
      const authRequiredOnPreviousRoute = routeFrom.matched.some(
        route => route.meta.authRequired
      );
      // Navigate back to previous page, or home as a fallback
      next(authRequiredOnPreviousRoute ? '/' : routeFrom.path);
    },
  },
  {
    name: 'about',
    path: '/about',
    component: aboutComponent as AsyncComponent,
    meta: {
      authRequired: true,
    },
  },
  {
    name: 'list',
    path: '/list',
    component: listComponent as AsyncComponent,
    meta: {
      authRequired: true,
    },
  }
];
