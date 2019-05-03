import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './comprador.reducer';
import { IComprador } from 'app/shared/model/comprador.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompradorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CompradorDetail extends React.Component<ICompradorDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { compradorEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="minhaCasaApp.comprador.detail.title">Comprador</Translate> [<b>{compradorEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="renda">
                <Translate contentKey="minhaCasaApp.comprador.renda">Renda</Translate>
              </span>
            </dt>
            <dd>{compradorEntity.renda}</dd>
            <dt>
              <span id="garantias">
                <Translate contentKey="minhaCasaApp.comprador.garantias">Garantias</Translate>
              </span>
            </dt>
            <dd>{compradorEntity.garantias}</dd>
            <dt>
              <Translate contentKey="minhaCasaApp.comprador.user">User</Translate>
            </dt>
            <dd>{compradorEntity.userLogin ? compradorEntity.userLogin : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/comprador" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/comprador/${compradorEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ comprador }: IRootState) => ({
  compradorEntity: comprador.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompradorDetail);
