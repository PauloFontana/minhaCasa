import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './visita.reducer';
import { IVisita } from 'app/shared/model/visita.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVisitaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class VisitaDetail extends React.Component<IVisitaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { visitaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="minhaCasaApp.visita.detail.title">Visita</Translate> [<b>{visitaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="data">
                <Translate contentKey="minhaCasaApp.visita.data">Data</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={visitaEntity.data} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="avaliacao">
                <Translate contentKey="minhaCasaApp.visita.avaliacao">Avaliacao</Translate>
              </span>
            </dt>
            <dd>{visitaEntity.avaliacao}</dd>
            <dt>
              <Translate contentKey="minhaCasaApp.visita.imovel">Imovel</Translate>
            </dt>
            <dd>{visitaEntity.imovelId ? visitaEntity.imovelId : ''}</dd>
            <dt>
              <Translate contentKey="minhaCasaApp.visita.corretor">Corretor</Translate>
            </dt>
            <dd>{visitaEntity.corretorId ? visitaEntity.corretorId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/visita" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/visita/${visitaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ visita }: IRootState) => ({
  visitaEntity: visita.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisitaDetail);
