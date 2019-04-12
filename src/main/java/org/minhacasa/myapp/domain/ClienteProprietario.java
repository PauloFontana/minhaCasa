package org.minhacasa.myapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A ClienteProprietario.
 */
@Entity
@Table(name = "cliente_proprietario")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ClienteProprietario implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "conta_corrente")
    private String contaCorrente;

    @OneToMany(mappedBy = "clienteProprietario")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Imovel> imovels = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContaCorrente() {
        return contaCorrente;
    }

    public ClienteProprietario contaCorrente(String contaCorrente) {
        this.contaCorrente = contaCorrente;
        return this;
    }

    public void setContaCorrente(String contaCorrente) {
        this.contaCorrente = contaCorrente;
    }

    public Set<Imovel> getImovels() {
        return imovels;
    }

    public ClienteProprietario imovels(Set<Imovel> imovels) {
        this.imovels = imovels;
        return this;
    }

    public ClienteProprietario addImovel(Imovel imovel) {
        this.imovels.add(imovel);
        imovel.setClienteProprietario(this);
        return this;
    }

    public ClienteProprietario removeImovel(Imovel imovel) {
        this.imovels.remove(imovel);
        imovel.setClienteProprietario(null);
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
        ClienteProprietario clienteProprietario = (ClienteProprietario) o;
        if (clienteProprietario.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), clienteProprietario.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ClienteProprietario{" +
            "id=" + getId() +
            ", contaCorrente='" + getContaCorrente() + "'" +
            "}";
    }
}
