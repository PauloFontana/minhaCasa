import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './cliente-comprador.reducer';
import { IClienteComprador } from 'app/shared/model/cliente-comprador.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClienteCompradorProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class ClienteComprador extends React.Component<IClienteCompradorProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { clienteCompradorList, match } = this.props;
    return (
      <div>
        <h2 id="cliente-comprador-heading">
          <Translate contentKey="minhaCasaApp.clienteComprador.home.title">Cliente Compradors</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="minhaCasaApp.clienteComprador.home.createLabel">Create new Cliente Comprador</Translate>
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
                  <Translate contentKey="minhaCasaApp.clienteComprador.renda">Renda</Translate>
                </th>
                <th>
                  <Translate contentKey="minhaCasaApp.clienteComprador.garantias">Garantias</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {clienteCompradorList.map((clienteComprador, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${clienteComprador.id}`} color="link" size="sm">
                      {clienteComprador.id}
                    </Button>
                  </td>
                  <td>{clienteComprador.renda}</td>
                  <td>{clienteComprador.garantias}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${clienteComprador.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${clienteComprador.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${clienteComprador.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ clienteComprador }: IRootState) => ({
  clienteCompradorList: clienteComprador.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClienteComprador);
