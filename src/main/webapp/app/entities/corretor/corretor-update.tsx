import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IImobiliaria } from 'app/shared/model/imobiliaria.model';
import { getEntities as getImobiliarias } from 'app/entities/imobiliaria/imobiliaria.reducer';
import { getEntity, updateEntity, createEntity, reset } from './corretor.reducer';
import { ICorretor } from 'app/shared/model/corretor.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICorretorUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICorretorUpdateState {
  isNew: boolean;
  imobiliariaId: string;
}

export class CorretorUpdate extends React.Component<ICorretorUpdateProps, ICorretorUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      imobiliariaId: '0',
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

    this.props.getImobiliarias();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { corretorEntity } = this.props;
      const entity = {
        ...corretorEntity,
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
    this.props.history.push('/entity/corretor');
  };

  render() {
    const { corretorEntity, imobiliarias, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="minhaCasaApp.corretor.home.createOrEditLabel">
              <Translate contentKey="minhaCasaApp.corretor.home.createOrEditLabel">Create or edit a Corretor</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : corretorEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="corretor-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="registroImobiliariaLabel" for="registroImobiliaria">
                    <Translate contentKey="minhaCasaApp.corretor.registroImobiliaria">Registro Imobiliaria</Translate>
                  </Label>
                  <AvField
                    id="corretor-registroImobiliaria"
                    type="text"
                    name="registroImobiliaria"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="passwordLabel" for="password">
                    <Translate contentKey="minhaCasaApp.corretor.password">Password</Translate>
                  </Label>
                  <AvField
                    id="corretor-password"
                    type="text"
                    name="password"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="numeroCreciLabel" for="numeroCreci">
                    <Translate contentKey="minhaCasaApp.corretor.numeroCreci">Numero Creci</Translate>
                  </Label>
                  <AvField
                    id="corretor-numeroCreci"
                    type="text"
                    name="numeroCreci"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="contaCorrenteLabel" for="contaCorrente">
                    <Translate contentKey="minhaCasaApp.corretor.contaCorrente">Conta Corrente</Translate>
                  </Label>
                  <AvField id="corretor-contaCorrente" type="text" name="contaCorrente" />
                </AvGroup>
                <AvGroup>
                  <Label for="imobiliaria.id">
                    <Translate contentKey="minhaCasaApp.corretor.imobiliaria">Imobiliaria</Translate>
                  </Label>
                  <AvInput id="corretor-imobiliaria" type="select" className="form-control" name="imobiliariaId">
                    <option value="" key="0" />
                    {imobiliarias
                      ? imobiliarias.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/corretor" replace color="info">
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
  imobiliarias: storeState.imobiliaria.entities,
  corretorEntity: storeState.corretor.entity,
  loading: storeState.corretor.loading,
  updating: storeState.corretor.updating,
  updateSuccess: storeState.corretor.updateSuccess
});

const mapDispatchToProps = {
  getImobiliarias,
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
)(CorretorUpdate);
