package org.minhacasa.myapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ClienteComprador.
 */
@Entity
@Table(name = "cliente_comprador")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ClienteComprador implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "renda", precision = 10, scale = 2)
    private BigDecimal renda;

    @Column(name = "garantias")
    private String garantias;

    @OneToMany(mappedBy = "clienteComprador")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Imovel> imovels = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getRenda() {
        return renda;
    }

    public ClienteComprador renda(BigDecimal renda) {
        this.renda = renda;
        return this;
    }

    public void setRenda(BigDecimal renda) {
        this.renda = renda;
    }

    public String getGarantias() {
        return garantias;
    }

    public ClienteComprador garantias(String garantias) {
        this.garantias = garantias;
        return this;
    }

    public void setGarantias(String garantias) {
        this.garantias = garantias;
    }

    public Set<Imovel> getImovels() {
        return imovels;
    }

    public ClienteComprador imovels(Set<Imovel> imovels) {
        this.imovels = imovels;
        return this;
    }

    public ClienteComprador addImovel(Imovel imovel) {
        this.imovels.add(imovel);
        imovel.setClienteComprador(this);
        return this;
    }

    public ClienteComprador removeImovel(Imovel imovel) {
        this.imovels.remove(imovel);
        imovel.setClienteComprador(null);
        return this;
    }

    public void setImovels(Set<Imovel> imovels) {
        this.imovels = imovels;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ClienteComprador clienteComprador = (ClienteComprador) o;
        if (clienteComprador.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), clienteComprador.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClienteComprador{" +
            "id=" + getId() +
            ", renda=" + getRenda() +
            ", garantias='" + getGarantias() + "'" +
            "}";
    }
}
