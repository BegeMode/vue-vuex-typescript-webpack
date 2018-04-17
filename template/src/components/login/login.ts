import bButton from 'bootstrap-vue/es/components/button/button';
import bFormGroup from 'bootstrap-vue/es/components/form-group/form-group';
import bFormInput from 'bootstrap-vue/es/components/form-input/form-input';
import bForm from 'bootstrap-vue/es/components/form/form';
import bCol from 'bootstrap-vue/es/components/layout/col';
import bContainer from 'bootstrap-vue/es/components/layout/container';
import bRow from 'bootstrap-vue/es/components/layout/row';
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter, State } from 'vuex-class';
import { IAuthState } from '../../store/auth/types';
import { IUser } from '../../store/profile/types';

const namespace: string = 'auth';

@Component({
  template: require('./login.html'),
  components: {
    'b-container': bContainer,
    'b-col': bCol,
    'b-row': bRow,
    'b-form': bForm,
    'b-form-group': bFormGroup,
    'b-form-input': bFormInput,
    'b-button': bButton,
  }
})
export class LoginComponent extends Vue {
  @State('auth') auth: IAuthState;
  @Action('logIn', { namespace }) logIn;
  @Getter('isAuthentificated', { namespace }) isAuthentificated!: boolean;
  username: string = '';
  password: string = '';
  authError: string = '';
  tryingToLogIn: boolean = false;

  onSubmit(): void {
    this.tryingToLogIn = true;
    // Reset the authError if it existed.
    this.authError = '';
    return this.logIn({
      username: this.username,
      password: this.password,
    })
      .then((_user: IUser) => {
        this.tryingToLogIn = false;
        const params = this.$route.params;
        if (params.retrieveRouteName || params.retrieveRoutePath) {
          this.$router.push(params.retrieveRouteName ? { name: params.retrieveRouteName } : { path: params.retrieveRoutePath });
        } else {
          this.$router.push({ name: 'home' });
        }
      })
      .catch((error: string) => {
        this.tryingToLogIn = false;
        this.authError = error;
      });
  }

  onReset(evt) {
    evt.preventDefault();
    this.username = '';
    this.password = '';
    /* Trick to reset/clear native browser form validation state */
    // this.show = false;
    // this.$nextTick(() => { this.show = true });
  }
}
