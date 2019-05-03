package org.minhacasa.myapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Minuta.
 */
@Entity
@Table(name = "minuta")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Minuta implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Lob
    @Column(name = "conteudo")
    private String conteudo;

    @OneToOne
    @JoinColumn(unique = true)
    private Imovel imovel;

    @ManyToOne
    @JsonIgnoreProperties("minutas")
    private Proprietario proprietario;

    @ManyToOne
    @JsonIgnoreProperties("minutas")
    private Comprador comprador;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getConteudo() {
        return conteudo;
    }

    public Minuta conteudo(String conteudo) {
        this.conteudo = conteudo;
        return this;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public Imovel getImovel() {
        return imovel;
    }

    public Minuta imovel(Imovel imovel) {
        this.imovel = imovel;
        return this;
    }

    public void setImovel(Imovel imovel) {
        this.imovel = imovel;
    }

    public Proprietario getProprietario() {
        return proprietario;
    }

    public Minuta proprietario(Proprietario proprietario) {
        this.proprietario = proprietario;
        return this;
    }

    public void setProprietario(Proprietario proprietario) {
        this.proprietario = proprietario;
    }

    public Comprador getComprador() {
        return comprador;
    }

    public Minuta comprador(Comprador comprador) {
        this.comprador = comprador;
        return this;
    }

    public void setComprador(Comprador comprador) {
        this.comprador = comprador;
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
        Minuta minuta = (Minuta) o;
        if (minuta.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), minuta.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Minuta{" +
            "id=" + getId() +
            ", conteudo='" + getConteudo() + "'" +
            "}";
    }
}
