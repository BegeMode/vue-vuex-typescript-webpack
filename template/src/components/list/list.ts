import axios, { AxiosResponse } from 'axios';
import bCol from 'bootstrap-vue/es/components/layout/col';
import bContainer from 'bootstrap-vue/es/components/layout/container';
import bRow from 'bootstrap-vue/es/components/layout/row';
import { Component, Vue } from 'vue-property-decorator';

interface UserResponse {
  id: string;
  name: string;
}

@Component({
  template: require('./list.html'),
  components: {
    'b-container': bContainer,
    'b-col': bCol,
    'b-row': bRow
  },
  metaInfo: {
    title: 'List of users'
  }
})
export class ListComponent extends Vue {

  items: UserResponse[] = [];
  protected axios;
  private url = 'https://jsonplaceholder.typicode.com/users';

  constructor () {
    super();
    this.axios = axios;
  }

  mounted () {
    this.$nextTick(() => {
      this.loadItems();
    });
  }

  private loadItems () {
    if (!this.items.length) {
      this.axios.get(this.url).then((response: AxiosResponse) => {
        this.items = response.data;
      }, (error) => {
        // tslint:disable-next-line:no-console
        console.error(error);
      });
    }
  }
}
