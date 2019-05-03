package org.minhacasa.myapp.service.dto;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the Repasse entity.
 */
public class RepasseDTO implements Serializable {

    private Long id;

    private BigDecimal valor;


    private Long proprietarioId;

    private Long corretorId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public Long getProprietarioId() {
        return proprietarioId;
    }

    public void setProprietarioId(Long proprietarioId) {
        this.proprietarioId = proprietarioId;
    }

    public Long getCorretorId() {
        return corretorId;
    }

    public void setCorretorId(Long corretorId) {
        this.corretorId = corretorId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RepasseDTO repasseDTO = (RepasseDTO) o;
        if (repasseDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), repasseDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RepasseDTO{" +
            "id=" + getId() +
            ", valor=" + getValor() +
            ", proprietario=" + getProprietarioId() +
            ", corretor=" + getCorretorId() +
            "}";
    }
}
