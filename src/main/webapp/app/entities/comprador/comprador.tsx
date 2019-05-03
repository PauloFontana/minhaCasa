import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './comprador.reducer';
import { IComprador } from 'app/shared/model/comprador.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompradorProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Comprador extends React.Component<ICompradorProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { compradorList, match } = this.props;
    return (
      <div>
        <h2 id="comprador-heading">
          <Translate contentKey="minhaCasaApp.comprador.home.title">Compradors</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="minhaCasaApp.comprador.home.createLabel">Create new Comprador</Translate>
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
                  <Translate contentKey="minhaCasaApp.comprador.renda">Renda</Translate>
                </th>
                <th>
                  <Translate contentKey="minhaCasaApp.comprador.garantias">Garantias</Translate>
                </th>
                <th>
                  <Translate contentKey="minhaCasaApp.comprador.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {compradorList.map((comprador, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${comprador.id}`} color="link" size="sm">
                      {comprador.id}
                    </Button>
                  </td>
                  <td>{comprador.renda}</td>
                  <td>{comprador.garantias}</td>
                  <td>{comprador.userLogin ? comprador.userLogin : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${comprador.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${comprador.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${comprador.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ comprador }: IRootState) => ({
  compradorList: comprador.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comprador);
