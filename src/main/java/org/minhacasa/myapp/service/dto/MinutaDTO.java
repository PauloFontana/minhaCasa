package org.minhacasa.myapp.service.dto;
import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the Minuta entity.
 */
public class MinutaDTO implements Serializable {

    private Long id;

    @Lob
    private String conteudo;


    private Long imovelId;

    private Long proprietarioId;

    private Long compradorId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getConteudo() {
        return conteudo;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public Long getImovelId() {
        return imovelId;
    }

    public void setImovelId(Long imovelId) {
        this.imovelId = imovelId;
    }

    public Long getProprietarioId() {
        return proprietarioId;
    }

    public void setProprietarioId(Long proprietarioId) {
        this.proprietarioId = proprietarioId;
    }

    public Long getCompradorId() {
        return compradorId;
    }

    public void setCompradorId(Long compradorId) {
        this.compradorId = compradorId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MinutaDTO minutaDTO = (MinutaDTO) o;
        if (minutaDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), minutaDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MinutaDTO{" +
            "id=" + getId() +
            ", conteudo='" + getConteudo() + "'" +
            ", imovel=" + getImovelId() +
            ", proprietario=" + getProprietarioId() +
            ", comprador=" + getCompradorId() +
            "}";
    }
}
