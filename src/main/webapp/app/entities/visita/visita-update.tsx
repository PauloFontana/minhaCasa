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
import { ICorretor } from 'app/shared/model/corretor.model';
import { getEntities as getCorretors } from 'app/entities/corretor/corretor.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './visita.reducer';
import { IVisita } from 'app/shared/model/visita.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVisitaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IVisitaUpdateState {
  isNew: boolean;
  imovelId: string;
  corretorId: string;
}

export class VisitaUpdate extends React.Component<IVisitaUpdateProps, IVisitaUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      imovelId: '0',
      corretorId: '0',
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
    this.props.getCorretors();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { visitaEntity } = this.props;
      const entity = {
        ...visitaEntity,
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
    this.props.history.push('/entity/visita');
  };

  render() {
    const { visitaEntity, imovels, corretors, loading, updating } = this.props;
    const { isNew } = this.state;

    const { avaliacao } = visitaEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="minhaCasaApp.visita.home.createOrEditLabel">
              <Translate contentKey="minhaCasaApp.visita.home.createOrEditLabel">Create or edit a Visita</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : visitaEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="visita-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="dataLabel" for="data">
                    <Translate contentKey="minhaCasaApp.visita.data">Data</Translate>
                  </Label>
                  <AvField id="visita-data" type="date" className="form-control" name="data" />
                </AvGroup>
                <AvGroup>
                  <Label id="avaliacaoLabel" for="avaliacao">
                    <Translate contentKey="minhaCasaApp.visita.avaliacao">Avaliacao</Translate>
                  </Label>
                  <AvInput id="visita-avaliacao" type="textarea" name="avaliacao" />
                </AvGroup>
                <AvGroup>
                  <Label for="imovel.id">
                    <Translate contentKey="minhaCasaApp.visita.imovel">Imovel</Translate>
                  </Label>
                  <AvInput id="visita-imovel" type="select" className="form-control" name="imovelId">
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
                  <Label for="corretor.id">
                    <Translate contentKey="minhaCasaApp.visita.corretor">Corretor</Translate>
                  </Label>
                  <AvInput id="visita-corretor" type="select" className="form-control" name="corretorId">
                    <option value="" key="0" />
                    {corretors
                      ? corretors.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/visita" replace color="info">
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
  corretors: storeState.corretor.entities,
  visitaEntity: storeState.visita.entity,
  loading: storeState.visita.loading,
  updating: storeState.visita.updating,
  updateSuccess: storeState.visita.updateSuccess
});

const mapDispatchToProps = {
  getImovels,
  getCorretors,
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
)(VisitaUpdate);
