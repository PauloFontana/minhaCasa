package org.minhacasa.myapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A Repasse.
 */
@Entity
@Table(name = "repasse")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Repasse implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "valor", precision = 10, scale = 2)
    private BigDecimal valor;

    @ManyToOne
    @JsonIgnoreProperties("repasses")
    private Proprietario proprietario;

    @ManyToOne
    @JsonIgnoreProperties("repasses")
    private Corretor corretor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public Repasse valor(BigDecimal valor) {
        this.valor = valor;
        return this;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public Proprietario getProprietario() {
        return proprietario;
    }

    public Repasse proprietario(Proprietario proprietario) {
        this.proprietario = proprietario;
        return this;
    }

    public void setProprietario(Proprietario proprietario) {
        this.proprietario = proprietario;
    }

    public Corretor getCorretor() {
        return corretor;
    }

    public Repasse corretor(Corretor corretor) {
        this.corretor = corretor;
        return this;
    }

    public void setCorretor(Corretor corretor) {
        this.corretor = corretor;
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
        Repasse repasse = (Repasse) o;
        if (repasse.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), repasse.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Repasse{" +
            "id=" + getId() +
            ", valor=" + getValor() +
            "}";
    }
}
