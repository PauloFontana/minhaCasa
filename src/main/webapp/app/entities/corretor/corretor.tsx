import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './corretor.reducer';
import { ICorretor } from 'app/shared/model/corretor.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICorretorProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Corretor extends React.Component<ICorretorProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { corretorList, match } = this.props;
    return (
      <div>
        <h2 id="corretor-heading">
          <Translate contentKey="minhaCasaApp.corretor.home.title">Corretors</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="minhaCasaApp.corretor.home.createLabel">Create new Corretor</Translate>
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
                  <Translate contentKey="minhaCasaApp.corretor.registroImobiliaria">Registro Imobiliaria</Translate>
                </th>
                <th>
                  <Translate contentKey="minhaCasaApp.corretor.password">Password</Translate>
                </th>
                <th>
                  <Translate contentKey="minhaCasaApp.corretor.numeroCreci">Numero Creci</Translate>
                </th>
                <th>
                  <Translate contentKey="minhaCasaApp.corretor.contaCorrente">Conta Corrente</Translate>
                </th>
                <th>
                  <Translate contentKey="minhaCasaApp.corretor.imobiliaria">Imobiliaria</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {corretorList.map((corretor, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${corretor.id}`} color="link" size="sm">
                      {corretor.id}
                    </Button>
                  </td>
                  <td>{corretor.registroImobiliaria}</td>
                  <td>{corretor.password}</td>
                  <td>{corretor.numeroCreci}</td>
                  <td>{corretor.contaCorrente}</td>
                  <td>
                    {corretor.imobiliariaId ? <Link to={`imobiliaria/${corretor.imobiliariaId}`}>{corretor.imobiliariaId}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${corretor.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${corretor.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${corretor.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ corretor }: IRootState) => ({
  corretorList: corretor.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Corretor);
