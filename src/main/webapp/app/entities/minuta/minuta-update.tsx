import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IImovel } from 'app/shared/model/imovel.model';
import { getEntities as getImovels } from 'app/entities/imovel/imovel.reducer';
import { IProprietario } from 'app/shared/model/proprietario.model';
import { getEntities as getProprietarios } from 'app/entities/proprietario/proprietario.reducer';
import { IComprador } from 'app/shared/model/comprador.model';
import { getEntities as getCompradors } from 'app/entities/comprador/comprador.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './minuta.reducer';
import { IMinuta } from 'app/shared/model/minuta.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMinutaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMinutaUpdateState {
  isNew: boolean;
  imovelId: string;
  proprietarioId: string;
  compradorId: string;
}

export class MinutaUpdate extends React.Component<IMinutaUpdateProps, IMinutaUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      imovelId: '0',
      proprietarioId: '0',
      compradorId: '0',
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

    this.props.getImovels();
    this.props.getProprietarios();
    this.props.getCompradors();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { minutaEntity } = this.props;
      const entity = {
        ...minutaEntity,
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
    this.props.history.push('/entity/minuta');
  };

  render() {
    const { minutaEntity, imovels, proprietarios, compradors, loading, updating } = this.props;
    const { isNew } = this.state;

    const { conteudo } = minutaEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="minhaCasaApp.minuta.home.createOrEditLabel">
              <Translate contentKey="minhaCasaApp.minuta.home.createOrEditLabel">Create or edit a Minuta</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : minutaEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="minuta-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="conteudoLabel" for="conteudo">
                    <Translate contentKey="minhaCasaApp.minuta.conteudo">Conteudo</Translate>
                  </Label>
                  <AvInput id="minuta-conteudo" type="textarea" name="conteudo" />
                </AvGroup>
                <AvGroup>
                  <Label for="imovel.id">
                    <Translate contentKey="minhaCasaApp.minuta.imovel">Imovel</Translate>
                  </Label>
                  <AvInput id="minuta-imovel" type="select" className="form-control" name="imovelId">
                    <option value="" key="0" />
                    {imovels
                      ? imovels.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="proprietario.id">
                    <Translate contentKey="minhaCasaApp.minuta.proprietario">Proprietario</Translate>
                  </Label>
                  <AvInput id="minuta-proprietario" type="select" className="form-control" name="proprietarioId">
                    <option value="" key="0" />
                    {proprietarios
                      ? proprietarios.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="comprador.id">
                    <Translate contentKey="minhaCasaApp.minuta.comprador">Comprador</Translate>
                  </Label>
                  <AvInput id="minuta-comprador" type="select" className="form-control" name="compradorId">
                    <option value="" key="0" />
                    {compradors
                      ? compradors.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/minuta" replace color="info">
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
  imovels: storeState.imovel.entities,
  proprietarios: storeState.proprietario.entities,
  compradors: storeState.comprador.entities,
  minutaEntity: storeState.minuta.entity,
  loading: storeState.minuta.loading,
  updating: storeState.minuta.updating,
  updateSuccess: storeState.minuta.updateSuccess
});

const mapDispatchToProps = {
  getImovels,
  getProprietarios,
  getCompradors,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinutaUpdate);
