import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './cliente.reducer';
import { ICliente } from 'app/shared/model/cliente.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClienteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ClienteDetail extends React.Component<IClienteDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { clienteEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="minhaCasaApp.cliente.detail.title">Cliente</Translate> [<b>{clienteEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nome">
                <Translate contentKey="minhaCasaApp.cliente.nome">Nome</Translate>
              </span>
            </dt>
            <dd>{clienteEntity.nome}</dd>
            <dt>
              <span id="cpf">
                <Translate contentKey="minhaCasaApp.cliente.cpf">Cpf</Translate>
              </span>
            </dt>
            <dd>{clienteEntity.cpf}</dd>
            <dt>
              <span id="endereco">
                <Translate contentKey="minhaCasaApp.cliente.endereco">Endereco</Translate>
              </span>
            </dt>
            <dd>{clienteEntity.endereco}</dd>
            <dt>
              <span id="telefone">
                <Translate contentKey="minhaCasaApp.cliente.telefone">Telefone</Translate>
              </span>
            </dt>
            <dd>{clienteEntity.telefone}</dd>
            <dt>
              <Translate contentKey="minhaCasaApp.cliente.clienteProprietario">Cliente Proprietario</Translate>
            </dt>
            <dd>{clienteEntity.clienteProprietario ? clienteEntity.clienteProprietario.id : ''}</dd>
            <dt>
              <Translate contentKey="minhaCasaApp.cliente.clienteComprador">Cliente Comprador</Translate>
            </dt>
            <dd>{clienteEntity.clienteComprador ? clienteEntity.clienteComprador.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/cliente" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/cliente/${clienteEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ cliente }: IRootState) => ({
  clienteEntity: cliente.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClienteDetail);
