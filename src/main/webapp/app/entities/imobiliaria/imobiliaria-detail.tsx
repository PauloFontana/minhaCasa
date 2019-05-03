import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './imobiliaria.reducer';
import { IImobiliaria } from 'app/shared/model/imobiliaria.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IImobiliariaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ImobiliariaDetail extends React.Component<IImobiliariaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { imobiliariaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="minhaCasaApp.imobiliaria.detail.title">Imobiliaria</Translate> [<b>{imobiliariaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="login">
                <Translate contentKey="minhaCasaApp.imobiliaria.login">Login</Translate>
              </span>
            </dt>
            <dd>{imobiliariaEntity.login}</dd>
            <dt>
              <span id="password">
                <Translate contentKey="minhaCasaApp.imobiliaria.password">Password</Translate>
              </span>
            </dt>
            <dd>{imobiliariaEntity.password}</dd>
            <dt>
              <span id="nome">
                <Translate contentKey="minhaCasaApp.imobiliaria.nome">Nome</Translate>
              </span>
            </dt>
            <dd>{imobiliariaEntity.nome}</dd>
            <dt>
              <span id="cnpj">
                <Translate contentKey="minhaCasaApp.imobiliaria.cnpj">Cnpj</Translate>
              </span>
            </dt>
            <dd>{imobiliariaEntity.cnpj}</dd>
            <dt>
              <span id="endereco">
                <Translate contentKey="minhaCasaApp.imobiliaria.endereco">Endereco</Translate>
              </span>
            </dt>
            <dd>{imobiliariaEntity.endereco}</dd>
            <dt>
              <span id="telefone">
                <Translate contentKey="minhaCasaApp.imobiliaria.telefone">Telefone</Translate>
              </span>
            </dt>
            <dd>{imobiliariaEntity.telefone}</dd>
          </dl>
          <Button tag={Link} to="/entity/imobiliaria" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/imobiliaria/${imobiliariaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ imobiliaria }: IRootState) => ({
  imobiliariaEntity: imobiliaria.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImobiliariaDetail);
