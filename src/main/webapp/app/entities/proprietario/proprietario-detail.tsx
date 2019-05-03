import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './proprietario.reducer';
import { IProprietario } from 'app/shared/model/proprietario.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProprietarioDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProprietarioDetail extends React.Component<IProprietarioDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { proprietarioEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="minhaCasaApp.proprietario.detail.title">Proprietario</Translate> [<b>{proprietarioEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="contaCorrente">
                <Translate contentKey="minhaCasaApp.proprietario.contaCorrente">Conta Corrente</Translate>
              </span>
            </dt>
            <dd>{proprietarioEntity.contaCorrente}</dd>
            <dt>
              <Translate contentKey="minhaCasaApp.proprietario.user">User</Translate>
            </dt>
            <dd>{proprietarioEntity.userLogin ? proprietarioEntity.userLogin : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/proprietario" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/proprietario/${proprietarioEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ proprietario }: IRootState) => ({
  proprietarioEntity: proprietario.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProprietarioDetail);
