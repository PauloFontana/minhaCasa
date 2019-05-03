import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './pagamento.reducer';
import { IPagamento } from 'app/shared/model/pagamento.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPagamentoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PagamentoDetail extends React.Component<IPagamentoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pagamentoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="minhaCasaApp.pagamento.detail.title">Pagamento</Translate> [<b>{pagamentoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="valor">
                <Translate contentKey="minhaCasaApp.pagamento.valor">Valor</Translate>
              </span>
            </dt>
            <dd>{pagamentoEntity.valor}</dd>
            <dt>
              <span id="data">
                <Translate contentKey="minhaCasaApp.pagamento.data">Data</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={pagamentoEntity.data} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="minhaCasaApp.pagamento.comprador">Comprador</Translate>
            </dt>
            <dd>{pagamentoEntity.compradorId ? pagamentoEntity.compradorId : ''}</dd>
            <dt>
              <Translate contentKey="minhaCasaApp.pagamento.corretor">Corretor</Translate>
            </dt>
            <dd>{pagamentoEntity.corretorId ? pagamentoEntity.corretorId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/pagamento" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/pagamento/${pagamentoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ pagamento }: IRootState) => ({
  pagamentoEntity: pagamento.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PagamentoDetail);
