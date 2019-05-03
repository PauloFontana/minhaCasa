import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Proprietario from './proprietario';
import Repasse from './repasse';
import Minuta from './minuta';
import Imovel from './imovel';
import Visita from './visita';
import Corretor from './corretor';
import Comprador from './comprador';
import Pagamento from './pagamento';
import Imobiliaria from './imobiliaria';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/proprietario`} component={Proprietario} />
      <ErrorBoundaryRoute path={`${match.url}/repasse`} component={Repasse} />
      <ErrorBoundaryRoute path={`${match.url}/minuta`} component={Minuta} />
      <ErrorBoundaryRoute path={`${match.url}/imovel`} component={Imovel} />
      <ErrorBoundaryRoute path={`${match.url}/visita`} component={Visita} />
      <ErrorBoundaryRoute path={`${match.url}/corretor`} component={Corretor} />
      <ErrorBoundaryRoute path={`${match.url}/comprador`} component={Comprador} />
      <ErrorBoundaryRoute path={`${match.url}/pagamento`} component={Pagamento} />
      <ErrorBoundaryRoute path={`${match.url}/imobiliaria`} component={Imobiliaria} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
