import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './minuta.reducer';
import { IMinuta } from 'app/shared/model/minuta.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMinutaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MinutaDetail extends React.Component<IMinutaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { minutaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="minhaCasaApp.minuta.detail.title">Minuta</Translate> [<b>{minutaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="conteudo">
                <Translate contentKey="minhaCasaApp.minuta.conteudo">Conteudo</Translate>
              </span>
            </dt>
            <dd>{minutaEntity.conteudo}</dd>
            <dt>
              <Translate contentKey="minhaCasaApp.minuta.imovel">Imovel</Translate>
            </dt>
            <dd>{minutaEntity.imovelId ? minutaEntity.imovelId : ''}</dd>
            <dt>
              <Translate contentKey="minhaCasaApp.minuta.proprietario">Proprietario</Translate>
            </dt>
            <dd>{minutaEntity.proprietarioId ? minutaEntity.proprietarioId : ''}</dd>
            <dt>
              <Translate contentKey="minhaCasaApp.minuta.comprador">Comprador</Translate>
            </dt>
            <dd>{minutaEntity.compradorId ? minutaEntity.compradorId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/minuta" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/minuta/${minutaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ minuta }: IRootState) => ({
  minutaEntity: minuta.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinutaDetail);
