package org.minhacasa.myapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Visita.
 */
@Entity
@Table(name = "visita")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Visita implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "data")
    private LocalDate data;

    @Lob
    @Column(name = "avaliacao")
    private String avaliacao;

    @ManyToOne
    @JsonIgnoreProperties("visitas")
    private Imovel imovel;

    @ManyToOne
    @JsonIgnoreProperties("visitas")
    private Corretor corretor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public Visita data(LocalDate data) {
        this.data = data;
        return this;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public String getAvaliacao() {
        return avaliacao;
    }

    public Visita avaliacao(String avaliacao) {
        this.avaliacao = avaliacao;
        return this;
    }

    public void setAvaliacao(String avaliacao) {
        this.avaliacao = avaliacao;
    }

    public Imovel getImovel() {
        return imovel;
    }

    public Visita imovel(Imovel imovel) {
        this.imovel = imovel;
        return this;
    }

    public void setImovel(Imovel imovel) {
        this.imovel = imovel;
    }

    public Corretor getCorretor() {
        return corretor;
    }

    public Visita corretor(Corretor corretor) {
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
        Visita visita = (Visita) o;
        if (visita.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), visita.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Visita{" +
            "id=" + getId() +
            ", data='" + getData() + "'" +
            ", avaliacao='" + getAvaliacao() + "'" +
            "}";
    }
}
