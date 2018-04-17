import bCol from 'bootstrap-vue/es/components/layout/col';
import bContainer from 'bootstrap-vue/es/components/layout/container';
import bRow from 'bootstrap-vue/es/components/layout/row';
import { Component, Vue } from 'vue-property-decorator';

import './home.scss';

@Component({
  template: require('./home.html'),
  components: {
    'b-container': bContainer,
    'b-col': bCol,
    'b-row': bRow
  },
  metaInfo: {
    title: 'Home page',
    // meta: [{ name: 'description', content: appConfig.description }],
  }
})
export class HomeComponent extends Vue {
  package: string = 'vue-webpack-typescript';
  repo: string = 'https://github.com/BegeMode/vue-vuex-typescript-webpack';
  mode: string = process.env.ENV;
}
