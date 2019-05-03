import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Proprietario from './proprietario';
import ProprietarioDetail from './proprietario-detail';
import ProprietarioUpdate from './proprietario-update';
import ProprietarioDeleteDialog from './proprietario-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProprietarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProprietarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProprietarioDetail} />
      <ErrorBoundaryRoute path={match.url} component={Proprietario} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProprietarioDeleteDialog} />
  </>
);

export default Routes;
