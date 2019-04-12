import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ClienteProprietario from './cliente-proprietario';
import ClienteProprietarioDetail from './cliente-proprietario-detail';
import ClienteProprietarioUpdate from './cliente-proprietario-update';
import ClienteProprietarioDeleteDialog from './cliente-proprietario-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ClienteProprietarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ClienteProprietarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ClienteProprietarioDetail} />
      <ErrorBoundaryRoute path={match.url} component={ClienteProprietario} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ClienteProprietarioDeleteDialog} />
  </>
);

export default Routes;
