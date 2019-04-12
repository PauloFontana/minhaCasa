import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './imovel.reducer';
import { IImovel } from 'app/shared/model/imovel.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IImovelProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Imovel extends React.Component<IImovelProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { imovelList, match } = this.props;
    return (
      <div>
        <h2 id="imovel-heading">
          <Translate contentKey="minhaCasaApp.imovel.home.title">Imovels</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="minhaCasaApp.imovel.home.createLabel">Create new Imovel</Translate>
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
                  <Translate contentKey="minhaCasaApp.imovel.categoria">Categoria</Translate>
                </th>
                <th>
                  <Translate contentKey="minhaCasaApp.imovel.tipo">Tipo</Translate>
                </th>
                <th>
                  <Translate contentKey="minhaCasaApp.imovel.valor">Valor</Translate>
                </th>
                <th>
                  <Translate contentKey="minhaCasaApp.imovel.atributos">Atributos</Translate>
                </th>
                <th>
                  <Translate contentKey="minhaCasaApp.imovel.clienteProprietario">Cliente Proprietario</Translate>
                </th>
                <th>
                  <Translate contentKey="minhaCasaApp.imovel.clienteComprador">Cliente Comprador</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {imovelList.map((imovel, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${imovel.id}`} color="link" size="sm">
                      {imovel.id}
                    </Button>
                  </td>
                  <td>{imovel.categoria}</td>
                  <td>{imovel.tipo}</td>
                  <td>{imovel.valor}</td>
                  <td>{imovel.atributos}</td>
                  <td>
                    {imovel.clienteProprietario ? (
                      <Link to={`cliente-proprietario/${imovel.clienteProprietario.id}`}>{imovel.clienteProprietario.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {imovel.clienteComprador ? (
                      <Link to={`cliente-comprador/${imovel.clienteComprador.id}`}>{imovel.clienteComprador.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${imovel.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${imovel.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${imovel.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ imovel }: IRootState) => ({
  imovelList: imovel.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Imovel);
