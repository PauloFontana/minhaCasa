import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IComprador } from 'app/shared/model/comprador.model';
import { getEntities as getCompradors } from 'app/entities/comprador/comprador.reducer';
import { ICorretor } from 'app/shared/model/corretor.model';
import { getEntities as getCorretors } from 'app/entities/corretor/corretor.reducer';
import { getEntity, updateEntity, createEntity, reset } from './pagamento.reducer';
import { IPagamento } from 'app/shared/model/pagamento.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPagamentoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPagamentoUpdateState {
  isNew: boolean;
  compradorId: string;
  corretorId: string;
}

export class PagamentoUpdate extends React.Component<IPagamentoUpdateProps, IPagamentoUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      compradorId: '0',
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

    this.props.getCompradors();
    this.props.getCorretors();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { pagamentoEntity } = this.props;
      const entity = {
        ...pagamentoEntity,
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
    this.props.history.push('/entity/pagamento');
  };

  render() {
    const { pagamentoEntity, compradors, corretors, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="minhaCasaApp.pagamento.home.createOrEditLabel">
              <Translate contentKey="minhaCasaApp.pagamento.home.createOrEditLabel">Create or edit a Pagamento</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : pagamentoEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="pagamento-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="valorLabel" for="valor">
                    <Translate contentKey="minhaCasaApp.pagamento.valor">Valor</Translate>
                  </Label>
                  <AvField id="pagamento-valor" type="text" name="valor" />
                </AvGroup>
                <AvGroup>
                  <Label id="dataLabel" for="data">
                    <Translate contentKey="minhaCasaApp.pagamento.data">Data</Translate>
                  </Label>
                  <AvField id="pagamento-data" type="date" className="form-control" name="data" />
                </AvGroup>
                <AvGroup>
                  <Label for="comprador.id">
                    <Translate contentKey="minhaCasaApp.pagamento.comprador">Comprador</Translate>
                  </Label>
                  <AvInput id="pagamento-comprador" type="select" className="form-control" name="compradorId">
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
                <AvGroup>
                  <Label for="corretor.id">
                    <Translate contentKey="minhaCasaApp.pagamento.corretor">Corretor</Translate>
                  </Label>
                  <AvInput id="pagamento-corretor" type="select" className="form-control" name="corretorId">
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
                <Button tag={Link} id="cancel-save" to="/entity/pagamento" replace color="info">
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
  compradors: storeState.comprador.entities,
  corretors: storeState.corretor.entities,
  pagamentoEntity: storeState.pagamento.entity,
  loading: storeState.pagamento.loading,
  updating: storeState.pagamento.updating,
  updateSuccess: storeState.pagamento.updateSuccess
});

const mapDispatchToProps = {
  getCompradors,
  getCorretors,
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
)(PagamentoUpdate);
