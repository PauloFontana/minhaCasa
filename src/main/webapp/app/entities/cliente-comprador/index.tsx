import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ClienteComprador from './cliente-comprador';
import ClienteCompradorDetail from './cliente-comprador-detail';
import ClienteCompradorUpdate from './cliente-comprador-update';
import ClienteCompradorDeleteDialog from './cliente-comprador-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ClienteCompradorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ClienteCompradorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ClienteCompradorDetail} />
      <ErrorBoundaryRoute path={match.url} component={ClienteComprador} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ClienteCompradorDeleteDialog} />
  </>
);

export default Routes;
