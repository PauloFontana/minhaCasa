import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './imobiliaria.reducer';
import { IImobiliaria } from 'app/shared/model/imobiliaria.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IImobiliariaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Imobiliaria extends React.Component<IImobiliariaProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { imobiliariaList, match } = this.props;
    return (
      <div>
        <h2 id="imobiliaria-heading">
          <Translate contentKey="minhaCasaApp.imobiliaria.home.title">Imobiliarias</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="minhaCasaApp.imobiliaria.home.createLabel">Create new Imobiliaria</Translate>
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
                  <Translate contentKey="minhaCasaApp.imobiliaria.login">Login</Translate>
                </th>
                <th>
                  <Translate contentKey="minhaCasaApp.imobiliaria.password">Password</Translate>
                </th>
                <th>
                  <Translate contentKey="minhaCasaApp.imobiliaria.nome">Nome</Translate>
                </th>
                <th>
                  <Translate contentKey="minhaCasaApp.imobiliaria.cnpj">Cnpj</Translate>
                </th>
                <th>
                  <Translate contentKey="minhaCasaApp.imobiliaria.endereco">Endereco</Translate>
                </th>
                <th>
                  <Translate contentKey="minhaCasaApp.imobiliaria.telefone">Telefone</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {imobiliariaList.map((imobiliaria, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${imobiliaria.id}`} color="link" size="sm">
                      {imobiliaria.id}
                    </Button>
                  </td>
                  <td>{imobiliaria.login}</td>
                  <td>{imobiliaria.password}</td>
                  <td>{imobiliaria.nome}</td>
                  <td>{imobiliaria.cnpj}</td>
                  <td>{imobiliaria.endereco}</td>
                  <td>{imobiliaria.telefone}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${imobiliaria.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${imobiliaria.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${imobiliaria.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ imobiliaria }: IRootState) => ({
  imobiliariaList: imobiliaria.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Imobiliaria);
