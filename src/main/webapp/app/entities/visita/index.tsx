import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Visita from './visita';
import VisitaDetail from './visita-detail';
import VisitaUpdate from './visita-update';
import VisitaDeleteDialog from './visita-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VisitaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VisitaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VisitaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Visita} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={VisitaDeleteDialog} />
  </>
);

export default Routes;
