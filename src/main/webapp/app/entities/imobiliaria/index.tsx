import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Imobiliaria from './imobiliaria';
import ImobiliariaDetail from './imobiliaria-detail';
import ImobiliariaUpdate from './imobiliaria-update';
import ImobiliariaDeleteDialog from './imobiliaria-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ImobiliariaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ImobiliariaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ImobiliariaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Imobiliaria} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ImobiliariaDeleteDialog} />
  </>
);

export default Routes;
