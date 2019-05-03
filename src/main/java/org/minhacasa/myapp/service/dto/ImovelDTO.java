package org.minhacasa.myapp.service.dto;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the Imovel entity.
 */
public class ImovelDTO implements Serializable {

    private Long id;

    private String categoria;

    private String tipo;

    private BigDecimal valor;

    private String atributos;


    private Long proprietarioId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public String getAtributos() {
        return atributos;
    }

    public void setAtributos(String atributos) {
        this.atributos = atributos;
    }

    public Long getProprietarioId() {
        return proprietarioId;
    }

    public void setProprietarioId(Long proprietarioId) {
        this.proprietarioId = proprietarioId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ImovelDTO imovelDTO = (ImovelDTO) o;
        if (imovelDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), imovelDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ImovelDTO{" +
            "id=" + getId() +
            ", categoria='" + getCategoria() + "'" +
            ", tipo='" + getTipo() + "'" +
            ", valor=" + getValor() +
            ", atributos='" + getAtributos() + "'" +
            ", proprietario=" + getProprietarioId() +
            "}";
    }
}
