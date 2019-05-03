import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Comprador from './comprador';
import CompradorDetail from './comprador-detail';
import CompradorUpdate from './comprador-update';
import CompradorDeleteDialog from './comprador-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CompradorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CompradorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CompradorDetail} />
      <ErrorBoundaryRoute path={match.url} component={Comprador} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CompradorDeleteDialog} />
  </>
);

export default Routes;
