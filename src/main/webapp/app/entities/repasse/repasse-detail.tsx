import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './repasse.reducer';
import { IRepasse } from 'app/shared/model/repasse.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRepasseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RepasseDetail extends React.Component<IRepasseDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { repasseEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="minhaCasaApp.repasse.detail.title">Repasse</Translate> [<b>{repasseEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="valor">
                <Translate contentKey="minhaCasaApp.repasse.valor">Valor</Translate>
              </span>
            </dt>
            <dd>{repasseEntity.valor}</dd>
            <dt>
              <Translate contentKey="minhaCasaApp.repasse.proprietario">Proprietario</Translate>
            </dt>
            <dd>{repasseEntity.proprietarioId ? repasseEntity.proprietarioId : ''}</dd>
            <dt>
              <Translate contentKey="minhaCasaApp.repasse.corretor">Corretor</Translate>
            </dt>
            <dd>{repasseEntity.corretorId ? repasseEntity.corretorId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/repasse" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/repasse/${repasseEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ repasse }: IRootState) => ({
  repasseEntity: repasse.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepasseDetail);
