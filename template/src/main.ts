import Vue from 'vue';
import { router } from './router/index';
import './sass/main.scss';
import store from './store/index';
import { makeHot, reload } from './util/hot-reload';

const navbarComponent = () => import('./components/navbar').then(({ NavbarComponent }) => NavbarComponent);
// const navbarComponent = () => import(/* webpackChunkName: 'navbar' */'./components/navbar').then(({ NavbarComponent }) => NavbarComponent)

if (process.env.ENV === 'development' && module.hot) {
  const navbarModuleId = './components/navbar';

  // first arguments for `module.hot.accept` and `require` methods have to be static strings
  // see https://github.com/webpack/webpack/issues/5668
  makeHot(navbarModuleId, navbarComponent,
    module.hot.accept('./components/navbar', () => reload(navbarModuleId, (require('./components/navbar') as any).NavbarComponent)));
}

// tslint:disable-next-line:no-unused-expression
new Vue({
  el: '#app-main',
  router,
  store,
  components: {
    navbar: navbarComponent
  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Default Title',
    // all titles will be injected into this template
    titleTemplate: '%s | My Awesome Webapp'
  },
});
