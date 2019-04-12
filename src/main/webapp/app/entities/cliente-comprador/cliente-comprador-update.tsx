import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './cliente-comprador.reducer';
import { IClienteComprador } from 'app/shared/model/cliente-comprador.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IClienteCompradorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IClienteCompradorUpdateState {
  isNew: boolean;
}

export class ClienteCompradorUpdate extends React.Component<IClienteCompradorUpdateProps, IClienteCompradorUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { clienteCompradorEntity } = this.props;
      const entity = {
        ...clienteCompradorEntity,
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
    this.props.history.push('/entity/cliente-comprador');
  };

  render() {
    const { clienteCompradorEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="minhaCasaApp.clienteComprador.home.createOrEditLabel">
              <Translate contentKey="minhaCasaApp.clienteComprador.home.createOrEditLabel">Create or edit a ClienteComprador</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : clienteCompradorEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="cliente-comprador-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="rendaLabel" for="renda">
                    <Translate contentKey="minhaCasaApp.clienteComprador.renda">Renda</Translate>
                  </Label>
                  <AvField id="cliente-comprador-renda" type="text" name="renda" />
                </AvGroup>
                <AvGroup>
                  <Label id="garantiasLabel" for="garantias">
                    <Translate contentKey="minhaCasaApp.clienteComprador.garantias">Garantias</Translate>
                  </Label>
                  <AvField id="cliente-comprador-garantias" type="text" name="garantias" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/cliente-comprador" replace color="info">
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
  clienteCompradorEntity: storeState.clienteComprador.entity,
  loading: storeState.clienteComprador.loading,
  updating: storeState.clienteComprador.updating,
  updateSuccess: storeState.clienteComprador.updateSuccess
});

const mapDispatchToProps = {
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
)(ClienteCompradorUpdate);
