import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './proprietario.reducer';
import { IProprietario } from 'app/shared/model/proprietario.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProprietarioProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Proprietario extends React.Component<IProprietarioProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { proprietarioList, match } = this.props;
    return (
      <div>
        <h2 id="proprietario-heading">
          <Translate contentKey="minhaCasaApp.proprietario.home.title">Proprietarios</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="minhaCasaApp.proprietario.home.createLabel">Create new Proprietario</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="minhaCasaApp.proprietario.contaCorrente">Conta Corrente</Translate>
                </th>
                <th>
                  <Translate contentKey="minhaCasaApp.proprietario.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {proprietarioList.map((proprietario, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${proprietario.id}`} color="link" size="sm">
                      {proprietario.id}
                    </Button>
                  </td>
                  <td>{proprietario.contaCorrente}</td>
                  <td>{proprietario.userLogin ? proprietario.userLogin : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${proprietario.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${proprietario.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${proprietario.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ proprietario }: IRootState) => ({
  proprietarioList: proprietario.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Proprietario);
