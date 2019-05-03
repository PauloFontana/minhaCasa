import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './imobiliaria.reducer';
import { IImobiliaria } from 'app/shared/model/imobiliaria.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IImobiliariaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IImobiliariaUpdateState {
  isNew: boolean;
}

export class ImobiliariaUpdate extends React.Component<IImobiliariaUpdateProps, IImobiliariaUpdateState> {
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
      const { imobiliariaEntity } = this.props;
      const entity = {
        ...imobiliariaEntity,
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
    this.props.history.push('/entity/imobiliaria');
  };

  render() {
    const { imobiliariaEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="minhaCasaApp.imobiliaria.home.createOrEditLabel">
              <Translate contentKey="minhaCasaApp.imobiliaria.home.createOrEditLabel">Create or edit a Imobiliaria</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : imobiliariaEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="imobiliaria-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="loginLabel" for="login">
                    <Translate contentKey="minhaCasaApp.imobiliaria.login">Login</Translate>
                  </Label>
                  <AvField
                    id="imobiliaria-login"
                    type="text"
                    name="login"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 3, errorMessage: translate('entity.validation.minlength', { min: 3 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="passwordLabel" for="password">
                    <Translate contentKey="minhaCasaApp.imobiliaria.password">Password</Translate>
                  </Label>
                  <AvField
                    id="imobiliaria-password"
                    type="text"
                    name="password"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 6, errorMessage: translate('entity.validation.minlength', { min: 6 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nomeLabel" for="nome">
                    <Translate contentKey="minhaCasaApp.imobiliaria.nome">Nome</Translate>
                  </Label>
                  <AvField
                    id="imobiliaria-nome"
                    type="text"
                    name="nome"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 3, errorMessage: translate('entity.validation.minlength', { min: 3 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="cnpjLabel" for="cnpj">
                    <Translate contentKey="minhaCasaApp.imobiliaria.cnpj">Cnpj</Translate>
                  </Label>
                  <AvField
                    id="imobiliaria-cnpj"
                    type="text"
                    name="cnpj"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 14, errorMessage: translate('entity.validation.minlength', { min: 14 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="enderecoLabel" for="endereco">
                    <Translate contentKey="minhaCasaApp.imobiliaria.endereco">Endereco</Translate>
                  </Label>
                  <AvField id="imobiliaria-endereco" type="text" name="endereco" />
                </AvGroup>
                <AvGroup>
                  <Label id="telefoneLabel" for="telefone">
                    <Translate contentKey="minhaCasaApp.imobiliaria.telefone">Telefone</Translate>
                  </Label>
                  <AvField id="imobiliaria-telefone" type="text" name="telefone" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/imobiliaria" replace color="info">
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
  imobiliariaEntity: storeState.imobiliaria.entity,
  loading: storeState.imobiliaria.loading,
  updating: storeState.imobiliaria.updating,
  updateSuccess: storeState.imobiliaria.updateSuccess
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
)(ImobiliariaUpdate);
