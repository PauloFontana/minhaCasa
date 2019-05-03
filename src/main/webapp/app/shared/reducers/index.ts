import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import proprietario, {
  ProprietarioState
} from 'app/entities/proprietario/proprietario.reducer';
// prettier-ignore
import repasse, {
  RepasseState
} from 'app/entities/repasse/repasse.reducer';
// prettier-ignore
import minuta, {
  MinutaState
} from 'app/entities/minuta/minuta.reducer';
// prettier-ignore
import imovel, {
  ImovelState
} from 'app/entities/imovel/imovel.reducer';
// prettier-ignore
import visita, {
  VisitaState
} from 'app/entities/visita/visita.reducer';
// prettier-ignore
import corretor, {
  CorretorState
} from 'app/entities/corretor/corretor.reducer';
// prettier-ignore
import comprador, {
  CompradorState
} from 'app/entities/comprador/comprador.reducer';
// prettier-ignore
import pagamento, {
  PagamentoState
} from 'app/entities/pagamento/pagamento.reducer';
// prettier-ignore
import imobiliaria, {
  ImobiliariaState
} from 'app/entities/imobiliaria/imobiliaria.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly proprietario: ProprietarioState;
  readonly repasse: RepasseState;
  readonly minuta: MinutaState;
  readonly imovel: ImovelState;
  readonly visita: VisitaState;
  readonly corretor: CorretorState;
  readonly comprador: CompradorState;
  readonly pagamento: PagamentoState;
  readonly imobiliaria: ImobiliariaState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  proprietario,
  repasse,
  minuta,
  imovel,
  visita,
  corretor,
  comprador,
  pagamento,
  imobiliaria,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
