import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './corretor.reducer';
import { ICorretor } from 'app/shared/model/corretor.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICorretorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CorretorDetail extends React.Component<ICorretorDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { corretorEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="minhaCasaApp.corretor.detail.title">Corretor</Translate> [<b>{corretorEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="registroImobiliaria">
                <Translate contentKey="minhaCasaApp.corretor.registroImobiliaria">Registro Imobiliaria</Translate>
              </span>
            </dt>
            <dd>{corretorEntity.registroImobiliaria}</dd>
            <dt>
              <span id="password">
                <Translate contentKey="minhaCasaApp.corretor.password">Password</Translate>
              </span>
            </dt>
            <dd>{corretorEntity.password}</dd>
            <dt>
              <span id="numeroCreci">
                <Translate contentKey="minhaCasaApp.corretor.numeroCreci">Numero Creci</Translate>
              </span>
            </dt>
            <dd>{corretorEntity.numeroCreci}</dd>
            <dt>
              <span id="contaCorrente">
                <Translate contentKey="minhaCasaApp.corretor.contaCorrente">Conta Corrente</Translate>
              </span>
            </dt>
            <dd>{corretorEntity.contaCorrente}</dd>
            <dt>
              <Translate contentKey="minhaCasaApp.corretor.imobiliaria">Imobiliaria</Translate>
            </dt>
            <dd>{corretorEntity.imobiliariaId ? corretorEntity.imobiliariaId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/corretor" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/corretor/${corretorEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ corretor }: IRootState) => ({
  corretorEntity: corretor.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CorretorDetail);
