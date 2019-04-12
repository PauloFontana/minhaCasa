package org.minhacasa.myapp.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Cliente.
 */
@Entity
@Table(name = "cliente")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Cliente implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @NotNull
    @Column(name = "cpf", nullable = false)
    private Integer cpf;

    @Column(name = "endereco")
    private String endereco;

    @Column(name = "telefone")
    private Integer telefone;

    @OneToOne
    @JoinColumn(unique = true)
    private ClienteProprietario clienteProprietario;

    @OneToOne
    @JoinColumn(unique = true)
    private ClienteComprador clienteComprador;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Cliente nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getCpf() {
        return cpf;
    }

    public Cliente cpf(Integer cpf) {
        this.cpf = cpf;
        return this;
    }

    public void setCpf(Integer cpf) {
        this.cpf = cpf;
    }

    public String getEndereco() {
        return endereco;
    }

    public Cliente endereco(String endereco) {
        this.endereco = endereco;
        return this;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public Integer getTelefone() {
        return telefone;
    }

    public Cliente telefone(Integer telefone) {
        this.telefone = telefone;
        return this;
    }

    public void setTelefone(Integer telefone) {
        this.telefone = telefone;
    }

    public ClienteProprietario getClienteProprietario() {
        return clienteProprietario;
    }

    public Cliente clienteProprietario(ClienteProprietario clienteProprietario) {
        this.clienteProprietario = clienteProprietario;
        return this;
    }

    public void setClienteProprietario(ClienteProprietario clienteProprietario) {
        this.clienteProprietario = clienteProprietario;
    }

    public ClienteComprador getClienteComprador() {
        return clienteComprador;
    }

    public Cliente clienteComprador(ClienteComprador clienteComprador) {
        this.clienteComprador = clienteComprador;
        return this;
    }

    public void setClienteComprador(ClienteComprador clienteComprador) {
        this.clienteComprador = clienteComprador;
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
        Cliente cliente = (Cliente) o;
        if (cliente.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), cliente.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Cliente{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", cpf=" + getCpf() +
            ", endereco='" + getEndereco() + "'" +
            ", telefone=" + getTelefone() +
            "}";
    }
}
