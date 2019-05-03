package org.minhacasa.myapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Corretor.
 */
@Entity
@Table(name = "corretor")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Corretor implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "registro_imobiliaria", nullable = false)
    private String registroImobiliaria;

    @NotNull
    @Column(name = "jhi_password", nullable = false)
    private String password;

    @NotNull
    @Column(name = "numero_creci", nullable = false)
    private String numeroCreci;

    @Column(name = "conta_corrente")
    private String contaCorrente;

    @ManyToOne
    @JsonIgnoreProperties("corretors")
    private Imobiliaria imobiliaria;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRegistroImobiliaria() {
        return registroImobiliaria;
    }

    public Corretor registroImobiliaria(String registroImobiliaria) {
        this.registroImobiliaria = registroImobiliaria;
        return this;
    }

    public void setRegistroImobiliaria(String registroImobiliaria) {
        this.registroImobiliaria = registroImobiliaria;
    }

    public String getPassword() {
        return password;
    }

    public Corretor password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNumeroCreci() {
        return numeroCreci;
    }

    public Corretor numeroCreci(String numeroCreci) {
        this.numeroCreci = numeroCreci;
        return this;
    }

    public void setNumeroCreci(String numeroCreci) {
        this.numeroCreci = numeroCreci;
    }

    public String getContaCorrente() {
        return contaCorrente;
    }

    public Corretor contaCorrente(String contaCorrente) {
        this.contaCorrente = contaCorrente;
        return this;
    }

    public void setContaCorrente(String contaCorrente) {
        this.contaCorrente = contaCorrente;
    }

    public Imobiliaria getImobiliaria() {
        return imobiliaria;
    }

    public Corretor imobiliaria(Imobiliaria imobiliaria) {
        this.imobiliaria = imobiliaria;
        return this;
    }

    public void setImobiliaria(Imobiliaria imobiliaria) {
        this.imobiliaria = imobiliaria;
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
        Corretor corretor = (Corretor) o;
        if (corretor.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), corretor.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Corretor{" +
            "id=" + getId() +
            ", registroImobiliaria='" + getRegistroImobiliaria() + "'" +
            ", password='" + getPassword() + "'" +
            ", numeroCreci='" + getNumeroCreci() + "'" +
            ", contaCorrente='" + getContaCorrente() + "'" +
            "}";
    }
}
