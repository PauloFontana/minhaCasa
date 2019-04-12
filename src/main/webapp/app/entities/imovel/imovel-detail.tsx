import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './imovel.reducer';
import { IImovel } from 'app/shared/model/imovel.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IImovelDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ImovelDetail extends React.Component<IImovelDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { imovelEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="minhaCasaApp.imovel.detail.title">Imovel</Translate> [<b>{imovelEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="categoria">
                <Translate contentKey="minhaCasaApp.imovel.categoria">Categoria</Translate>
              </span>
            </dt>
            <dd>{imovelEntity.categoria}</dd>
            <dt>
              <span id="tipo">
                <Translate contentKey="minhaCasaApp.imovel.tipo">Tipo</Translate>
              </span>
            </dt>
            <dd>{imovelEntity.tipo}</dd>
            <dt>
              <span id="valor">
                <Translate contentKey="minhaCasaApp.imovel.valor">Valor</Translate>
              </span>
            </dt>
            <dd>{imovelEntity.valor}</dd>
            <dt>
              <span id="atributos">
                <Translate contentKey="minhaCasaApp.imovel.atributos">Atributos</Translate>
              </span>
            </dt>
            <dd>{imovelEntity.atributos}</dd>
            <dt>
              <Translate contentKey="minhaCasaApp.imovel.clienteProprietario">Cliente Proprietario</Translate>
            </dt>
            <dd>{imovelEntity.clienteProprietario ? imovelEntity.clienteProprietario.id : ''}</dd>
            <dt>
              <Translate contentKey="minhaCasaApp.imovel.clienteComprador">Cliente Comprador</Translate>
            </dt>
            <dd>{imovelEntity.clienteComprador ? imovelEntity.clienteComprador.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/imovel" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/imovel/${imovelEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ imovel }: IRootState) => ({
  imovelEntity: imovel.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImovelDetail);
