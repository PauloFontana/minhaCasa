import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Corretor from './corretor';
import CorretorDetail from './corretor-detail';
import CorretorUpdate from './corretor-update';
import CorretorDeleteDialog from './corretor-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CorretorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CorretorUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CorretorDetail} />
      <ErrorBoundaryRoute path={match.url} component={Corretor} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CorretorDeleteDialog} />
  </>
);

export default Routes;
