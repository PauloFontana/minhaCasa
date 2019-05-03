import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Repasse from './repasse';
import RepasseDetail from './repasse-detail';
import RepasseUpdate from './repasse-update';
import RepasseDeleteDialog from './repasse-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RepasseUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RepasseUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RepasseDetail} />
      <ErrorBoundaryRoute path={match.url} component={Repasse} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={RepasseDeleteDialog} />
  </>
);

export default Routes;
