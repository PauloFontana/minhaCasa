package org.minhacasa.myapp.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A Comprador.
 */
@Entity
@Table(name = "comprador")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Comprador implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "renda", precision = 10, scale = 2)
    private BigDecimal renda;

    @Column(name = "garantias")
    private String garantias;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

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

    public Comprador renda(BigDecimal renda) {
        this.renda = renda;
        return this;
    }

    public void setRenda(BigDecimal renda) {
        this.renda = renda;
    }

    public String getGarantias() {
        return garantias;
    }

    public Comprador garantias(String garantias) {
        this.garantias = garantias;
        return this;
    }

    public void setGarantias(String garantias) {
        this.garantias = garantias;
    }

    public User getUser() {
        return user;
    }

    public Comprador user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
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
        Comprador comprador = (Comprador) o;
        if (comprador.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), comprador.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Comprador{" +
            "id=" + getId() +
            ", renda=" + getRenda() +
            ", garantias='" + getGarantias() + "'" +
            "}";
    }
}
