import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Minuta from './minuta';
import MinutaDetail from './minuta-detail';
import MinutaUpdate from './minuta-update';
import MinutaDeleteDialog from './minuta-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MinutaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MinutaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MinutaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Minuta} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={MinutaDeleteDialog} />
  </>
);

export default Routes;
