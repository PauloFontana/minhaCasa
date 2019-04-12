import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './cliente-proprietario.reducer';
import { IClienteProprietario } from 'app/shared/model/cliente-proprietario.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClienteProprietarioProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ClienteProprietario extends React.Component<IClienteProprietarioProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { clienteProprietarioList, match } = this.props;
    return (
      <div>
        <h2 id="cliente-proprietario-heading">
          <Translate contentKey="minhaCasaApp.clienteProprietario.home.title">Cliente Proprietarios</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="minhaCasaApp.clienteProprietario.home.createLabel">Create new Cliente Proprietario</Translate>
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
                  <Translate contentKey="minhaCasaApp.clienteProprietario.contaCorrente">Conta Corrente</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clienteProprietarioList.map((clienteProprietario, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${clienteProprietario.id}`} color="link" size="sm">
                      {clienteProprietario.id}
                    </Button>
                  </td>
                  <td>{clienteProprietario.contaCorrente}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${clienteProprietario.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${clienteProprietario.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${clienteProprietario.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ clienteProprietario }: IRootState) => ({
  clienteProprietarioList: clienteProprietario.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClienteProprietario);
