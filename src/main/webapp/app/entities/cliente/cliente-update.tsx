import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IClienteProprietario } from 'app/shared/model/cliente-proprietario.model';
import { getEntities as getClienteProprietarios } from 'app/entities/cliente-proprietario/cliente-proprietario.reducer';
import { IClienteComprador } from 'app/shared/model/cliente-comprador.model';
import { getEntities as getClienteCompradors } from 'app/entities/cliente-comprador/cliente-comprador.reducer';
import { getEntity, updateEntity, createEntity, reset } from './cliente.reducer';
import { ICliente } from 'app/shared/model/cliente.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IClienteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IClienteUpdateState {
  isNew: boolean;
  clienteProprietarioId: string;
  clienteCompradorId: string;
}

export class ClienteUpdate extends React.Component<IClienteUpdateProps, IClienteUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      clienteProprietarioId: '0',
      clienteCompradorId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getClienteProprietarios();
    this.props.getClienteCompradors();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { clienteEntity } = this.props;
      const entity = {
        ...clienteEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/cliente');
  };

  render() {
    const { clienteEntity, clienteProprietarios, clienteCompradors, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="minhaCasaApp.cliente.home.createOrEditLabel">
              <Translate contentKey="minhaCasaApp.cliente.home.createOrEditLabel">Create or edit a Cliente</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : clienteEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="cliente-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nomeLabel" for="nome">
                    <Translate contentKey="minhaCasaApp.cliente.nome">Nome</Translate>
                  </Label>
                  <AvField
                    id="cliente-nome"
                    type="text"
                    name="nome"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="cpfLabel" for="cpf">
                    <Translate contentKey="minhaCasaApp.cliente.cpf">Cpf</Translate>
                  </Label>
                  <AvField
                    id="cliente-cpf"
                    type="string"
                    className="form-control"
                    name="cpf"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="enderecoLabel" for="endereco">
                    <Translate contentKey="minhaCasaApp.cliente.endereco">Endereco</Translate>
                  </Label>
                  <AvField id="cliente-endereco" type="text" name="endereco" />
                </AvGroup>
                <AvGroup>
                  <Label id="telefoneLabel" for="telefone">
                    <Translate contentKey="minhaCasaApp.cliente.telefone">Telefone</Translate>
                  </Label>
                  <AvField id="cliente-telefone" type="string" className="form-control" name="telefone" />
                </AvGroup>
                <AvGroup>
                  <Label for="clienteProprietario.id">
                    <Translate contentKey="minhaCasaApp.cliente.clienteProprietario">Cliente Proprietario</Translate>
                  </Label>
                  <AvInput id="cliente-clienteProprietario" type="select" className="form-control" name="clienteProprietario.id">
                    <option value="" key="0" />
                    {clienteProprietarios
                      ? clienteProprietarios.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="clienteComprador.id">
                    <Translate contentKey="minhaCasaApp.cliente.clienteComprador">Cliente Comprador</Translate>
                  </Label>
                  <AvInput id="cliente-clienteComprador" type="select" className="form-control" name="clienteComprador.id">
                    <option value="" key="0" />
                    {clienteCompradors
                      ? clienteCompradors.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/cliente" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  clienteProprietarios: storeState.clienteProprietario.entities,
  clienteCompradors: storeState.clienteComprador.entities,
  clienteEntity: storeState.cliente.entity,
  loading: storeState.cliente.loading,
  updating: storeState.cliente.updating,
  updateSuccess: storeState.cliente.updateSuccess
});

const mapDispatchToProps = {
  getClienteProprietarios,
  getClienteCompradors,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClienteUpdate);
