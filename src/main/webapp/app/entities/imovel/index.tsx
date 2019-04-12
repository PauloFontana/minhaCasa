import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Imovel from './imovel';
import ImovelDetail from './imovel-detail';
import ImovelUpdate from './imovel-update';
import ImovelDeleteDialog from './imovel-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ImovelUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ImovelUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ImovelDetail} />
      <ErrorBoundaryRoute path={match.url} component={Imovel} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ImovelDeleteDialog} />
  </>
);

export default Routes;
