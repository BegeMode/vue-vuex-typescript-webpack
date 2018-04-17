import bCollapse from 'bootstrap-vue/es/components/collapse/collapse';
import bNavItem from 'bootstrap-vue/es/components/nav/nav-item';
import bNavbar from 'bootstrap-vue/es/components/navbar/navbar';
import bNavbarBrand from 'bootstrap-vue/es/components/navbar/navbar-brand';
import bNavbarNav from 'bootstrap-vue/es/components/navbar/navbar-nav';
import bNavbarToggle from 'bootstrap-vue/es/components/navbar/navbar-toggle';
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { Logger } from '../../util/log';
import { Link } from './link';

@Component({
  template: require('./navbar.html'),
  components: {
    'b-collapse': bCollapse,
    'b-nav-item': bNavItem,
    'b-navbar': bNavbar,
    'b-navbar-toggle': bNavbarToggle,
    'b-navbar-brand': bNavbarBrand,
    'b-navbar-nav': bNavbarNav
  }
})
export class NavbarComponent extends Vue {
  @Getter('isAuthentificated', { namespace: 'auth' }) isAuthentificated: boolean;

  object: { default: string } = { default: 'Default object property!' };
  links: Link[] = [
    new Link('Home', '/'),
    new Link('About', '/about'),
    new Link('List', '/list')
  ];
  auth: {
    path: '/login',
    name: 'Log in'
  };

  protected logger: Logger;

  @Watch('$route.path')
  pathChanged () {
    this.logger.info('Changed current path to: ' + this.$route.path);
  }

  mounted () {
    if (!this.logger) this.logger = new Logger();
    this.$nextTick(() => this.logger.info(this.object.default));
  }

  // computed
  get authType() {
    if (!this.isAuthentificated) {
      return {
        path: '/login',
        name: 'Log in'
      };
    }
    return {
      path: '/logout',
      name: 'Log out'
    };
  }
}
