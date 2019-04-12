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
import { getEntity, updateEntity, createEntity, reset } from './imovel.reducer';
import { IImovel } from 'app/shared/model/imovel.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IImovelUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IImovelUpdateState {
  isNew: boolean;
  clienteProprietarioId: string;
  clienteCompradorId: string;
}

export class ImovelUpdate extends React.Component<IImovelUpdateProps, IImovelUpdateState> {
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
      const { imovelEntity } = this.props;
      const entity = {
        ...imovelEntity,
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
    this.props.history.push('/entity/imovel');
  };

  render() {
    const { imovelEntity, clienteProprietarios, clienteCompradors, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="minhaCasaApp.imovel.home.createOrEditLabel">
              <Translate contentKey="minhaCasaApp.imovel.home.createOrEditLabel">Create or edit a Imovel</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : imovelEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="imovel-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="categoriaLabel" for="categoria">
                    <Translate contentKey="minhaCasaApp.imovel.categoria">Categoria</Translate>
                  </Label>
                  <AvField id="imovel-categoria" type="text" name="categoria" />
                </AvGroup>
                <AvGroup>
                  <Label id="tipoLabel" for="tipo">
                    <Translate contentKey="minhaCasaApp.imovel.tipo">Tipo</Translate>
                  </Label>
                  <AvField id="imovel-tipo" type="text" name="tipo" />
                </AvGroup>
                <AvGroup>
                  <Label id="valorLabel" for="valor">
                    <Translate contentKey="minhaCasaApp.imovel.valor">Valor</Translate>
                  </Label>
                  <AvField id="imovel-valor" type="text" name="valor" />
                </AvGroup>
                <AvGroup>
                  <Label id="atributosLabel" for="atributos">
                    <Translate contentKey="minhaCasaApp.imovel.atributos">Atributos</Translate>
                  </Label>
                  <AvField id="imovel-atributos" type="text" name="atributos" />
                </AvGroup>
                <AvGroup>
                  <Label for="clienteProprietario.id">
                    <Translate contentKey="minhaCasaApp.imovel.clienteProprietario">Cliente Proprietario</Translate>
                  </Label>
                  <AvInput id="imovel-clienteProprietario" type="select" className="form-control" name="clienteProprietario.id">
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
                    <Translate contentKey="minhaCasaApp.imovel.clienteComprador">Cliente Comprador</Translate>
                  </Label>
                  <AvInput id="imovel-clienteComprador" type="select" className="form-control" name="clienteComprador.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/imovel" replace color="info">
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
  imovelEntity: storeState.imovel.entity,
  loading: storeState.imovel.loading,
  updating: storeState.imovel.updating,
  updateSuccess: storeState.imovel.updateSuccess
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
)(ImovelUpdate);
